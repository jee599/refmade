# reference-search 스킬 설계 (v2)

## Overview

`/reference-search` — 디자인 어워드 갤러리에서 새 레퍼런스를 탐색하고, 인터랙티브 큐레이션을 거쳐 refmade 카탈로그에 등록하는 Claude Code 스킬.

## 산출물

1. **스킬 파일**: `.claude/commands/reference-search.md`
2. **데이터 파일**: `web/data/sources.json`, `web/data/seen.json`, `web/data/taste-profile.md`
3. **레퍼런스 파일**: `web/data/catalog/0XX-*.md` + `web/src/app/data/references.ts` 자동 업데이트

---

## 전체 흐름 (사용자 시점)

```
사용자: /reference-search 실행
  ↓
[자동] 소스 검색 → 10개 URL 수집 → HTML 분석 → 품질 게이트 필터링
  ↓
[표시] "7개 후보 중 5개를 보여드립니다" (게이트 통과분만)
  ┌────────────────────────────────────┐
  │ 1. [064] Noir Editorial            │
  │ 2. [065] Swiss Brutalist           │
  │ 3. [066] Warm Organic              │
  │ 4. [067] Neon Gradient             │
  │ 5. [068] Serif Magazine            │
  └────────────────────────────────────┘
  ↓
사용자: "1, 3, 5"  (keep할 번호만 입력)
  ↓
[자동] taste-profile 중간 저장
  ↓
[자동] 다음 소스에서 10개 URL 수집 → 분석 → taste 필터링 → 게이트
  ↓
[표시] 라운드 2 후보 5개
  ↓
사용자: "2, 4"
  ↓
[자동] keep된 전체(1,3,5,2,4 = 5개)에 대해 최종 차별성 검사
  ↓
[자동] 통과한 레퍼런스 → catalog MD 생성 + references.ts 업데이트
  ↓
[자동] taste-profile 최종 저장 + seen.json 기록
  ↓
[표시] "4개 레퍼런스 등록 완료. 다음 사이클?"
```

---

## Phase 1 — 소스 검색 + URL 수집

### 라운드 단위로 반복

Phase 1~3은 **라운드 단위로 반복**된다. 최대 2라운드.

```
라운드 N:
  Phase 1 (검색) → Phase 2 (분석+게이트) → Phase 3 (큐레이션)
```

라운드 종료 후 Phase 4(산출물 생성)를 1회 실행.

### 검색

```
소스 순회 (Awwwards → CSSDA → SiteInspire → Godly)
  ↓
WebSearch "site:{source} {쿼리}" (당월 + 전월)
  ↓
갤러리 페이지 URL 수집 (예: awwwards.com/sites/xyz)
  ↓
실제 사이트 URL 추출:
  1) 스니펫에서 도메인 추출
  2) 실패 → 갤러리 페이지 WebFetch → 외부 링크 추출
  3) 실패 → 스킵
  ↓
seen.json 대조 → 중복 제거
  ↓
10개 URL 확보 (5개는 큐레이션, 나머지는 taste 필터링용 버퍼)
```

### 초기 소스

구현 첫 버전은 **Awwwards만** 사용. 나머지 소스(CSSDA, SiteInspire, Godly)는 Awwwards 검색 쿼리가 실제로 유효한 결과를 반환하는지 검증 후 추가한다.

```json
[
  {
    "name": "Awwwards",
    "searchQuery": "site:awwwards.com site of the day {year}-{month}"
  }
]
```

`{year}`, `{month}`는 실행 시점 기준으로 치환. 당월이 3월이면 `2026-03`과 `2026-02` 두 번 검색.

---

## Phase 2 — 분석 + 품질 게이트

### Step A: HTML 구조 분석 (주력)

```
WebFetch로 실제 사이트 HTML 가져오기
  ↓
HTML에서 추출:
  - <link> 태그 → Google Fonts 이름, weight
  - CSS custom properties (--color-*, --font-* 등) → 있으면 보너스
  - <meta name="theme-color"> → 브랜드 색상 힌트
  - 전체 HTML 구조 → 섹션 수, 레이아웃 패턴, 네비게이션 구조
  - og:image URL → Step B용
  ↓
Claude가 HTML 텍스트를 읽고 디자인 토큰 추론:
  tone, style, layout, density, pacing, palette, typography, material, signature_moves
```

