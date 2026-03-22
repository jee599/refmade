---
description: 디자인 갤러리에서 새 레퍼런스를 탐색하고 큐레이션하여 카탈로그에 등록
---

# /reference-search

디자인 어워드 갤러리에서 새 레퍼런스를 찾아 refmade 카탈로그에 등록하는 파이프라인.
Phase 1~5를 순차 실행한다. Phase 1~3은 최대 2라운드 반복.

## 실행 전 로드

아래 파일들을 Read로 로드한다:
- `web/data/sources.json` → 소스 목록
- `web/data/seen.json` → 이미 처리한 URL
- `web/data/taste-profile.md` → 취향 프로파일 (라운드 2 필터링용)
- `web/src/app/data/references.ts` → 기존 레퍼런스 인덱스 (유사도 비교용)

기존 레퍼런스에서 tags와 tone만 추출하여 인메모리 인덱스를 구성한다.
다음 ID는 기존 최대 ID + 1 (3자리 zero-pad).

## 라운드 루프

```
라운드 = 1
while 라운드 <= 2:
  Phase 1 (검색) → Phase 2 (분석+게이트) → Phase 3 (큐레이션)
  라운드 += 1
Phase 4 (산출물)
Phase 5 (회고)
```

---

## Phase 1 — 소스 검색 + URL 수집

현재 날짜에서 year, month를 추출한다. 당월과 전월 두 달을 검색 범위로 쓴다.

sources.json에서 `enabled: true`인 소스를 순회한다:

1. 소스의 searchQuery에서 `{year}`, `{month}`를 치환
2. WebSearch 실행
3. 결과에서 URL 추출:
   a. 스니펫 텍스트에서 실제 사이트 도메인 추출 시도
   b. 실패 시 → 갤러리 페이지 URL을 WebFetch → HTML에서 외부 링크(href) 추출
   c. 실패 시 → 해당 결과 스킵
4. 추출된 URL을 seen.json과 대조 → 이미 본 URL 제거
5. **10개 URL을 확보하면 소스 순회 멈춤** (3~4개 소스면 충분)
6. 라운드 2에서는 라운드 1에서 사용하지 않은 소스부터 순회

10개 미만이면 가용한 만큼으로 진행.

각 URL에 대해 소스명을 기록해둔다 (seen.json 업데이트용).

---

## Phase 2 — 분석 + 품질 게이트

수집된 URL 각각에 대해 아래 과정을 실행한다.

### Step A: HTML 구조 분석

1. WebFetch로 사이트 HTML을 가져온다
2. WebFetch 실패(403, timeout 등) → 해당 URL 스킵, 실패 사유 기록
3. HTML에서 직접 추출 가능한 것:
   - `<link href="fonts.googleapis.com/...">` → Google Fonts 이름, weight
   - CSS custom properties (`--color-*`, `--font-*` 등) → 있으면 색상/폰트 힌트
   - `<meta name="theme-color" content="...">` → 브랜드 색상
   - `<meta property="og:image" content="...">` → Step B용 이미지 URL
4. HTML 전체 구조를 읽고 아래 디자인 토큰을 추론한다:

추론 항목 (반드시 모든 항목을 채운다):
- tone: "light" 또는 "dark"
- style: 배열 (예: ["editorial", "minimal"]) — 최소 1개, 최대 3개
- layout: 배열 (예: ["centered", "long-scroll"]) — 최소 1개
- density: "sparse" 또는 "balanced" 또는 "dense"
- pacing: "slow" 또는 "medium" 또는 "fast"
- palette: HEX 색상 3~6개 (bg, text, accent 필수)
- typography: heading 폰트, body 폰트, weight, letter-spacing 추정
- material: 한 문장 메타포 (예: "Ink on matte black paper")
- signature_moves: 이 사이트만의 시각적 특징 3~5개 (**반드시 3개 이상 추출 노력**)

### Step B: 이미지 분석 (보조)

Step A에서 og:image URL을 추출했으면:
1. `curl -sL -o /tmp/ref-{순번}.jpg "{og_image_url}"` 실행 (Bash)
2. curl 실패 또는 파일 크기 < 5KB → 스킵
3. Read로 `/tmp/ref-{순번}.jpg` 읽기 → 이미지를 보고 톤, 컬러, 레이아웃 느낌을 Step A 결과와 비교하여 보정

og:image가 없거나 로고만인 경우 → Step B 전체 스킵, Step A 결과만 사용.