CSS 직접 파싱이 아니라 **HTML 전체를 Claude가 읽고 추론**하는 방식. 해시 클래스 문제 없음.

### Step B: 이미지 분석 (보조, 가능할 때만)

```
og:image URL이 있으면:
  Bash: curl -sL -o /tmp/ref-{id}.jpg "{og_image_url}"
  Read: /tmp/ref-{id}.jpg → Claude 멀티모달 분석
  ↓
  톤, 컬러, 레이아웃 느낌 보정

og:image가 없거나 로고만:
  스킵, Step A 결과만 사용
```

### Step C: 레퍼런스 MD 초안 생성

분석 결과를 기존 카탈로그 구조(001-clean-minimal.md 정규 형식)로 변환:

```markdown
---
id: {next_id}
name: {name}
tags: [{tag1}, {tag2}, ...]
tone: {light|dark}
inspired_by: [{source_url}]
status: draft
---

# {id} — {name}

## Preview
`samples/{id}-{slug}.html`

## Palette
- Background: {bg}
- Text: {text}
- Subtle BG: {subtle_bg}
- Border: {border}
- Muted: {muted}
- Accent: {accent}

## Typography
- Heading: {font} ({weight}, {letter-spacing})
- Body: {font} ({weight})
- Mono: {font}
- h1: {size} ({weight}, {letter-spacing}, {line-height})
- h2: {size} ({weight}, {letter-spacing})
- Body: {size} ({line-height})

## Layout
- Hero: {description}
- Features: {description}
- Cards: {description}
- Buttons: {description}
- Max width: {max-width}

## Key Details
- {signature_move_1}
- {signature_move_2}
- {signature_move_3}
...

## Section Order
{nav -> hero -> ... -> footer}

## Background Pattern
{bg color alternation}

## Padding Pattern
{section padding values}

## Material
{one-line metaphor}

## Rhythm
- pacing: {slow|medium|fast}
- density: {sparse|balanced|dense}

## Anti-patterns
- {이 디자인에서 하지 말 것 1}
- {이 디자인에서 하지 말 것 2}

## Reconstruction Hints
- {재구현 핵심 포인트 1}
- {재구현 핵심 포인트 2}
```

새로 추가되는 섹션(Material, Rhythm, Anti-patterns, Reconstruction Hints)은 기존 섹션 뒤에 붙인다. 기존 레퍼런스에는 백필하지 않는다.

### Step D: 품질 게이트 (큐레이션 전에 실행)

| # | 게이트 | 조건 | 결과 |
|---|--------|------|------|
| 1 | 시그니처 부족 | signature_moves < 3개 | reject |
| 2 | 소스 노후 | 소스 사이트 18개월 초과 | reject |
| 3 | 스타일 중복 | 기존 레퍼런스와 유사도 > 0.8 | 경고 표시 후 큐레이션에 포함 |

게이트 1, 2를 통과한 후보만 Phase 3 큐레이션에 올린다. 게이트 3은 경고만 표시하고 사용자가 판단.

스타일 유사도 계산 (기존 카탈로그의 `tags`와 `tone` 필드 기반):
```
유사도 = (tone 일치 × 0.3) + (tags Jaccard × 0.7)
  tags Jaccard = |신규 tags ∩ 기존 tags| / |신규 tags ∪ 기존 tags|
```

비교 대상: 기존 레퍼런스 전체. 스킬 실행 시 references.ts를 읽어 인덱스를 구성한다.

### Step E: taste-profile 기반 필터링 (라운드 2부터)

라운드 1에서 taste-profile이 생성된 후, 라운드 2에서는:

```
10개 분석 완료 + 게이트 통과 → 7개 남음
  ↓
taste-profile의 Soft Preferences로 정렬:
  각 후보의 tone/style/layout/density를 taste-profile 가중치와 매칭
  Anti-taste에 해당하는 후보는 순위 하락
  ↓
상위 5개만 큐레이션에 제시
```

라운드 1에서는 taste-profile이 없으므로 게이트 통과 후보를 순서대로 5개 제시.

---

## Phase 3 — 큐레이션

### 후보 카드 형식