### Step C: 레퍼런스 MD 초안 생성

분석 결과를 아래 구조의 Markdown으로 변환한다.
기존 카탈로그(예: web/data/catalog/001-clean-minimal.md)와 동일한 정규 형식을 따른다.

```
---
id: {3자리 zero-pad ID}
name: {분석에서 도출한 이름}
tags: [{style 태그들}, {layout 태그들}, {density}]
tone: {light|dark}
inspired_by: [{소스 사이트 URL}]
status: draft
---

# {id} — {name}

## Preview
`samples/{id}-{slug}.html`

## Palette
- Background: {bg 색상}
- Text: {text 색상}
- Subtle BG: {subtle_bg 색상 — 없으면 bg에서 약간 변형}
- Border: {border 색상 — 없으면 text 색상 10% opacity}
- Muted: {muted 색상 — 없으면 text 색상 50% opacity}
- Accent: {accent 색상}

## Typography
- Heading: {heading 폰트} ({weight}, {letter-spacing})
- Body: {body 폰트} ({weight})
- Mono: {mono 폰트 — 없으면 JetBrains Mono}
- h1: {추정 사이즈} ({weight}, {letter-spacing}, {line-height})
- h2: {추정 사이즈} ({weight}, {letter-spacing})
- Body: {추정 사이즈} ({line-height})

## Layout
- Hero: {hero 레이아웃 설명}
- Features: {features 레이아웃 설명}
- Cards: {카드 스타일 — 없으면 "N/A"}
- Buttons: {버튼 스타일}
- Max width: {추정 max-width}

## Key Details
- {signature_move_1}
- {signature_move_2}
- {signature_move_3}
(최소 3개)

## Section Order
{nav -> hero -> ... -> footer 순서}

## Background Pattern
{섹션별 배경색 교차 패턴}

## Padding Pattern
{섹션별 padding 값 추정}

## Material
{material 메타포}

## Rhythm
- pacing: {slow|medium|fast}
- density: {sparse|balanced|dense}

## Anti-patterns
- {이 디자인에서 하면 안 되는 것 1}
- {이 디자인에서 하면 안 되는 것 2}

## Reconstruction Hints
- {이 디자인을 재구현할 때 핵심 포인트 1}
- {이 디자인을 재구현할 때 핵심 포인트 2}
```

### Step D: 품질 게이트 (큐레이션 전)

각 후보에 대해 아래 게이트를 순서대로 적용한다:

| # | 게이트 | 조건 | 결과 |
|---|--------|------|------|
| 1 | 시그니처 부족 | signature_moves < 3개 | reject → seen.json에 status:"rejected" 기록 |
| 2 | 소스 노후 | 소스 사이트가 18개월 이상 된 것으로 판단됨 | reject |
| 3 | 스타일 중복 | 기존 레퍼런스와 유사도 > 0.8 | **reject 아님** — ⚠️ 경고 표시 후 큐레이션에 포함 |

스타일 유사도 계산:
```
유사도 = (tone 일치 × 0.3) + (tags Jaccard × 0.7)
tags Jaccard = |신규 tags ∩ 기존 tags| / |신규 tags ∪ 기존 tags|
```
기존 레퍼런스 전체와 비교하여 가장 높은 유사도와 해당 레퍼런스 ID/이름을 기록한다.

### Step E: taste-profile 기반 필터링 (라운드 2부터)

라운드 1에서는 이 단계를 건너뛴다 (taste-profile이 없으므로).

라운드 2에서는:
1. 게이트 통과 후보들의 tone/style/layout/density를 taste-profile의 Soft Preferences와 매칭하여 점수 계산
2. Anti-taste에 해당하는 필드가 있는 후보는 점수 감점 (-0.3)
3. 점수 높은 순으로 정렬
4. 상위 5개를 Phase 3 큐레이션에 제시

### Phase 2 종료

게이트 통과 후보 목록을 확정한다. 라운드 1에서는 순서대로 상위 5개, 라운드 2에서는 taste 점수 상위 5개.
각 후보의 분석 결과(tone, style, tags, palette, material, signature_moves)와 유사도 경고를 보존한다.

---

## Phase 3 — 큐레이션

### 후보 제시

Phase 2에서 선별된 5개 후보를 아래 형식으로 제시한다:

```
━━━ 라운드 {N}: {M}개 후보 ━━━━━━━━━━━━━━━

1. [{id}] {name}                          {유사도 > 0.8이면: ⚠️ {기존 ref} 와 유사 ({유사도})}
   Material: "{material}"
   tone:{tone} / style:{style 쉼표 구분} / density:{density}
   Palette: {palette HEX 나열}
   시그니처: {signature_moves 쉼표 구분, 최대 3개}

2. [{id}] {name}
   ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
keep할 번호를 입력하세요 (나머지는 자동 delete):
```

### 사용자 응답 파싱

사용자 입력에서 숫자를 추출한다:
- "1, 3, 5" → keep [1, 3, 5]
- "1번이랑 3번" → keep [1, 3]
- "전부 keep" → keep [1, 2, 3, 4, 5]
- "전부 delete" 또는 "없음" → keep []

입력된 번호 = keep. 나머지 = delete.

### 라운드 종료 처리

1. keep된 후보와 delete된 후보를 분류
2. 구조화 필드 집계:
   - kept 후보들의 tone, style, layout, density 필드 빈도 계산
   - deleted 후보들의 필드 빈도 계산
3. taste-profile.md에 중간 저장:
   - Soft Preferences: keep 빈도를 비율로 변환 (예: 3/5 = 0.6)
     - 기존 값이 있으면 EWMA: 기존 × 0.3 + 신규 × 0.7
   - Anti-taste: delete에서 3회 이상 등장한 필드 추가
   - 사이클 기록 섹션 업데이트
4. seen.json에 URL별 status 기록 (kept/deleted)
5. 라운드 2가 남아있으면 Phase 1로 돌아간다

### 라운드 2 소스 전략

라운드 1에서 사용한 소스를 기록해두고, 라운드 2에서는 사용하지 않은 소스부터 순회한다.

---

## Phase 4 — 최종 산출물 생성

2라운드 큐레이션 완료 후 1회 실행.

### Step A: 최종 차별성 검사

keep된 레퍼런스들 서로 간 유사도를 검사한다:
```
유사도 = (tone 일치 × 0.3) + (tags Jaccard × 0.7)
```
서로 유사도 > 0.85인 쌍이 있으면:
- 해당 쌍을 사용자에게 보여주고 "둘 중 하나를 선택하세요"
- 선택되지 않은 쪽은 seen.json에 status: "rejected" 기록

### Step B: 카탈로그 등록

최종 통과한 레퍼런스 각각에 대해:

1. **catalog MD 생성**: Phase 2 Step C에서 만든 초안을 `web/data/catalog/{id}-{slug}.md`로 Write
   - slug는 name을 kebab-case로 변환 (예: "Noir Editorial" → "noir-editorial")

2. **references.ts 업데이트**: `web/src/app/data/references.ts`의 배열 마지막 엔트리 뒤에 새 엔트리를 Edit으로 추가

   필드 매핑:
   - id: 3자리 zero-pad
   - name: 분석에서 도출한 이름
   - tags: 분석의 style + layout + density 태그
   - tone: 분석의 tone ("light" | "dark")
   - inspired: [소스 사이트 URL]
   - accent: Palette의 Accent 색상
   - bg: Palette의 Background 색상
   - status: "draft"
   - description: signature_moves를 한 문장으로 요약
   - sampleFile: undefined
   - views: 0
   - downloads: 0

### Step C: taste-profile.md 최종 저장

라운드별 중간 저장과 동일한 EWMA 로직으로 최종 업데이트.
사이클 기록 섹션에 전체 결과 요약 추가:
```
## {날짜} 사이클 기록
- 소스: {사용한 소스 이름 나열}
- 검색: {총 URL}개 → 분석 {성공}개 → 게이트 통과 {통과}개 → 큐레이션 {제시}개 → keep {keep}개 → 최종 등록 {등록}개
- kept: [{등록된 ID 나열}]
- deleted: [{삭제된 ID 나열}]
- rejected: [{reject된 ID + 사유}]
- 패턴: {keep 패턴 요약}
```

### Step D: seen.json 업데이트

이번 사이클에서 처리한 모든 URL의 status를 기록한다.
totalCycles를 +1 증가, lastCycle을 오늘 날짜로 업데이트.

### Step E: 완료 메시지

```
━━━ reference-search 완료 ━━━━━━━━━━━━━

등록: {N}개 레퍼런스
  {id} {name} → web/data/catalog/{id}-{slug}.md
  ...

스킵: {M}개 (delete {D}, reject {R})
taste-profile 업데이트 완료
총 레퍼런스: {이전} → {현재}개
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Phase 4 완료 후 Phase 5로 자동 진입.

---

## Phase 5 — 회고 & 스킬 진화

Phase 4 완료 후 자동 실행.

### Step A: 사이클 메트릭 수집

이번 사이클의 수치를 집계하여 표시한다:

```
━━━ 사이클 회고 ━━━━━━━━━━━━━━━━━━━━━━