```
━━━ 라운드 1: 5개 후보 ━━━━━━━━━━━━━━━

1. [064] Noir Editorial                          ⚠️ 011 Dark Luxury와 유사 (0.82)
   Material: "Ink on matte black paper"
   tone:dark / style:editorial,minimal / density:sparse
   Palette: #0a0a0a #f5f5f0 #c8a97e
   시그니처: letter-spacing 0.2em h1, stagger reveal 0.12s, extreme py-40 hero

2. [065] Swiss Brutalist
   Material: "Concrete slab with stencil type"
   tone:light / style:brutalist,typographic / density:balanced
   Palette: #ffffff #000000 #ff0000
   시그니처: uppercase Helvetica h1, 3px solid borders, grid-overlay background

3. [066] Warm Organic
   ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
keep할 번호를 입력하세요 (나머지는 자동 delete):
```

- 유사도 경고(⚠️)가 있는 후보는 사용자가 보고 판단
- 숫자만 입력하면 keep. 나머지는 자동 delete

### 사용자 입력 예시

```
> 1, 3, 5
```

또는 자연어:
```
> 1번이랑 3번 keep, 나머지 삭제
```

### 라운드 종료 후

```
구조화 필드 집계:
  kept:    { tone.dark: 2, style.editorial: 1, density.sparse: 2 }
  deleted: { layout.card-heavy: 3, style.gradient-text: 2 }
  ↓
taste-profile.md 중간 저장
  ↓
라운드 2 시작 (Phase 1로 돌아감)
```

---

## Phase 4 — 최종 산출물 생성

2라운드 큐레이션 완료 후 1회 실행.

### Step A: 최종 차별성 검사 (게이트 4)

keep된 레퍼런스들 **서로 간** 유사도 검사:
```
keep 5개 중 서로 유사도 > 0.85인 쌍이 있으면:
  → "064와 071이 유사합니다. 둘 중 하나를 선택하세요"
  → 사용자가 선택
```

### Step B: 카탈로그 등록

통과한 레퍼런스 각각에 대해:

1. `web/data/catalog/{id}-{slug}.md` 파일 생성 (Phase 2 Step C에서 만든 초안)
2. `web/src/app/data/references.ts`에 엔트리 추가:

```typescript
{ id: '064', name: 'Noir Editorial', tags: ['editorial','dark','typography'], tone: 'dark', inspired: ['example.com'], accent: '#c8a97e', bg: '#0a0a0a', status: 'draft', description: 'letter-spacing 0.2em h1, stagger reveal, extreme py-40 hero', views: 0, downloads: 0 },
```

필드 매핑:

| Reference 필드 | 소스 |
|---------------|------|
| `id` | 다음 번호 (기존 최대 + 1, 3자리 zero-pad) |
| `name` | 분석에서 도출한 이름 |
| `tags` | 분석의 style + layout + density 태그 |
| `tone` | 분석의 tone |
| `inspired` | [소스 URL] |
| `accent` | Palette의 Accent 색상 |
| `bg` | Palette의 Background 색상 |
| `status` | `"draft"` |
| `description` | signature_moves를 한 문장으로 요약 |
| `sampleFile` | `undefined` (샘플 HTML 생성은 스코프 밖) |
| `views` | `0` |
| `downloads` | `0` |

### Step C: taste-profile.md 최종 저장

```markdown
## Soft Preferences (자동 집계)
- tone.dark: 0.85
- style.editorial: 0.6
- style.minimal: 0.4
- layout.asymmetric: 0.7
- density.sparse: 0.65

## Anti-taste (자동 집계)
- style.gradient-text
- layout.card-heavy
- density.dense

## Reference Anchors
- 011 Dark Luxury, 064 Noir Editorial, 066 Warm Organic

## 2026-03-22 사이클 기록
- 소스: Awwwards
- 검색: 20개 URL → 분석 14개 → 게이트 통과 10개 → 큐레이션 10개 → keep 5개 → 최종 등록 4개
- kept: [064, 066, 068, 071]
- deleted: [065, 067, 069, 070, 072, 073]
- rejected: [074 시그니처 부족, 075 중복]
- 패턴: dark editorial + sparse density 강화
```

Hard Constraints 섹션은 첫 사이클에서 자동 생성하지 않는다. 사용자가 수동으로 추가하거나, SKILL.md의 기존 규칙을 참조하도록 안내만 한다:
```markdown
## Hard Constraints (수동 관리)
SKILL.md 참조. 사이클 진행하며 필요 시 사용자가 추가.
```

### taste-profile 업데이트 로직

지수가중이동평균 (최신 사이클 가중치 높게):

```
새 사이클 가중치 = 0.7
기존 누적 가중치 = 0.3

예: tone.dark 기존 0.6, 이번 사이클 0.9
→ 0.6 × 0.3 + 0.9 × 0.7 = 0.81
```

첫 사이클에서는 초기값이 없으므로 이번 사이클 값이 그대로 적용.

Soft Preferences는 keep된 후보의 필드 빈도로 계산:
```
keep 5개 중 tone.dark가 4개 → tone.dark = 4/5 = 0.8
keep 5개 중 style.editorial이 2개 → style.editorial = 2/5 = 0.4
```

Anti-taste는 delete된 후보에서 3회 이상 등장한 필드:
```
delete 7개 중 layout.card-heavy가 5개 → Anti-taste에 추가
delete 7개 중 style.gradient-text가 4개 → Anti-taste에 추가
delete 7개 중 tone.light가 2개 → 임계값 미달, 추가 안 함
```

### Step D: seen.json 업데이트

```json
{
  "urls": {
    "https://example.com": {
      "source": "Awwwards",
      "firstSeen": "2026-03-22",
      "status": "kept"
    },
    "https://another.com": {
      "source": "Awwwards",
      "firstSeen": "2026-03-22",
      "status": "deleted"
    },
    "https://rejected.com": {
      "source": "Awwwards",
      "firstSeen": "2026-03-22",
      "status": "rejected"
    }
  },
  "lastCycle": "2026-03-22",
  "totalCycles": 1
}
```

status 정의:
- `kept`: 사용자가 큐레이션에서 keep + 게이트 통과 → 카탈로그 등록됨
- `deleted`: 사용자가 큐레이션에서 delete
- `rejected`: 품질 게이트 실패 (시그니처 부족, 노후 등)

### Step E: 완료 메시지

```
━━━ reference-search 완료 ━━━━━━━━━━━━━

등록: 4개 레퍼런스
  064 Noir Editorial → web/data/catalog/064-noir-editorial.md
  066 Warm Organic → web/data/catalog/066-warm-organic.md
  068 Serif Magazine → web/data/catalog/068-serif-magazine.md
  071 Neon Minimal → web/data/catalog/071-neon-minimal.md

스킵: 6개 (delete 4, reject 2)
taste-profile 업데이트 완료
총 레퍼런스: 63 → 67개

다음 사이클을 실행하시겠습니까?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 에러 처리 & 폴백

- **WebFetch 실패** (타임아웃, 403 등): 해당 후보 스킵, 다음 후보로 이동
- **분석 성공 후보 3개 미만**: 추가 소스에서 검색하여 채움. 그래도 3개 미만이면 가용한 후보만으로 라운드 진행
- **og:image 없거나 로고만**: 이미지 분석 스킵, HTML 구조 분석만 사용
- **curl 실패** (이미지 다운로드): 이미지 분석 스킵
- **라운드 2에서 새 URL 0개**: "새 후보가 없습니다. 사이클을 종료합니다."로 Phase 4 진행

---

## 스킬 파일 구조

`.claude/commands/reference-search.md`는 위 Phase 1~4를 Claude Code가 순차 실행하는 프롬프트로 구성한다.

필요한 도구:
- WebSearch (갤러리 검색)
- WebFetch (실제 사이트 HTML)
- Bash (이미지 다운로드: curl)
- Read (sources.json, seen.json, taste-profile.md, 기존 카탈로그, 다운로드된 이미지)
- Write (새 레퍼런스 MD, references.ts, seen.json, taste-profile.md)
- Edit (references.ts에 엔트리 추가)

큐레이션 입력은 Claude Code의 자연스러운 대화 흐름 — 후보를 제시하면 사용자가 채팅으로 응답.

---

## 레퍼런스 누적 전략

```
사이클 1 (3월): 63개 → 65~67개 (+2~4 keep, 게이트 통과분)
사이클 2 (3월): 67개 → 69~71개
...
목표: 150-180개 (12-15개 버티컬 커버)
```