📊 메트릭
  검색 결과:  {소스별 URL 수}
  WebFetch:   성공 {N}/{M} ({%}) — 실패 사유: {사유별 횟수}
  게이트:     통과 {N}/{M} — reject 사유: {사유별 횟수}
  큐레이션:   keep {N}/{M} ({%})
  최종 등록:  {N}/{M}

🔍 패턴
  keep 공통점: {keep된 후보의 주요 필드}
  delete 공통점: {delete된 후보의 주요 필드}
  게이트 병목: {가장 많은 reject 사유}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step B: 스킬 개선 제안

메트릭을 분석하여 아래 트리거 조건에 해당하면 개선을 제안한다:

| 카테고리 | 트리거 조건 | 제안 예시 |
|---------|------------|----------|
| 검색 쿼리 | 특정 소스 결과 < 3개 | "해당 소스의 검색 쿼리 수정 또는 비활성화" |
| 분석 프롬프트 | 시그니처 부족 reject > 30% | "분석 프롬프트에 시그니처 추출 강조 추가" |
| 게이트 임계값 | 유사도 경고 > 50%이나 전부 keep | "유사도 임계값 0.8 → 0.85 완화" |
| 소스 확장 | 활성 소스의 seen 비율 > 50% | "미활성 소스 활성화 테스트" |
| 카드 형식 | 사용자가 추가 정보 요청 반복 | "큐레이션 카드에 해당 필드 추가" |
| 라운드 수 | keep 비율 > 80% | "라운드 1개로 축소" |
| 라운드 수 | keep 비율 < 20% | "검색 범위를 3개월로 확대" |

제안이 없으면 "개선 사항 없음"으로 표시.

제안 형식:
```
💡 스킬 개선 제안 ({N}개)

1. [{카테고리}] {메트릭 수치}
   → {제안 내용}
   영향: {수정할 파일과 부분}

2. ...

반영할 번호를 입력하세요 (예: "1, 2"). 없으면 Enter:
```

### Step C: 사용자 승인 후 스킬 수정

사용자가 번호를 입력하면:

1. 해당 제안에 따라 파일을 수정한다
   - reference-search.md 수정: Edit 사용
   - sources.json 수정: Read → 수정 → Write 사용
2. taste-profile.md의 "스킬 변경 이력" 섹션에 변경 내용 추가
3. 변경된 파일을 커밋:
   ```
   git commit -m "refactor: reference-search skill - {변경 요약}"
   ```

### 수정 가능 영역 (화이트리스트)

이 스킬이 자기 자신을 수정할 수 있는 범위:

수정 가능:
- 분석 프롬프트 문구
- 검색 쿼리 및 소스 enabled 상태
- 게이트 임계값 (0.6~0.95 범위)
- 큐레이션 카드 표시 필드
- 라운드 수 (1~3 범위)
- 검색 시간 범위 (1~6개월)

수정 불가 (제안만, 사용자에게 직접 수정 권고):
- Phase 순서/구조
- 카탈로그 MD 스키마
- references.ts 타입 정의
- seen.json 구조
- taste-profile EWMA 로직
- 에러 처리 폴백 로직

### Step D: 종료

```
━━━ 스킬 업데이트 완료 ━━━━━━━━━━━━━━━

수정된 파일:
  {파일 경로} ({변경 요약})
  ...

다음 사이클을 실행하시겠습니까?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

사용자가 "예"/"다음"/"ㅇ" 등으로 응답하면 Phase 1부터 다시 시작.
아니면 종료.

---

## 에러 처리 & 폴백

- **WebFetch 실패** (타임아웃, 403 등): 해당 후보 스킵, 다음 후보로 이동
- **분석 성공 후보 3개 미만**: 추가 소스에서 검색하여 채움. 그래도 3개 미만이면 가용한 후보만으로 라운드 진행
- **og:image 없거나 로고만**: 이미지 분석 스킵, HTML 구조 분석만 사용
- **curl 실패** (이미지 다운로드): 이미지 분석 스킵
- **라운드 2에서 새 URL 0개**: "새 후보가 없습니다. 사이클을 종료합니다."로 Phase 4 진행
