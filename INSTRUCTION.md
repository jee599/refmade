# 웹 디자인 분석 → 스킬 생성 프로젝트

> **Claude Code 실행 시:** 이 문서의 "실행 계획" 섹션으로 바로 이동하여 Stage 0부터 실행하라.
> PHASE 0~0.5는 디자인 정의와 LLM 한계 전략으로, 스킬 생성 시 참조하는 배경 지식이다.
> 코드를 작성할 때 필요하면 참조하되, 실행 순서는 "실행 계획" 섹션을 따른다.

---

## 프로젝트 목표

사용자가 "SaaS 랜딩 만들어줘", "대시보드 만들어줘" 같은 요청을 할 때,
AI가 만든 티가 나지 않는, 전문 디자이너가 작업한 것과 같은 수준의 프론트엔드 코드를 생성하는 스킬을 만든다.

이를 위해:
1. "AI 느낌 디자인" vs "전문가 디자인"을 깊이 있게 정의한다
2. LLM이 "느낌"을 모르는 한계를 구조적으로 극복하는 전략을 세운다
3. 상위 200~300개 웹사이트의 디자인을 실측 데이터로 수집한다
4. 데이터를 통계 처리하여 "전문가 디자인의 공통 패턴"을 추출한다
5. 이 패턴을 Claude Code 스킬로 변환한다

---

## PHASE 0: "전문가 디자인"의 정의

### 근본 문제: 왜 AI가 만든 사이트는 AI 느낌이 나는가

LLM은 학습 데이터에서 "가장 많이 등장하는 패턴"으로 수렴한다.
"SaaS 랜딩 만들어줘"라고 하면 인터넷에 존재하는 수백만 개 SaaS 사이트의 통계적 평균을 출력한다.
문제는 평균이 곧 평범이라는 것이다.

전문 디자이너는 평균에서 "의도적으로 벗어난다." 벗어나는 방향과 정도가 숙련의 영역이다.
Linear.app은 어둡고 미니멀하게, Notion은 밝고 친근하게, Stripe는 날카롭고 정돈되게.
각각 다른 방향으로 벗어나지만, 공통적으로 "의도가 느껴진다."

AI 느낌 = 의도 없는 기본값의 조합.
전문가 느낌 = 의도 있는 선택의 일관된 조합.

### AI 디자인의 정확한 실패 모드 7가지

단순히 "별로다"가 아니라, 정확히 어떤 실패가 발생하는지 정의한다.
이 7가지가 스킬의 안티패턴 체크리스트가 된다.

**실패 1: 수렴적 색상**
AI는 blue-600 + purple-500 그라데이션 + 흰 배경으로 수렴한다.
Tailwind의 기본 팔레트에서 가장 "안전한" 조합이기 때문이다.
전문가는 브랜드 고유 색상을 선택한다. Vercel의 검정, Linear의 보라-파랑, Cal.com의 주황.
핵심 차이: 전문가의 색상은 "이 브랜드의 색"이고, AI의 색상은 "아무 브랜드의 색"이다.

**실패 2: 계층 없는 타이포그래피**
AI는 제목 24~30px, 본문 16px을 기본으로 준다. 비율이 1.5~2배.
전문가는 제목 48~72px, 본문 16~18px. 비율이 3~4배.
이 차이가 "시각적 계층(visual hierarchy)"의 핵심이다.
큰 것은 아주 크게, 작은 것은 확실히 작게. 중간이 없어야 계층이 선명하다.

**실패 3: 균등한 간격**
AI는 모든 섹션에 py-16 또는 py-20을 균등하게 준다.
전문가는 히어로에 py-32, 일반 섹션에 py-20, CTA 섹션에 py-24처럼 변주를 준다.
이것이 "리듬(rhythm)"이다. 음악에서 모든 음이 같은 간격이면 지루한 것과 같다.
섹션 간 간격의 변화가 페이지에 호흡을 만든다.

**실패 4: 동일한 카드 크기**
AI는 3개 카드를 grid-cols-3로 같은 크기로 나열한다.
전문가는 메인 카드를 크게, 나머지를 작게 하거나, 벤토 그리드로 크기를 섞는다.
이것이 "강조(emphasis)"와 "비례(proportion)"다. 모든 것이 같은 크기면 어떤 것도 중요하지 않다.

**실패 5: 장식 없는 밋밋함**
AI는 구조(헤더, 카드, 버튼)만 만들고 디테일을 빠뜨린다.
전문가의 사이트에는 미세한 보더(border-gray-100), 카드에 살짝 띄운 그림자(shadow-sm),
호버 시 배경색 전환(transition-colors), 배경에 은은한 도트 패턴이 있다.
이런 디테일 하나하나는 눈에 띄지 않지만, 합쳐지면 "완성도"를 만든다.

**실패 6: 개성 없는 폰트**
AI는 Inter, Roboto, Arial을 기본으로 쓴다. 가장 안전한 선택이지만 가장 무개성한 선택이다.
전문가는 프로젝트에 맞는 폰트를 고른다. 기술적 느낌이면 Geist/JetBrains Mono,
따뜻한 느낌이면 DM Sans/Plus Jakarta Sans, 고급 느낌이면 Playfair Display/Fraunces.
폰트 하나가 사이트 전체의 성격을 결정한다.

**실패 7: 예측 가능한 구조**
AI는 항상 같은 순서: 네비게이션 → 히어로(중앙 정렬, 큰 텍스트 + 2개 버튼) → 3개 특징 카드 → ...
전문가도 비슷한 순서를 쓰지만, 각 섹션의 "표현 방식"이 다르다.
히어로가 분할(split) 레이아웃이거나, 특징이 카드가 아니라 큰 이미지 + 텍스트 교차 배치이거나.
같은 정보를 다른 시각적 형태로 전달한다.

**실패 8: 맥락 없는 placeholder 텍스트**
AI는 "Streamline Your Workflow", "Built for Teams", "Get Started Today" 같은 범용 문구를 반복한다.
전문가의 사이트는 제품에 특화된 카피를 쓴다. Linear는 "Build software at the speed of thought",
Vercel은 "Your complete platform for the web". 제품의 핵심 가치를 한 문장에 녹인다.
디자인이 아무리 좋아도 텍스트가 뻔하면 AI 사이트처럼 보인다.
→ 스킬에서 직접 해결하기 어렵지만, "placeholder 텍스트를 생성할 때 범용 SaaS 문구를 피하라"는 지시를 포함.
→ 가능하면 사용자에게 제품 한 줄 설명을 먼저 물어보고, 그것을 기반으로 카피를 작성하라.

### 전문 디자인의 10가지 원리 — 코드로 번역하기

디자인 원리는 추상적이지만, 각 원리를 CSS/Tailwind 규칙으로 번역할 수 있다.
이것이 이 프로젝트의 핵심 전략이다.

**원리 1: 시각적 계층 (Visual Hierarchy)**
정의: 중요한 것은 크고 굵고 진하게, 덜 중요한 것은 작고 가볍고 옅게.
코드 규칙:
- h1/body font-size 비율 최소 3배 (48px vs 16px)
- font-weight 극단 사용: 제목 700~900, 본문 400
- 색상 대비: 제목은 gray-900, 부제는 gray-600, 캡션은 gray-400
- 한 뷰포트에 시각적 1순위는 1개만 (보통 h1 또는 히어로 이미지)
검증 방법: 페이지를 흐리게(blur) 보았을 때 3단계 계층이 보이면 성공

**원리 2: 리듬 (Rhythm)**
정의: 간격에 예측 가능한 패턴이 있되, 단조롭지 않은 변주가 있다.
코드 규칙:
- 8px 그리드 시스템: 모든 간격이 8의 배수 (8, 16, 24, 32, 48, 64, 80, 96, 128)
- 섹션 간 패딩은 최소 2가지 이상 사용 (예: py-20과 py-32를 교대)
- 컴포넌트 내부 간격 < 섹션 간 간격 < 페이지 최상위 간격 (점진적 확대)
검증 방법: 모든 간격이 같으면 실패, 2~3종류 간격이 교대하면 성공

**원리 3: 비례 (Proportion)**
정의: 요소 크기 간에 수학적 관계가 있다. Modular Scale.
코드 규칙:
- 타이포 스케일: base 16px, ratio 1.25 (Major Third) → 16, 20, 25, 31, 39, 49px
- 또는 base 16px, ratio 1.333 (Perfect Fourth) → 16, 21, 28, 38, 50, 67px
- 간격도 같은 비율 시스템: base 16px → 16, 24, 32, 48, 64, 96px
- 카드 크기 비율: 1:1, 2:1, 1:2 같은 정수비로 벤토 그리드 구성
검증 방법: 사이트에 쓰인 모든 font-size를 나열했을 때 규칙적인 진행이 보이면 성공

**원리 4: 여백 (Whitespace)**
정의: 빈 공간은 "비어있는 것"이 아니라 "숨 쉴 공간"이다.
코드 규칙:
- 중요한 요소 주변에 더 넓은 여백 (h1 위아래 mb-6~mb-8, 일반 텍스트 mb-3~mb-4)
- 컨테이너 max-width는 내용보다 넉넉하게 (max-w-5xl 이내가 대부분)
- 히어로 영역은 화면의 70~100vh를 차지 (내용이 적어도 공간을 크게)
- 카드 내부 패딩은 내용의 시각적 무게에 비례 (텍스트만이면 p-8, 이미지 포함이면 p-4~p-6)
검증 방법: "빽빽하다" 느낌이 들면 실패, "시원하다" 느낌이 들면 성공

**원리 5: 대비 (Contrast)**
정의: 서로 다른 요소는 확실히 다르게, 같은 역할은 확실히 같게.
코드 규칙:
- 배경과 텍스트의 명도 대비 WCAG AA 이상 (4.5:1)
- CTA 버튼은 주변과 확실히 다른 색 (회색 배경에 검정 버튼, 흰 배경에 컬러 버튼)
- 섹션 배경 교대: 흰 → 연한 회색 → 흰 → 어두운 (monotone 방지)
- 폰트 무게 대비: 제목과 본문 사이에 300 이상 차이 (예: 800 vs 400)
검증 방법: 페이지를 흑백으로 변환해도 계층이 보이면 성공

**원리 6: 균형 (Balance)**
정의: 시각적 무게가 한쪽으로 쏠리지 않는다. 대칭이거나 의도적 비대칭.
코드 규칙:
- 센터 정렬 히어로: 텍스트 + CTA가 정중앙, 좌우 대칭
- 스플릿 히어로: 왼쪽 텍스트 = 오른쪽 이미지 (시각적 무게 균형)
- 비대칭일 때: 큰 이미지 1개 vs 작은 텍스트 + 많은 여백 (여백이 무게를 상쇄)
검증 방법: 화면 중앙에 세로선을 그었을 때 양쪽 "밀도"가 비슷하면 성공

**원리 7: 강조 (Emphasis)**
정의: 가장 중요한 것 1개가 가장 먼저 눈에 들어온다.
코드 규칙:
- Primary CTA 버튼은 페이지에서 가장 진한/밝은 색 (시선 집중)
- Secondary CTA는 outline이나 ghost 스타일 (Primary보다 약하게)
- 한 뷰포트에 강조 요소 최대 2개 (제목 + CTA 버튼)
- 강조하려면: 크기를 키우거나, 색을 다르게 하거나, 여백을 넓히거나 (3가지 중 택 1~2)
검증 방법: 3초 안에 "이 페이지가 뭘 원하는지" 알 수 있으면 성공

**원리 8: 통일 (Unity)**
정의: 모든 요소가 같은 디자인 시스템에서 온 느낌. 일관성.
코드 규칙:
- border-radius 통일: 전체 사이트에서 1~2가지만 사용 (예: rounded-lg + rounded-full)
- 그림자 통일: shadow-sm 또는 shadow-md 하나로 통일
- 색상 팔레트: 주색 1개 + 보조색 1개 + 뉴트럴(gray) 계열만
- 아이콘 스타일 통일: Lucide면 전부 Lucide, Heroicons면 전부 Heroicons
검증 방법: 아무 컴포넌트 2개를 뽑아 나란히 놓았을 때 "같은 사이트"로 보이면 성공

**원리 9: 반복 (Repetition)**
정의: 같은 패턴이 반복되면 사용자가 패턴을 학습하고 편안해진다.
코드 규칙:
- 특징 카드가 3개면 3개 다 같은 구조 (아이콘 + 제목 + 설명)
- 섹션 제목 스타일 통일 (뱃지 + h2 + 부제 패턴 반복)
- 버튼 스타일 일관 (같은 높이, 같은 패딩, 같은 radius)
검증 방법: 사이트를 빠르게 스크롤했을 때 "패턴"이 느껴지면 성공

**원리 10: 움직임 (Movement / Flow)**
정의: 사용자의 시선이 자연스럽게 위에서 아래로, 왼쪽에서 오른쪽으로 흐른다.
코드 규칙:
- F-패턴 또는 Z-패턴 레이아웃 (제목→부제→CTA→이미지 순서)
- 스크롤 시 요소가 순차적으로 나타나는 페이드인 (위→아래 방향)
- 시선을 잡는 요소(이미지, 일러스트)를 스크롤 경로에 배치
- 화살표, 선, 숫자 등 시각적 가이드로 흐름 유도
검증 방법: 페이지를 처음 방문한 사람이 "어디를 먼저 볼지" 예측 가능하면 성공

### 2025-2026 트렌드 요소

이것들이 있으면 "최신" 느낌이 나고, 없으면 "2022년 사이트" 느낌:
- backdrop-blur 네비게이션 (배경이 비치는 반투명 헤더)
- 벤토 그리드 (다양한 크기 카드 조합)
- 그라데이션 텍스트 (배경이 아니라 제목 텍스트에)
- 미세한 도트/그리드 배경 패턴
- 스크롤 기반 페이드인 애니메이션
- 큰 제목 (히어로 48px~72px)
- 제품 스크린샷을 브라우저 목업에 넣기
- 뱃지/칩이 히어로 제목 위에 (신규 기능 알림)
- pill-shaped 버튼 (rounded-full)
- monospace 폰트를 악센트로 사용 (코드 한 줄, 레이블)

### 반응형 축소 가이드 (업계 관행 기반)

MVP에서는 데스크탑(1440px)만 분석하지만, 스킬이 생성하는 코드는 반응형이어야 한다.
아래는 실측 데이터 없이 업계 표준 관행으로 작성한 축소 비율이다.
(향후 모바일 375px 분석 데이터가 생기면 실측값으로 교체)

```
데스크탑 → 모바일 축소 규칙:
타이포:
  h1: text-5xl → sm:text-3xl (48px → 30px)
  h2: text-3xl → sm:text-2xl (30px → 24px)
  body: text-base 유지 (16px)
간격:
  히어로 padding: py-24 → sm:py-16
  섹션 padding: py-20 → sm:py-12
  컨테이너: max-w-6xl → sm:px-4 (좌우 패딩으로 전환)
레이아웃:
  grid-cols-3 → sm:grid-cols-1
  grid-cols-2 → sm:grid-cols-1
  split 히어로 → sm:세로 스택 (이미지 아래로)
  푸터 4컬럼 → sm:2컬럼 또는 아코디언
컴포넌트:
  가격표 3열 → sm:세로 스택 (추천 플랜 먼저)
  네비게이션 → sm:햄버거 메뉴
```

### 현대 디자인 시스템과 공식 가이드라인 — 스킬의 학문적 근거

이 프로젝트의 규칙들은 경험칙이 아니라, 현재 업계에서 쓰이는 공식 디자인 시스템과
최신 연구에서 직접 가져온다. 아래는 스킬 생성 시 규칙의 근거가 되는 소스들이다.

#### 1. Refactoring UI (Adam Wathan & Steve Schoger, 2018)

Tailwind CSS 창시자가 쓴 책. "디자인은 재능이 아니라 시스템이다."
이 책은 현재 디자인 교육에서 개발자 대상 UI 교재의 사실상 표준이다.
이 프로젝트의 철학 "의도 없는 기본값 → 의도 있는 제한된 시스템"과 완전히 일치한다.

핵심 원칙 → 코드 규칙 변환:

**"그레이스케일로 먼저 디자인하라"**
→ spacing, contrast, size만으로 계층을 먼저 잡아라. 색상은 마지막에.
→ 스킬 규칙: font-size/weight/gray 톤만으로 3단계 계층이 성립해야 색상 적용.

**"여백은 빼는 것이 아니라 시작점이다"**
→ 너무 많은 여백에서 시작해서 줄여라. 대부분 "넓은" 상태에서 멈추게 된다.
→ 스킬 규칙: 섹션 패딩 py-20~py-32로 시작. py-12 이하 금지.

**"크기가 아닌 색상과 무게로 계층을 만들라"**
→ gray-900(1차) vs gray-600(2차) vs gray-400(3차) + font-weight 700 vs 400.
→ 같은 font-size에서도 3단계 구분이 가능하다.

**"제한된 간격 스케일을 사용하라"**
→ 임의의 값(13px, 17px) 대신 제한된 스케일(4, 8, 16, 24, 32, 48, 64px).
→ 스킬 규칙: Tailwind spacing scale만 사용. p-[13px] 같은 임의값 절대 금지.

**"Primary/Secondary/Tertiary 버튼 계층"**
→ Primary 1개(solid), Secondary 2~3개(outline), Tertiary(ghost/text).
→ 한 뷰포트에 solid 버튼 최대 1개. destructive 액션은 Primary로 쓰지 마라.

**"강조하려면 주변을 약화하라"**
→ CTA가 안 보이면 CTA를 화려하게 만드는 대신 주변을 수수하게 만들어라.

**"테두리 대신 그림자/배경색/간격을 사용하라"**
→ border는 시각적 노이즈. shadow-sm, bg-gray-50, 넓은 gap이 더 깔끔한 분리.

이미 이 책의 원칙을 Claude Code 스킬로 만든 오픈소스가 존재한다 (wondelai/refactoring-ui).
우리 프로젝트는 여기서 더 나아가 실측 데이터로 수치를 보정하는 것이다.

#### 2. Google Material Design 3 & M3 Expressive (2021~2025)

Google의 공식 디자인 시스템. 2025년에 M3 Expressive로 진화.
46개 리서치 스터디, 18,000+ 참가자 기반. 현재 가장 대규모 사용자 연구에 근거한 디자인 시스템.

스킬에 적용할 핵심 개념들:

**디자인 토큰 (Design Tokens)**
M3는 모든 디자인 결정을 토큰으로 추상화한다. 색상, 타이포, 간격, 그림자, radius가 각각 토큰.
→ 스킬 규칙: CSS 변수(--color-primary, --space-section, --radius-card)로 전체 톤을 한 번에 변경.
→ 톤 A~E 전환 = 토큰 값만 교체. 구조는 동일.

**적응형 타이포그래피 (Adaptive Typography)**
M3의 타입 스케일: Display(L/M/S), Headline(L/M/S), Title(L/M/S), Body(L/M/S), Label(L/M/S).
15단계이지만, 실제로 한 페이지에 쓰이는 건 5~6단계.
→ 스킬 규칙: 한 페이지에 font-size 6종 이내. Display=h1, Headline=h2, Title=카드제목, Body=본문, Label=버튼/뱃지.

**5단계 라운드니스 (Shape System)**
M3 Expressive: Extra-Small(4px), Small(8px), Medium(12px), Large(16px), Extra-Large(28px).
→ 스킬 규칙: 사이트 전체에서 border-radius 2가지만 사용. 예: rounded-lg(8) + rounded-full.

**동적 색상 (Dynamic Color)**
M3의 색상 시스템은 브랜드 색상 1개에서 전체 팔레트를 자동 생성한다.
Primary, Secondary, Tertiary, Error, Surface, On-Surface 등 역할 기반 색상.
→ 스킬 규칙: 색상을 역할로 정의. "파란색"이 아니라 "Primary"로. 톤 변경 시 역할만 교체.

**M3 Expressive (2025)의 핵심 변화**
Gen Z가 maximalist 인터페이스를 87% 선호한다는 Google 리서치 결과.
더 컬러풀하고, 더 많은 애니메이션, 더 표현적인 컴포넌트.
→ 스킬 규칙: Tone D(친근)에서 M3 Expressive 경향 반영. 더 풍부한 색상, pill 버튼, 동적 요소.

#### 3. Apple Human Interface Guidelines — Clarity, Deference, Depth (2014~2026)

Apple의 공식 디자인 철학. 2025년에 "Liquid Glass" 디자인 언어로 대규모 리뉴얼.

**3대 원칙:**
- Clarity: 모든 요소가 읽기 쉽고 의미가 명확해야 한다. 장식이 기능을 가려선 안 된다.
- Deference: UI는 콘텐츠에 양보해야 한다. 인터페이스가 콘텐츠보다 눈에 띄면 실패.
- Depth: 시각적 레이어(전경/배경)와 미세한 모션으로 공간감을 만든다.

스킬에 적용할 규칙:

**Clarity → 타이포 계층과 터치 타겟**
→ 기본 텍스트 17pt(≈17px). 44x44pt 최소 터치 영역.
→ 스킬 규칙: body 16~18px. 버튼 최소 높이 h-10(40px) 이상.
→ 텍스트와 배경 대비 4.5:1 이상 (WCAG AA).

**Deference → 콘텐츠 우선**
→ 화려한 UI 장식(네온 그라데이션, 복잡한 패턴)이 콘텐츠를 가리면 안 된다.
→ 스킬 규칙: 배경 패턴은 opacity 0.05~0.1 수준으로 은은하게. 콘텐츠가 항상 전경.

**Depth → 그림자와 blur로 레이어**
→ 2025 Liquid Glass: 반투명 요소, 배경 블러, 빛 굴절 효과.
→ 스킬 규칙: 네비게이션에 backdrop-blur + bg-white/80. 모달에 backdrop-blur-sm.
→ 카드에 shadow-sm으로 미세한 부유감.

#### 4. W3C Design Tokens Specification (2025.10 — 최초 안정 버전)

2025년 10월 W3C 커뮤니티 그룹이 발표한 디자인 토큰 공식 표준.
색상, 타이포, 간격 등 디자인 결정을 JSON/YAML로 저장하는 벤더 중립 포맷.

Google M3, Adobe Spectrum, Microsoft Fluent, IBM Carbon이 모두 이 방향으로 수렴 중.

스킬에 적용할 핵심 개념:

**3계층 토큰 구조: Global → Alias → Component**
- Global: 원시값 (blue-500: #3b82f6, space-4: 16px)
- Alias: 의미 부여 (color-primary: blue-500, space-section: space-16)
- Component: 용도 특정 (button-bg: color-primary, card-padding: space-6)

→ 스킬 규칙: 스킬이 생성하는 코드에서 색상은 Tailwind의 시맨틱 변수로 정의.
→ `bg-blue-600` 대신 `bg-primary`. 톤 교체 시 --primary 값만 변경.

**토큰으로 관리할 항목 (실무 표준)**
색상: primary, secondary, surface, on-surface, error, success
타이포: font-family, font-size 스케일, font-weight 스케일, line-height
간격: space-1(4px)~space-24(96px)
라운드: radius-sm(4), radius-md(8), radius-lg(16), radius-full
그림자: shadow-sm, shadow-md, shadow-lg
→ 이 구조가 Tailwind의 theme config와 정확히 매핑된다.

#### 5. NNGroup의 5가지 시각 디자인 원칙 (2020, 2025년 갱신)

Nielsen Norman Group(세계 최대 UX 리서치 기관)이 정의한 현대 시각 디자인의 핵심 원칙.
연구 기반이며, 디자인 학교 커리큘럼에 직접 포함된다.

**Scale**: 상대적 크기로 중요도 표현. 크면 중요, 작으면 부차적.
→ 스킬 규칙: h1/body 비율 ≥ 2.5. 중요한 카드는 2배 크기.

**Visual Hierarchy**: 크기 + 색상 + 무게 + 위치로 정보 우선순위 전달.
→ 스킬 규칙: 한 뷰포트에 최우선 요소 1개. 3단계 텍스트 색상(진/중/연).

**Balance**: 시각적 무게의 좌우/상하 균형. 대칭 또는 의도적 비대칭.
→ 스킬 규칙: center 히어로는 좌우 대칭. split 히어로는 텍스트=이미지 무게 균형.

**Contrast**: 서로 다른 요소는 확실히 다르게, 같은 역할은 확실히 같게.
→ 스킬 규칙: WCAG AA 대비 4.5:1. CTA 색상 ≠ 배경색. font-weight 차이 ≥ 300.

**Gestalt Grouping**: 근접·유사·연속·공통영역으로 관련 요소를 그룹화.
→ 스킬 규칙: 카드 내부 gap < 카드 간 gap. 같은 역할 요소는 같은 스타일.

#### 6. Tailwind CSS v4의 디자인 철학 (2025)

Tailwind CSS는 단순한 CSS 프레임워크가 아니라 디자인 시스템 철학을 코드에 녹인 것이다.
v4(2025.01 출시)의 핵심 설계 결정들이 곧 우리 스킬의 코드 규칙이 된다.

**제한된 스케일 (Constrained Scales)**
→ spacing: 0, 1(4px), 2(8px), 3(12px), 4(16px), 5(20px), 6(24px), 8(32px), 10(40px), 12(48px), 16(64px), 20(80px), 24(96px)
→ font-size: text-xs(12) ~ text-9xl(128). 각 단계 사이에 임의값이 없다.
→ 스킬 규칙: 이 스케일 내에서만 값 선택. 임의값([13px]) 사용 금지.

**유틸리티 우선 = 결정론적 스타일링**
→ 클래스 이름 = 정확한 CSS 값. `text-5xl` = font-size: 48px. 모호함이 없다.
→ LLM이 유틸리티 클래스를 쓰면 결과가 결정론적. 커스텀 CSS는 비결정론적.
→ 스킬 규칙: 모든 스타일은 Tailwind 유틸리티 클래스로. 인라인 스타일이나 커스텀 CSS 최소화.

**시맨틱 색상 토큰 (v4)**
→ v4에서 CSS 변수 기반 테마가 네이티브 지원. `--color-primary`를 정의하면 `bg-primary`로 사용 가능.
→ 스킬 규칙: 5개 톤의 색상 팔레트를 CSS 변수로 정의. 톤 변경 = 변수 값만 교체.

#### 7. WCAG 2.2 (2023, W3C 공식 표준)

웹 접근성 가이드라인. 2023년 10월 W3C 공식 권고안.
"잘 만든 사이트"의 객관적 기준이며, 검증 가능한 수치 규칙을 제공한다.

스킬에 직접 반영할 규칙:

**텍스트 대비 (1.4.3)**: 일반 텍스트 4.5:1, 큰 텍스트(18px bold 또는 24px) 3:1.
→ 스킬 규칙: 흰 배경에 텍스트 최소 gray-600(#4b5563). gray-400은 캡션/비활성에만.

**터치 타겟 크기 (2.5.8, WCAG 2.2 신규)**: 최소 24x24px, 권장 44x44px.
→ 스킬 규칙: 버튼 최소 h-10(40px). 아이콘 버튼 최소 w-10 h-10.

**포커스 표시 (2.4.7)**: 키보드 포커스가 시각적으로 보여야 한다.
→ 스킬 규칙: focus-visible:ring-2 ring-offset-2. 모든 인터랙티브 요소에 포함.

**리플로우 (1.4.10)**: 320px 뷰포트에서도 가로 스크롤 없이 읽을 수 있어야 한다.
→ 스킬 규칙: 반응형 필수. sm/md/lg breakpoint로 레이아웃 조정.

#### 소스 → 실측 데이터 → 스킬 규칙의 흐름

```
공식 가이드 (근거)           실측 데이터 (검증)             스킬 규칙 (코드)
──────────────────         ──────────────────         ──────────────
Refactoring UI: 여백 넉넉히  히어로 py 중앙값 80px          py-20 이상으로 시작
M3: 5단계 shape system      radius 분포 8/12/16px에 집중   rounded-lg + rounded-full만
Apple HIG: Clarity 4.5:1    상위 사이트 대비 평균 7.2:1     gray-600 이상만 본문 텍스트
WCAG 2.2: 터치타겟 44px     버튼 height 중앙값 40px        h-10 (40px) 최소
Tailwind: constrained scale  상위 사이트 spacing 8의 배수    Tailwind 스케일만 사용
NNGroup: Scale principle     h1/body 비율 중앙값 3.2        text-5xl / text-base (≥2.5)
W3C Design Tokens: 3계층    상위 사이트 고유 색상 5~8개     시맨틱 변수로 색상 관리
```

PHASE 2~3의 실측 데이터는 이 가이드라인들의 "실제 적용값"을 검증하고 보정한다.
가이드라인이 "최소 4.5:1"이라 해도, 상위 사이트가 실제로 7:1을 쓰면 7:1을 기준으로 삼는다.
공식 가이드가 방향을, 데이터가 정확한 수치를, 스킬이 코드를 제공한다.

---

## PHASE 0.5: LLM의 시각적 한계 — 정확한 진단과 6가지 커버 전략

### LLM이 시각적으로 정확히 무엇을 못하는가

LLM의 한계를 뭉뚱그려 "느낌을 모른다"고 하면 해결책도 뭉뚱그려진다.
정확히 어떤 시각적 판단을 못하는지 10가지로 분류하고, 각각의 커버 방법을 설계한다.

**한계 1: 렌더링 결과를 볼 수 없다 (Blindness)**
LLM은 `text-5xl font-bold`를 출력하지만, 그게 화면에서 어떻게 보이는지 모른다.
디자이너는 코드를 쓰고 → 브라우저에서 보고 → "좀 작네" → 수정을 반복한다.
LLM은 이 피드백 루프가 없다. 한 번에 맞춰야 한다.
→ 커버: **전략 5 (스크린샷 피드백 루프)**

**한계 2: 전체 조화를 판단할 수 없다 (Harmony)**
개별 규칙(h1 48px, padding 80px, gray-900)을 다 지켜도, 합쳐졌을 때 "뭔가 어색한" 경우가 있다.
카드 그림자가 배경 패턴과 충돌하거나, 폰트 조합이 미묘하게 안 맞거나.
이건 개별 수치가 아니라 수치 간의 "관계"에서 오는 문제다.
→ 커버: **전략 2 (검증된 조합 라이브러리)** + **전략 5 (스크린샷 피드백)**

**한계 3: 여백의 "충분함"을 모른다 (Whitespace Quality)**
py-20이 "시원한" 느낌인지 "허전한" 느낌인지는 주변 콘텐츠 양과 밀도에 따라 다르다.
텍스트 2줄짜리 히어로에 py-20은 적절하지만, 텍스트 5줄+이미지에 py-20은 빽빽할 수 있다.
LLM은 콘텐츠 양에 따른 여백 조정을 자동으로 못한다.
→ 커버: **전략 1 (비율 시스템)** — 콘텐츠 양 대비 여백 비율로 판단

**한계 4: 색상 조합의 "느낌"을 모른다 (Color Feeling)**
#3b82f6(blue-500)이 "신뢰감"을 주는지 "차가운" 느낌인지는 주변 색상과의 관계에 따라 다르다.
같은 파란색이라도 흰 배경에서는 깨끗하고, 짙은 회색 배경에서는 네온 느낌이 난다.
LLM은 HEX 값을 출력할 수 있지만 조합의 감정적 효과를 예측할 수 없다.
→ 커버: **전략 2 (검증된 팔레트)** — 자유 선택 대신 검증된 팔레트 세트 제공

**한계 5: 시각적 무게 균형을 모른다 (Visual Weight)**
왼쪽에 텍스트 블록, 오른쪽에 작은 아이콘이 있으면 왼쪽이 "무겁다."
디자이너는 오른쪽에 더 큰 이미지를 넣거나, 왼쪽 텍스트를 줄이거나, 여백을 조정해서 균형을 맞춘다.
LLM은 "왼쪽 50% / 오른쪽 50%"로 나누는 건 할 수 있지만, 시각적 무게까지 계산하지 못한다.
→ 커버: **전략 2 (레이아웃 템플릿)** — 균형이 검증된 고정 구조 사용

**한계 6: 스크롤 리듬을 모른다 (Scroll Rhythm)**
페이지를 위에서 아래로 스크롤할 때, 동일한 패턴이 반복되면 지루하고,
너무 다양하면 산만하다. "적절한 변주"는 감각의 영역이다.
→ 커버: **전략 1 (비율)** + **전략 3 (섹션 시퀀스 규칙)** — 교대 패턴을 규칙화

**한계 7: 폰트 조합을 판단할 수 없다 (Font Pairing)**
"Geist + Inter"는 괜찮지만 "Playfair Display + Comic Sans"는 재앙이다.
두 폰트의 x-height, stroke contrast, 기하학적 특성이 조화를 이뤄야 한다.
LLM은 폰트 이름은 알지만, 시각적 호환성을 판단할 수 없다.
→ 커버: **전략 2 (검증된 폰트 페어)** — 자유 조합 금지, 검증된 페어만 사용

**한계 8: 미세한 디테일의 축적 효과를 모른다 (Craft Accumulation)**
hover 시 배경이 gray-50으로 바뀌고, 카드에 border-gray-100이 있고,
버튼에 transition-all duration-200이 걸려있고, 배경에 opacity-5 도트 패턴이 있다.
각각은 사소하지만, 합쳐지면 "완성도 있다" 느낌을 만든다.
LLM은 명시적으로 지시하지 않으면 이런 디테일을 빠뜨린다.
→ 커버: **전략 4 (디테일 필수 체크리스트)** — 빠뜨리기 쉬운 디테일을 강제 포함

**한계 9: "이건 스톡 사진 느낌이다"를 모른다 (Authenticity)**
placeholder 이미지가 `unsplash` 스톡 사진이면 "AI가 만든 사이트" 냄새가 난다.
진짜 제품 스크린샷이나 목업이 있어야 프로페셔널하다.
LLM은 이미지 영역에 적절한 placeholder를 넣을 수는 있지만,
"이 placeholder가 실제 사이트에서 어떤 인상을 주는지"는 모른다.
→ 커버: **전략 4 (이미지 영역 가이드)** — 이미지 유형/처리 방법을 구체적으로 지정

**한계 10: 애니메이션의 "느낌"을 모른다 (Motion Feel)**
`transition-all duration-300 ease-in-out`이 "부드러운지" "느린지"는 문맥에 따라 다르다.
버튼 hover에 300ms는 적절하지만, 페이지 전환에 300ms는 너무 빠를 수 있다.
LLM은 duration/easing 값은 출력하지만, 체감 속도를 알 수 없다.
→ 커버: **전략 2 (애니메이션 프리셋)** — 용도별 정확한 값을 고정

---

### 전략 1: 비율(Ratio) 시스템 — "느낌"을 수치 관계로 포착

디자이너가 "이 여백이 적당하다"고 느끼는 건 절대값이 아니라 주변과의 비율이다.
h1이 48px일 때 아래 여백 24px이 적당한 건, 비율이 0.5이기 때문이다.
h1이 64px이면 아래 여백은 32px이 되어야 같은 "느낌"이 유지된다.

수집할 비율 (PHASE 2에서 자동 계산):
- h1 font-size / body font-size (기대값 3.0~4.0 — 실측으로 교체)
- h1 margin-bottom / h1 font-size (기대값 0.4~0.6 — 실측으로 교체)
- hero padding / viewport height (기대값 0.15~0.25 — 실측으로 교체)
- section padding / container width (실측에서 추출)
- card padding / card width (실측에서 추출)
- CTA button height / body font-size (실측에서 추출)
- nav height / viewport height (실측에서 추출)
- container max-width / viewport width (기대값 0.7~0.85 — 실측으로 교체)

참고: 위의 "기대값"은 사전 추정치다. 5-generate-skill.js에서 이 값을 하드코딩하지 말 것.
반드시 statistics.json의 실측값을 사용하라. statistics.json에 없는 항목만 기대값을 폴백으로 사용.

이 비율들을 디자인 톤별로 분리하면 "느낌"이 수치화된다.
예: 프리미엄 사이트는 hero/viewport 비율 0.20+, 친근한 사이트는 0.12~0.15.

커버하는 한계: 3(여백 충분함), 6(스크롤 리듬)

### 전략 2: 검증된 조합 라이브러리 — 선택지를 제거하여 실패를 방지

LLM에게 "좋은 색상을 골라라"는 위험하다. "이 5개 팔레트 중 하나를 써라"가 안전하다.
자유도를 줄이고 검증된 조합만 제공하면, LLM이 판단을 못 해도 결과가 보장된다.

**색상 팔레트 라이브러리 (역할 기반, 톤별)**
각 톤에 대해 뉴트럴 계열은 고정하고, 악센트는 사용자가 선택하는 구조.
LLM이 색상을 "조합"하지 않고, 검증된 뉴트럴 세트에서 "선택"만 한다.

구조:
```
톤별 뉴트럴 세트 (고정):
  Tone A(미니멀): {bg: #fff, text: #111, subtle-bg: #f5f5f5, border: #e5e5e5, muted: #737373}
  Tone B(프로페셔널): {bg: #fff, text: #0f172a, subtle-bg: #f8fafc, border: #e2e8f0, muted: #64748b}
  Tone C(다크): {bg: #0a0a0a, text: #fafafa, subtle-bg: #171717, border: #262626, muted: #a3a3a3}
  Tone D(친근): {bg: #fafaf9, text: #1c1917, subtle-bg: #f5f5f4, border: #e7e5e4, muted: #78716c}
  Tone E(개발자): {bg: #09090b, text: #fafafa, subtle-bg: #18181b, border: #27272a, muted: #a1a1aa}

악센트 (사용자 선택 또는 톤별 기본값):
  → 스킬 사용 시 가장 먼저: "브랜드 색상이 있나요? (HEX 또는 색상 이름)"
  → 있으면 그것을 악센트로 사용
  → 없으면 톤별 기본 악센트 제안: A=#000, B=#2563eb, C=#3b82f6, D=#f97316, E=#22c55e
```
(실측 데이터로 뉴트럴 세트 보정. 악센트 기본값도 실측 빈도 기반으로 교체)

→ LLM은 팔레트를 "선택"만 하고, 팔레트 내 색상을 "조합"하지 않는다.
→ 한계 4(색상 느낌)를 완전히 우회.

**폰트 페어 라이브러리 (15~20쌍)**
실측 데이터에서 상위 사이트가 실제 쓰는 조합만 추출.
- Geist Sans + Geist Mono (개발자 도구)
- DM Sans + JetBrains Mono (SaaS)
- Plus Jakarta Sans + Inter (친근)
- SF Pro + SF Mono (Apple 스타일)
(실측에서 추가)

→ LLM은 페어를 "선택"만. 임의 조합 금지.
→ 한계 7(폰트 조합) 완전 우회.

**애니메이션 프리셋 (용도별 정확한 값)**
```
hover-button: transition-colors duration-150 ease-in-out
hover-card: transition-all duration-200 ease-out + shadow 변화
fade-in-scroll: opacity 0→1, translateY 20px→0, duration-500, ease-out
page-section-reveal: opacity 0→1, duration-700, stagger 100ms
nav-backdrop: backdrop-blur-md transition-all duration-300
```
→ LLM이 "적절한 애니메이션"을 판단할 필요 없이, 용도별 프리셋만 적용.
→ 한계 10(애니메이션 느낌) 우회.

**레이아웃 템플릿 (균형 검증 완료)**
```
히어로-center: text-center, max-w-3xl mx-auto, CTA 2개 중앙 배치
히어로-split: grid grid-cols-2, 왼쪽 텍스트(45%) + 오른쪽 이미지(55%)
feature-alternating: 홀수 row는 텍스트-좌/이미지-우, 짝수는 반대
feature-bento: grid 2x2, 첫 번째 카드 col-span-2 (크게), 나머지 작게
```
→ 균형이 이미 잡힌 템플릿. LLM은 내용만 채운다.
→ 한계 5(시각적 무게 균형) 우회.

커버하는 한계: 2(전체 조화), 4(색상 느낌), 5(균형), 7(폰트), 10(애니메이션)

### 전략 3: 섹션 시퀀스 규칙 — 스크롤 리듬의 알고리즘화

디자이너가 직감으로 하는 "이 다음엔 뭐가 와야 자연스러운가"를 규칙으로 만든다.

**배경색 교대 규칙:**
```
섹션 1 (히어로): bg-white (또는 bg-dark)
섹션 2 (소셜 프루프): bg-gray-50 (미세하게 다르게)
섹션 3 (특징 1): bg-white
섹션 4 (특징 2): bg-gray-50
섹션 5 (추천사): bg-white
섹션 6 (CTA): bg-gray-900 (반전, 강조)
섹션 7 (푸터): bg-gray-950
```
규칙: 흰색과 연한 회색을 교대하되, CTA 직전에 한 번 반전(다크 배경).

**패딩 변주 규칙:**
```
히어로: py-24~py-32 (가장 넓음)
일반 섹션: py-16~py-20 (기본)
CTA 섹션: py-20~py-24 (히어로보다 좁고 일반보다 넓음)
소셜 프루프: py-12~py-16 (가장 좁음 — 로고 바이므로)
```
규칙: 중요도 순으로 패딩 크기. 최소 2가지 이상 패딩 사이즈 사용.

**시각적 밀도 교대 규칙:**
```
조밀한 섹션 (카드 그리드, 가격표) 다음에는 반드시 여유 있는 섹션 (CTA, 추천사)
텍스트 중심 섹션 다음에는 시각적 섹션 (이미지, 스크린샷)
```
규칙: "밀도 높음 → 밀도 낮음" 교대. 같은 밀도 2번 연속 금지.

커버하는 한계: 6(스크롤 리듬)

### 전략 4: 디테일 필수 포함 목록 + 이미지 가이드

LLM이 명시적으로 지시받지 않으면 빠뜨리는 디테일들을 강제 포함시킨다.

**필수 디테일 체크리스트 (스킬에 포함):**
```
모든 프로젝트에 반드시 포함:
□ 네비게이션에 backdrop-blur + 반투명 배경 (bg-white/80 backdrop-blur-md)
□ 모든 버튼에 hover 상태 (hover:bg-gray-100 또는 hover:opacity-90)
□ 모든 카드에 hover 상태 (hover:shadow-md 또는 hover:-translate-y-1)
□ 모든 인터랙티브 요소에 transition (transition-all duration-200)
□ 모든 인터랙티브 요소에 focus-visible:ring-2
□ 카드 분리는 border-gray-100 또는 shadow-sm (둘 중 하나만, 섞지 말 것)
□ 섹션 제목 위에 뱃지/칩 (text-sm text-primary bg-primary/10 rounded-full px-3 py-1)
□ 히어로 배경에 미세한 패턴 (도트/그리드, opacity 3~5%)
□ CTA 섹션에 배경색 반전 (dark bg + light text)
□ 푸터에 border-t border-gray-200
```

**이미지 영역 가이드:**
LLM이 이미지를 넣을 때 "스톡 사진 느낌"을 방지하는 규칙.
```
히어로 이미지:
  ✅ 제품 스크린샷을 브라우저 목업(rounded-xl shadow-2xl border) 안에 넣기
  ✅ 대시보드 UI를 보여줄 경우 실제 데이터 느낌의 placeholder
  ❌ 웃고 있는 사람 스톡 사진
  ❌ 추상적 3D 그래픽
  → 이미지가 없으면 차라리 큰 타이포로만 구성 (텍스트 히어로)

특징 섹션 이미지:
  ✅ 해당 기능의 실제 UI 스크린샷 (라운드 + 그림자 처리)
  ✅ 간단한 SVG 일러스트 (lucide 아이콘 확대 활용)
  ❌ 관련 없는 장식 이미지

목업 처리:
  브라우저 목업: rounded-xl overflow-hidden border border-gray-200 shadow-xl
  폰 목업: rounded-[2rem] overflow-hidden border-[8px] border-gray-900
  이미지 위에 텍스트 올릴 때: bg-gradient-to-t from-black/60 to-transparent
```

커버하는 한계: 8(디테일 축적), 9(스톡 느낌)

### 전략 5: 코드 구조 분석 기반 자가 검증 + 선택적 스크린샷 피드백

LLM은 렌더링 결과를 볼 수 없지만, 자기가 쓴 코드를 다시 읽고 패턴을 분석할 수 있다.
이것이 핵심이다. "보는" 게 아니라 "코드를 grep하는" 것이다. 정확도 99%.

**방법 A: 구조적 코드 분석 (스킬 핵심에 포함, 비용 0) ⭐**

코드 생성 완료 후, 아래 6가지 구조 분석을 수행하고 위반 시 자동 수정한다:

```
검증 1: 배경색 다양성
  → 생성한 코드에서 모든 <section>의 배경 관련 클래스를 추출
  → 전부 같은 색(또는 배경 클래스 없음)이면:
    짝수 번째 섹션에 bg-gray-50 (라이트) 또는 bg-white/5 (다크) 추가
    마지막에서 2번째 섹션(CTA)에 bg-gray-900 + text-white 적용

검증 2: 패딩 다양성
  → 모든 섹션의 py-* 클래스를 추출
  → 전부 같은 값이면:
    히어로: 현재값의 1.5배로 증가 (py-16 → py-24)
    소셜 프루프/로고 바: 현재값의 0.6배로 감소 (py-16 → py-10)

검증 3: 카드 크기 다양성
  → 카드 컴포넌트가 3개 이상이고 모두 같은 grid 크기이면:
    첫 번째 카드를 col-span-2로 변경 (벤토 스타일)
    또는 첫 번째 카드만 padding/font-size를 1단계 키움

검증 4: 타이포 스케일 일관성
  → 사용된 모든 text-* 클래스를 수집
  → 고유 font-size가 7종 이상이면: 비슷한 크기를 통합 (text-lg와 text-xl이 둘 다 있으면 하나로)
  → h1/body 비율이 2.5 미만이면: h1을 한 단계 키움

검증 5: 통일성
  → 사용된 모든 rounded-* 클래스를 수집
  → 3종 이상이면: 가장 빈번한 1~2종으로 통일
  → shadow-* 클래스가 3종 이상이면: 가장 빈번한 1종으로 통일

검증 6: 디테일 필수 포함
  → hover: 클래스가 있는 인터랙티브 요소 비율 확인. 50% 미만이면 추가
  → transition 클래스가 있는 인터랙티브 요소 비율 확인. 50% 미만이면 추가
  → focus-visible: 클래스가 있는 인터랙티브 요소 비율 확인. 없으면 추가
```

이 6가지는 LLM이 코드를 "보는" 게 아니라 텍스트로 분석하는 것이라 정확도가 높다.
추가 도구 호출이나 컨텍스트 확장 없이, 기존 컨텍스트 안에서 처리된다.

**방법 B: 스크린샷 피드백 (선택적 부가 기능, references/review-script.md에 포함)**

코드를 Playwright로 렌더링하고 Claude Vision으로 비평하는 루프.
방법 A보다 강력하지만, 추가 실행 시간이 필요하다.
스킬의 핵심이 아닌 "더 좋은 결과를 원하면 실행하세요"로 분리.

참고: Claude Vision의 디자인 비평 정확도는 약 70~80%.
명백한 문제(글자 너무 작음, 대비 부족)는 잡지만, 미묘한 문제(여백이 "시원한" 건지 "허전한" 건지)는 놓칠 수 있다.

```bash
# references/review-script.md에 포함될 스크립트
# 1. 생성된 HTML을 Playwright로 렌더링
npx playwright screenshot output.html screenshot.png --viewport-size=1440,900

# 2. Claude Vision으로 비평
claude -p "당신은 시니어 웹 디자이너다. 이 스크린샷을 보고 비평하라.
평가: 시각적 계층, 여백 호흡, 색상 균형, 통일성, 디테일, AI 느낌 여부.
0~10 점수 + 구체적 수정 사항을 JSON으로 응답." --image screenshot.png

# 3. 비평 결과를 바탕으로 수정
claude -p "아래 비평에 따라 HTML 코드를 수정하라: [비평 결과]"
```

기대 효과: 방법 A만 적용 시 6~7점, 방법 B까지 적용 시 7~8점.

### 전략 6: 금지 목록 + 자가 검증 체크리스트

LLM에게 "좋은 디자인을 하라"보다 "이것만은 하지 마라"가 훨씬 효과적이다.
금지 + 수치 검증의 조합으로 기계적으로 품질 하한선을 보장한다.

**금지 목록 (스킬에 포함):**
```
절대 금지:
- ❌ 보라~파랑 그라데이션을 배경에 쓰지 마라 (가장 흔한 AI 기본값)
- ❌ 모든 카드를 같은 크기로 만들지 마라 (1개는 반드시 다르게)
- ❌ 모든 섹션에 같은 padding을 주지 마라 (최소 2가지 사이즈 사용)
- ❌ h1을 30px 이하로 만들지 마라 (최소 40px, 권장 48~64px)
- ❌ Inter, Roboto, Arial을 기본 폰트로 쓰지 마라 (폰트 페어 라이브러리에서 선택)
- ❌ 한 페이지에 3가지 이상 색상을 주요 색으로 쓰지 마라 (주색1 + 뉴트럴만)
- ❌ border-radius를 요소마다 다르게 쓰지 마라 (사이트 전체에서 1~2가지만)
- ❌ 아이콘 세트를 섞지 마라 (Lucide면 전부 Lucide)
- ❌ CTA 버튼을 주변과 같은 색으로 만들지 마라 (반드시 눈에 띄게)
- ❌ 여백 없이 요소를 빽빽하게 넣지 마라 (컴포넌트 간 최소 gap-4)
- ❌ 임의 CSS 값(p-[13px], text-[17px])을 쓰지 마라 (Tailwind 스케일만)
- ❌ 폰트 페어 라이브러리 외의 폰트 조합을 쓰지 마라
- ❌ 색상 팔레트 라이브러리 외의 색상 조합을 쓰지 마라
```

**수치 기반 자가 검증 (스킬에 포함):**
```
코드를 생성한 후 아래를 확인하라. 위반 시 자동 수정:
□ h1 font-size / body font-size ≥ 2.5
□ 사용된 고유 font-size ≤ 6종
□ 사용된 고유 color ≤ 5종 (뉴트럴 제외)
□ 사용된 border-radius 종류 ≤ 2
□ 히어로 영역 min-height ≥ 60vh
□ 섹션 padding 종류 ≥ 2가지
□ 섹션 배경색 종류 ≥ 2가지
□ CTA 버튼 색상 ≠ 배경색
□ 필수 디테일 체크리스트 10개 전부 포함
□ 금지 목록 위반 0건
```

이 목록은 PHASE 3(시각 분석)에서 하위 그룹(5점 이하)의 공통 특성으로 검증/보강된다.
실측 데이터가 쌓이면 기준값을 상위 그룹(7점+)의 통계로 교체한다.

커버하는 한계: 전체 (하한선 보장)

### 6가지 전략의 커버리지 매핑

```
LLM 한계                    전략 1  전략 2  전략 3  전략 4  전략 5  전략 6
                            비율    조합    시퀀스  디테일  코드분석 금지/검증
─────────────────────────   ─────  ─────  ─────  ─────  ─────  ─────
1. 렌더링 못 봄                                          ★★     
2. 전체 조화 판단 불가               ★★★                  ★★
3. 여백 충분함 모름         ★★★                          ★★
4. 색상 느낌 모름                    ★★★                         ★
5. 시각적 무게 균형                  ★★★                         
6. 스크롤 리듬 모름         ★★             ★★★           ★★
7. 폰트 조합 판단 불가              ★★★                         ★
8. 디테일 축적 모름                                ★★★   ★★    ★
9. 스톡 느낌 모름                                  ★★★
10. 애니메이션 느낌 모름             ★★★

★★★ = 직접 해결  ★★ = 부분 해결  ★ = 간접 도움

전략 5(코드 구조 분석)가 비용 0으로 가장 많은 한계를 부분 커버.
전략 2(검증된 조합)가 가장 효율적 — 선택지를 줄여서 실패 가능성 자체를 제거.
전략 6(금지/검증)은 하한선을 보장하는 안전망.
선택적 스크린샷 피드백(방법 B)을 추가하면 ★★ → ★★★로 승격.
```

---

## PHASE 1: 분석 대상 사이트 수집

### 수집 방법

#### 방법 A: 시드 리스트 (확실히 좋은 사이트)
아래 사이트들은 직접 선별한 상위 사이트. 반드시 포함.

**SaaS / B2B (80개)**
```
linear.app, vercel.com, stripe.com, notion.so, figma.com, 
slack.com, github.com, railway.app, planetscale.com, supabase.com,
resend.com, cal.com, dub.co, clerk.com, convex.dev,
turso.tech, neon.tech, upstash.com, axiom.co, posthog.com,
plausible.io, mintlify.com, tailwindcss.com, ui.shadcn.com,
framer.com, webflow.com, retool.com, airtable.com,
pitch.com, rows.com, coda.io, zapier.com, n8n.io,
inngest.com, trigger.dev, fly.io, render.com, sentry.io,
auth0.com, stytch.com, workos.com, knock.app, loops.so,
intercom.com, algolia.com, sanity.io, contentful.com,
ghost.org, beehiiv.com, lemonsqueezy.com, paddle.com,
attio.com, clay.com, instantly.ai, height.app, amie.so,
huly.io, plane.so, monday.com, clickup.com, asana.com,
loom.com, miro.com, craft.do, superhuman.com, raycast.com,
arc.net, warp.dev, zed.dev, cursor.com, tauri.app
```

**개발자 도구 / 프레임워크 (30개)**
```
nextjs.org, react.dev, vuejs.org, svelte.dev, astro.build,
remix.run, nuxt.com, solidjs.com, angular.dev, vitejs.dev,
turbo.build, biomejs.dev, prisma.io, drizzle.team, trpc.io,
hono.dev, elysiajs.com, bun.sh, deno.com, effect.website,
tailwindui.com, headlessui.com, radix-ui.com, mantine.dev,
chakra-ui.com, ant.design, mui.com, storybook.js.org,
chromatic.com, playwright.dev
```

**AI / ML (25개)**
```
openai.com, anthropic.com, huggingface.co, replicate.com,
together.ai, modal.com, fireworks.ai, groq.com,
perplexity.ai, midjourney.com, stability.ai, runway.ml,
pika.art, elevenlabs.io, descript.com, otter.ai,
dust.tt, langchain.com, llamaindex.ai, pinecone.io,
weaviate.io, qdrant.tech, cohere.com, mistral.ai,
deepmind.google
```

**핀테크 / 커머스 (20개)**
```
mercury.com, brex.com, ramp.com, deel.com, rippling.com,
gusto.com, wise.com, revolut.com, robinhood.com, coinbase.com,
shopify.com, lemonsqueezy.com, gumroad.com, paddle.com,
plaid.com, moov.io, square.com, affirm.com, klarna.com,
transferwise.com
```

**한국 테크 (15개)**
```
toss.im, kakaocorp.com, about.daangn.com, baemin.com,
channel.io, sendbird.com, ab180.co, bucketplace.com,
ridi.com, class101.net, musinsa.com, wadiz.kr,
wanted.co.kr, rallit.com, disquiet.io
```

**글로벌 빅테크 (10개)**
```
apple.com, google.com, microsoft.com, amazon.com,
netflix.com, spotify.com, airbnb.com, uber.com,
dropbox.com, twitch.tv
```

**디자인 / 크리에이티브 (10개)**
```
canva.com, spline.design, rive.app, lottiefiles.com,
readymag.com, tldraw.com, excalidraw.com, diagram.com,
magicpatterns.com, coolors.co
```

#### 방법 B: 디자인 갤러리 크롤링 (라운드별 추가 사이트 공급원) ⭐

라운드가 반복될수록 새 사이트가 필요하다. 시드 리스트 190개는 3라운드면 소진된다.
아래 갤러리에서 피드백 방향에 맞는 사이트를 무한히 공급할 수 있다.

**Tier 1 — 최고 품질 큐레이션 (여기서 먼저 뽑는다)**
```
godly.website           — 최고 수준 인터랙션/애니메이션 사이트. 태그별 필터 가능.
awwwards.com            — Site of the Day / Honorable Mention. 점수 기반 필터.
siteinspire.com         — 스타일/타입/주제별 필터. 프로페셔널 사이트 중심.
a1.gallery              — 엄격한 기준의 핸드픽 갤러리. 매일 업데이트.
curated.design          — 기업/에이전시/SaaS 중심. 프리미엄 느낌 사이트만.
siteofsites.co          — 태그 기반(Minimal, Dark, Big Type, Colorful 등). 톤별 필터 유용.
```

**Tier 2 — SaaS/랜딩 페이지 전문 (SaaS 프로젝트에 최적)**
```
saaslandingpage.com     — SaaS 랜딩만 모아놓은 큐레이션.
landingfolio.com        — SaaS 랜딩 + 섹션별(히어로, 가격, CTA) 필터. 341+ 사이트.
saaspo.com              — SaaS 웹디자인 전문. 카테고리 필터.
saasframe.io            — 283+ SaaS 랜딩. Figma 파일 제공. 데스크탑/모바일 전환.
pages.report            — SaaS 랜딩 분석 리포트. 368+ 사이트.
land-book.com           — 랜딩 페이지 큐레이션. Pro 기능 있음.
lapa.ninja              — 랜딩 페이지 전문. 풀스크린샷 제공.
```

**Tier 3 — 일반 웹디자인 + 트렌드**
```
minimal.gallery         — 미니멀 디자인만. 미니멀 톤 강화 시 유용.
webdesign-inspiration.com — 매일 업데이트. 다양한 카테고리.
framer.com/gallery      — Framer로 만든 사이트. 다크/그리드 등 태그 필터.
httpster.net            — 인디/크리에이티브 사이트 큐레이션.
bestwebsite.gallery     — 넓은 범위의 웹디자인 갤러리.
```

**갤러리별 크롤링 방법:**
각 갤러리의 리스트 페이지를 Playwright로 순회하며 사이트 URL을 추출.
- godly.website: 무한 스크롤 → scroll + 링크 추출
- awwwards.com: 페이지네이션 → /websites/sites_of_the_day/page/1~20
- siteinspire.com: 필터 + 페이지네이션
- landingfolio.com: /inspiration/landing-page/saas → 페이지네이션
- saasframe.io: /categories/landing-page → 스크롤

**라운드별 활용 방식:**
- 라운드 1: 시드 리스트 190개에서 범용 50개
- 라운드 2+: 시드 리스트에서 피드백 방향의 잔여 사이트 + 갤러리에서 해당 톤의 사이트 추가 수집
  예: "미니멀 톤 강화" → minimal.gallery에서 30개 + 시드 리스트 잔여 미니멀 20개
  예: "다크 톤 강화" → siteofsites.co의 Dark 태그에서 30개 + godly.website에서 20개
- 시드 리스트 소진 후에도 갤러리에서 계속 공급 가능 (실질적으로 무한)

#### 방법 C: 대조군 (상위/하위 비교를 위해 필수)
시드 리스트의 대부분은 디자인 퀄리티가 높은 사이트다.
"상위 vs 하위" 비교를 의미 있게 만들려면 의도적으로 평범한 사이트도 필요하다.
아래 20~30개를 대조군으로 추가한다:
- AI 빌더 기본 템플릿 사이트 ~10개 (Wix/Squarespace 무료 템플릿으로 만든 사이트, Product Hunt에서 검색)
- 초기 스타트업 사이트 ~10개 (Product Hunt 최신 런치 중 디자인 투자가 적은 사이트)
- 오래된 디자인 사이트 ~10개 (2020~2022년에 마지막 업데이트, 디자인이 구식인 사이트)
대조군은 urls.json에 `"control_group": true` 태그로 구분한다.

#### 주의사항
- 로그인 필수 사이트(amazon.com 로그인 상태 등)는 제거. 랜딩/마케팅 페이지가 있는 사이트만.
- 같은 도메인의 서브페이지는 수집하지 않음 (메인 페이지만)

#### 결과물
`data/urls.json` — 최소 200개, 목표 300개 URL

---

## PHASE 2: CSS 수치 + 비율 추출

각 사이트를 Playwright (headless Chromium)로 방문하여 getComputedStyle()로 실제 CSS 값을 추출.
추가로 PHASE 0.5에서 정의한 비율도 계산한다.

### 기술 스택
- Node.js 20+
- playwright (npm)
- 뷰포트: 1440x900 (데스크탑)

### 추출 항목 (사이트당 60+ 데이터 포인트)

#### 타이포그래피 (15개)
```
h1: font-family, font-size(px), font-weight, line-height(px), letter-spacing, color
h2: font-size(px), font-weight
body: font-family, font-size(px), line-height(px), color
nav 링크: font-size, font-weight
페이지 전체: 고유 font-family 목록, 고유 font-size 목록, 고유 font-weight 목록
  폰트 기본값 태깅: font-family가 system-ui, Arial, Helvetica, sans-serif만이면 'default'로 태깅
```

#### 색상 (12개)
```
body background-color (HEX)
body text color (HEX)
CTA 버튼: background-color, color (HEX)
링크 color (HEX)
모든 텍스트 색상 (상위 30개 HEX)
모든 배경 색상 (상위 30개 HEX)
모든 보더 색상 (상위 15개 HEX)
고유 색상 수
다크 테마 여부 (body 배경 luminance < 0.4)
다크 섹션 존재 여부
```

#### 간격 (11개)
```
컨테이너 max-width
네비게이션 height
히어로 padding-top, padding-bottom
모든 섹션의 padding-top (배열)
카드: padding, border-radius, box-shadow 유무, border 유무
버튼: padding-left, padding-top, border-radius
```

#### 레이아웃 (13개)
```
히어로 타입: center / split / fullscreen / minimal (h1 위치 + 이미지 유무로 판별)
  히어로 식별 방법: document.querySelector('h1')의 getBoundingClientRect().top < viewportHeight * 0.5이면 히어로로 판정
히어로 요소: 뱃지 유무, 이미지 유무, 비디오 유무, CTA 버튼 수
네비게이션: position (sticky/fixed/static), CTA 유무
총 섹션 수
소셜 프루프 로고 바 유무
가격 섹션 유무
추천사 유무
FAQ 유무
푸터 컬럼 수
```

#### 시각 효과 (6개)
```
애니메이션 유무 (class에 animate/motion/transition/fade 포함)
그라데이션 텍스트 유무 (background-clip: text)
backdrop-blur 유무
일러스트/SVG 유무
프로덕트 스크린샷 유무
실제 사진 유무
```

#### ★ 비율 계산 (자동, 10개) — PHASE 0.5 전략 1 적용
```
h1_body_ratio: h1 font-size / body font-size
h1_margin_ratio: h1 margin-bottom / h1 font-size
h2_h1_ratio: h2 font-size / h1 font-size
hero_viewport_ratio: 히어로 total height / 뷰포트 height (900)
section_padding_variance: 섹션 padding 표준편차 / 중앙값 (리듬 변주 정도)
container_viewport_ratio: max-width / 뷰포트 width (1440)
card_padding_ratio: 카드 padding / 카드 width
button_height_body_ratio: 버튼 height / body font-size
neutral_color_ratio: 뉴트럴(gray/black/white) 색상 수 / 전체 고유 색상 수
unique_fontsize_count: 고유 font-size 수
```

### 실행 설정
- 동시 접속: 3개 (서버 부하 방지)
- 사이트당 타임아웃: 20초
- 렌더링 대기: `page.waitForLoadState('networkidle')` + 최대 10초 타임아웃 (3초 고정 대기보다 정확)
- 쿠키/GDPR 배너 자동 닫기: 페이지 로드 후 아래 셀렉터로 클릭 시도 (실패해도 무시)
  `[class*="cookie"] button[class*="accept"], [id*="consent"] button, button:has-text("Accept All")`
- h1이 없거나 뷰포트 밖에 있을 때: 페이지 내 가장 큰 font-size 텍스트 요소를 히어로 텍스트로 폴백
- 10개마다 중간 저장 (중단 복구 가능)
- 실패한 사이트는 건너뛰고 계속

### 결과물
`data/css-analysis.json` — 각 사이트의 60+ 데이터 포인트 (비율 포함)

---

## PHASE 3: 스크린샷 + Claude Vision 시각 분석

CSS 수치로 잡을 수 없는 **시각적 감각** 영역을 분석한다.
`claude -p`를 사용하므로 구독에서 처리. 추가 비용 없음.

### 이 단계가 필요한 이유

CSS 추출은 "무엇이 있는지"를 알려준다. (font-size: 48px, padding: 64px)
시각 분석은 "어떤 느낌인지"를 알려준다. (프리미엄, 친근, 기술적)

CSS만으로는 알 수 없는 것들:
- 이미지가 브라우저 목업 안에 있는지, 그냥 띄워져 있는지
- 배경에 미세한 그리드 패턴이 있는지
- 전체적으로 "숨 쉴 공간"이 충분한지 빽빽한지
- 색상이 "의도적으로 절제된" 것인지 "그냥 적은" 것인지
- 타이포그래피가 "기하학적으로 깔끔한지" "인간적으로 따뜻한지"

Claude Vision은 이런 "느낌" 영역을 분류형 레이블로 변환한다.
레이블은 느낌 자체가 아니라 "느낌을 만드는 속성 조합의 이름"이다.

### 프로세스
```
1. Playwright로 사이트 접속
2. 뷰포트 1440x900에서 above-the-fold 스크린샷 촬영 (PNG)
3. 풀 페이지 스크린샷 촬영 (최대 5000px 높이)
4. above-the-fold 스크린샷을 claude -p에 전달
5. Claude가 35개 시각 항목을 JSON으로 분류
6. 결과 저장
```

### claude -p 호출 방법

```bash
claude -p "당신은 웹 디자인 전문 분석가다. 이 웹사이트 스크린샷을 분석하여 아래 JSON 형식으로만 응답하라. [프롬프트 전문]" --image /path/to/screenshot.png
```

또는 파이프:
```bash
cat /path/to/screenshot.png | claude -p "[프롬프트]"
```

환경에 따라 작동하는 방식을 먼저 테스트하고 사용할 것.

### Claude에게 보내는 분석 프롬프트

```
당신은 웹 디자인 전문 분석가다. 이 웹사이트 스크린샷을 분석하여 정확히 아래 JSON 형식으로만 응답하라.
설명이나 마크다운 없이 순수 JSON만 출력.

{
  "design_style": "minimal | professional | playful | dark-premium | developer | editorial | brutalist | luxury",
  "color_mood": "warm | cool | neutral | vibrant | muted | earthy | pastel | neon",
  "color_harmony": "monochromatic | complementary | analogous | triadic | neutral-plus-accent",
  "dominant_colors": ["#hex1", "#hex2", "#hex3"],
  "accent_color": "#hex",
  "background_approach": "pure-white | off-white | light-gray | dark | gradient | image-bg | pattern",
  "image_style": "product-screenshot | 3d-illustration | flat-illustration | real-photo | abstract-graphic | icon-only | mixed | none",
  "image_placement": {
    "hero": "right-side | below-text | background-full | left-side | center-below | none",
    "body": "alternating-left-right | grid | scattered | inline | none"
  },
  "image_treatment": "border-rounded | shadow-lifted | no-treatment | browser-mockup | phone-mockup | floating",
  "visual_density": "very-sparse | sparse | balanced | dense | very-dense",
  "whitespace_usage": "generous | moderate | tight",
  "whitespace_intentionality": "deliberate-emphasis | uniform-comfortable | functional-minimum",
  "layout_balance": "perfectly-symmetric | mostly-symmetric | asymmetric-intentional | center-dominant",
  "visual_hierarchy_clarity": "very-clear | clear | moderate | flat",
  "hierarchy_method": "size-dominant | color-dominant | weight-dominant | spacing-dominant | combined",
  "section_visual_rhythm": "uniform-spacing | alternating-bg | gradual-build | dramatic-contrast",
  "section_variety": "high | moderate | low",
  "typography_feeling": "geometric-clean | humanist-warm | monospace-technical | serif-editorial | mixed-expressive",
  "heading_style": "simple-bold | gradient-text | outlined | light-weight-large | all-caps | mixed",
  "font_weight_contrast": "extreme | moderate | minimal",
  "cta_style": "solid-filled | outline | ghost | pill-shaped | with-icon | text-link",
  "cta_prominence": "dominant | balanced | subtle",
  "border_style": "subtle-light | prominent | none | accent-colored",
  "shadow_usage": "none | subtle-cards | medium-elevation | dramatic-depth",
  "animation_feeling": "none | subtle-fade | smooth-scroll-reveal | playful-bounce | dramatic-parallax",
  "overall_impression": "premium | friendly | technical | corporate | creative | startup | enterprise | indie",
  "brand_distinctiveness": "highly-unique | somewhat-distinctive | generic-template",
  "detail_craftsmanship": "meticulous | solid | basic | rough",
  "trend_tags": ["해당하는 것만 선택"],
  "visual_quality_score": 1~10,
  "unique_design_elements": "이 사이트만의 특이한 시각적 요소 1줄",
  "design_era": "2024-modern | 2025-minimal | 2026-trending | classic-corporate | retro-inspired",
  "what_makes_it_feel_professional": "이 사이트가 전문적으로 느껴지는 핵심 이유 1줄 (또는 전문적이지 않다면 그 이유)"
}

trend_tags 선택지:
glassmorphism, bento-grid, gradient-mesh, grain-texture, dot-pattern,
grid-background, aurora-glow, neon-accent, scroll-animation,
centered-hero, split-hero, dark-mode, light-clean, video-hero,
code-block-hero, floating-elements, backdrop-blur-nav, oversized-typography,
monospace-accent, badge-above-hero, two-cta-hero, logo-bar-social-proof,
feature-cards-grid, alternating-sections, testimonial-cards, accordion-faq,
pricing-three-col, dark-cta-section, minimal-footer, mega-footer,
hover-cards, interactive-demo, product-showcase, browser-mockup,
developer-focused, design-system-vibe, startup-energy, enterprise-trust,
text-gradient, animated-gradient, sticky-nav, pill-buttons, card-borders

평가 기준 (visual_quality_score):
1~3점: AI 기본값 수준. 보라그라데이션, Inter, 균등 색상, 예측 가능 레이아웃, 개성 없음.
4~5점: 기능은 하지만 평범. 일부 의도적 선택이 있으나 디테일 부족.
6~7점: 전문가 수준. 의도적 색상, 타이포 계층, 여백 리듬, 디테일 존재.
8~10점: 최상위. 브랜드 개성이 선명, 디테일이 치밀, 트렌드 반영, 독창적 요소.

핵심: "이 사이트를 LLM이 기본값으로 만들 수 있었는가?"를 판단 기준으로 삼아라.
기본값으로 만들 수 있는 수준이면 점수 낮게, 의도적 선택이 많을수록 높게.
```

### 실행 설정
- 순차 실행 (동시 호출 금지 — claude -p 부하 방지)
- 사이트 간 2초 대기
- 5개마다 중간 저장
- claude -p 호출 실패 시 30초 대기 후 재시도, 3회 실패 시 건너뛰기
- rate limit 감지 시 (429 또는 관련 에러) 60초 대기 후 재시도
- 전체 실패율이 30%를 넘으면 실행 중단 후 사용자에게 알림

### 결과물
- `data/screenshots/` — 스크린샷 이미지 파일
- `data/visual-analysis.json` — 시각 분석 결과

---

## PHASE 4: 통계 처리

css-analysis.json (CSS + 비율) + visual-analysis.json (시각)을 통합 처리.

### 기본 통계

모든 수치형 데이터:
- 중앙값 (median) — "평범한" 값
- 25%, 75% 백분위수 — "안전한 범위"
- 최빈값 (mode) — "가장 많이 쓰이는" 값
- 분포 상위 20개

모든 범주형 데이터:
- 빈도 분포 (값별 개수 + 비율%)
- 상위 3개

Boolean 데이터:
- 사용률 (%)

### 품질 기반 필터링 (핵심)

visual_quality_score를 기준으로 두 그룹을 분리:
- **상위 그룹** (7점 이상): "이렇게 해라"의 근거
- **하위 그룹** (5점 이하): "이렇게 하지 마라"의 근거
- **두 그룹의 차이 계산** — 각 수치/범주에서 차이가 큰 항목을 자동 추출

예상되는 핵심 차이 (데이터로 검증):
- 상위: h1_body_ratio 3.0+, 하위: h1_body_ratio 1.5~2.0
- 상위: section_padding_variance 0.2+, 하위: section_padding_variance 0.05
- 상위: neutral_color_ratio 0.7+, 하위: neutral_color_ratio 0.4
- 상위: brand_distinctiveness "highly-unique" 70%+, 하위: "generic-template" 60%+
- 상위: detail_craftsmanship "meticulous" 50%+, 하위: "basic" 60%+

### 디자인 톤별 프로필 추출

visual-analysis의 design_style과 overall_impression을 기준으로 5개 클러스터:
- Tone A: 클린 미니멀 (design_style=minimal)
- Tone B: 프로페셔널 (design_style=professional)
- Tone C: 다크 프리미엄 (design_style=dark-premium)
- Tone D: 친근한 (overall_impression=friendly)
- Tone E: 개발자 (design_style=developer)

각 클러스터에서 모든 수치의 중앙값과 범주의 최빈값을 추출.
이것이 PHASE 0.5 전략 2의 "레시피"가 된다.

### 비율 통계 (PHASE 0.5 전략 1 적용)

비율 데이터를 전체/상위/하위/톤별로 분리하여 통계:
- h1_body_ratio: 전체 중앙값, 상위 중앙값, 하위 중앙값, 톤별 중앙값
- section_padding_variance: 동일
- neutral_color_ratio: 동일
- ...

### px → Tailwind 매핑

모든 수치를 Tailwind 클래스로 자동 변환:
- font-size → text-xs ~ text-9xl
- padding → p-1 ~ p-64
- max-width → max-w-sm ~ max-w-7xl
- border-radius → rounded-sm ~ rounded-full
- height → h-10 ~ h-20

### 결과물
`data/statistics.json` — 전체 통계 + 상위/하위 그룹 비교 + 톤별 프로필 + 비율 통계

---

## PHASE 5: 스킬 자동 생성

통계 데이터에서 Claude Code 스킬을 자동 생성.

### 스킬 구조

```
output/web-design-system/
├── SKILL.md                    ← 코어 지시서
└── references/
    ├── sections.md             ← 섹션별 패턴 + Tailwind 코드 (shadcn/ui 기반)
    ├── components.md           ← 컴포넌트 패턴 + 실측 수치
    ├── page-recipes.md         ← 페이지 조합 레시피
    ├── visual-guide.md         ← 시각 분석 기반 디자인 가이드
    └── review-script.md        ← 선택적 스크린샷 피드백 스크립트 (전략 5 방법 B)
```

### SKILL.md 구성

SKILL.md는 Claude Code가 프론트엔드를 생성할 때 읽는 핵심 문서다.
300줄 이내를 목표로 한다. 코드 예시는 references/에 분리.
순서: 금지(가장 먼저) → 생성 규칙 → 검증(마지막).

**섹션 1: 안티패턴 (절대 금지) — 맨 앞**
```
PHASE 0의 금지 목록 13개 + 하위 그룹(5점-)에서 검증된 추가 안티패턴
각 안티패턴에 대안 포함 ("X 대신 Y를 사용")
이 섹션이 맨 앞이어야 LLM이 가장 강하게 인식한다.
```

**섹션 2: 사전 질문 + 페이지 유형 판별 + 톤 판별**

**섹션 3: 생성 시 규칙 (사전 적용 6가지)**
```
배경 교대, 패딩 변주, 카드 크기 다양성, 타이포 스케일, 통일성, 디테일 필수.
"생성 후 검증"이 아니라 "처음부터 이 규칙대로 생성하라."
```

**섹션 4: 디자인 톤 레시피 (데이터 기반)**
```
각 톤에 대해:
- 색상 팔레트 (주색 HEX 범위, 뉴트럴 비율, 배경 접근)
- 타이포그래피 (추천 폰트 3개, h1 크기 범위, h1/body 비율, weight 조합)
- 간격 (히어로 padding 범위, 섹션 padding 범위, 카드 padding)
- 레이아웃 (히어로 타입, 섹션 배경 패턴, 카드 배치)
- 디테일 (border 스타일, shadow 수준, 트렌드 요소 목록)
- 이미지 (스타일, 처리 방법, 배치 패턴)
```

**섹션 5: 절대 수치 (실측 데이터)**
```
상위 사이트(7점+) 기준:
- H1: 중앙값 Xpx (범위 Y~Zpx) → Tailwind text-?
- Body: 중앙값 Xpx → Tailwind text-?
- 컨테이너: 중앙값 Xpx → Tailwind max-w-?
- 히어로 padding: 중앙값 Xpx → Tailwind py-?
- 섹션 padding: 중앙값 Xpx, 변주 Ypx → Tailwind py-? 또는 py-?
- 카드 radius: 중앙값 Xpx → Tailwind rounded-?
- ...
```

**섹션 6: 비율 기준 (느낌의 수치화)**
```
상위 사이트(7점+) 기준 (실측값으로 채움):
- h1/body 크기비: X (최소 Y 이상)
- 히어로/뷰포트 높이비: X
- 섹션 패딩 변주율: X (0이면 단조로움, 0.2+ 이면 리듬 있음)
- 뉴트럴 색상 비율: X%
- 고유 font-size 수: X개 이내
- 고유 색상 수: X개 이내
```

**섹션 7: 최종 확인 체크리스트 (최소한의 사후 검증)**
```
코드를 생성한 후 아래를 확인하라:
□ 금지 목록 13개 위반 0건
□ h1 font-size / body font-size ≥ [실측 기준]
□ 사용된 border-radius 종류 ≤ 2
□ 필수 디테일 10개 전부 포함
위반 사항이 있으면 수정하라.
```

### references/visual-guide.md 필수 포함 내용

시각 분석에서만 나오는 데이터. 코드로 직접 변환하기 어려운 "느낌" 영역의 가이드:

- 디자인 스타일 분포 + 각 스타일의 대표 사이트 예시
- 색감 무드 분포 + 각 무드의 HEX 팔레트 예시
- 이미지 스타일 분포 + 배치 패턴 + 처리 방법 (목업/라운드/그림자)
- 여백/밀도/균형/계층 분포
- 제목 스타일 분포 + font-weight 대비 분포
- CTA 스타일과 눈에 띄는 정도(prominence) 분포
- 애니메이션 느낌 분포
- brand_distinctiveness, detail_craftsmanship 분포
- what_makes_it_feel_professional 필드에서 추출한 공통 키워드 TOP 20
- **상위 사이트(7점+)에서만 나타나는 패턴 vs 하위 사이트(5점-)의 패턴 비교표**

### references/sections.md 필수 포함 내용

shadcn/ui 블록(blocks)의 구조를 기반으로 하되, 실측 수치를 디자인 토큰 변수로 적용.
"shadcn의 구조적 안정성 + 상위 200개 사이트의 시각적 특성"이 핵심 밸류.

각 섹션 패턴에 대해:
- 실측 사용 비율 (히어로 center 42%, split 30%...)
- shadcn/ui 블록 기반 React + Tailwind 코드 (구조는 shadcn, 수치는 실측)
- 코드 내 색상/간격/타이포는 CSS 변수 참조 (톤 변경 시 변수만 교체)
- 섹션 종류: Nav, Hero, Social Proof, Features, How It Works, Testimonials, Pricing, FAQ, CTA, Footer
- 각 섹션에 반응형 축소 규칙 포함 (sm: breakpoint)

### references/components.md 필수 포함 내용

개별 컴포넌트의 실측 수치:
- 버튼: 높이, 패딩, radius, 색상 조합 (primary/secondary/ghost)
- 카드: 패딩, radius, border/shadow 조합, hover 효과
- 뱃지/칩: 크기, 색상, radius
- 입력 필드: 높이, 패딩, border, focus 스타일
- 각 컴포넌트에 Tailwind 코드 예시

### references/page-recipes.md 필수 포함 내용

페이지 유형별 섹션 조합 레시피:
- SaaS 랜딩: Nav → Hero → Social Proof → Features (x2~3) → How It Works → Testimonials → Pricing → CTA → Footer
- 대시보드: Sidebar + Topbar + Main Content Grid
- 포트폴리오: ...
- 각 레시피에 실측 사용 비율과 톤별 변형

### 스킬의 동작 방식

SKILL.md의 지시 순서 (금지 → 생성 → 검증):

**0단계: 금지 목록 확인 (가장 먼저, 가장 강하게)**
스킬의 맨 앞에 금지 목록을 배치한다. LLM은 프롬프트 앞부분에 더 주의를 기울인다.
금지 목록은 전략 6에 정의된 13개 항목.

**1단계: 사전 질문**
- "브랜드 색상이 있나요?" → 있으면 악센트로 사용, 없으면 톤별 기본값
- "제품을 한 문장으로 설명해주세요" → placeholder 텍스트에 반영 (범용 SaaS 문구 방지)

**2단계: 페이지 유형 판별 + 규칙 분기**
```
랜딩 페이지: 전체 규칙 적용 (섹션 시퀀스, 히어로, CTA, 소셜프루프 등)
대시보드: 섹션 시퀀스/히어로 규칙 제외. 사이드바 + 데이터 그리드 + 카드 레이아웃 적용
단일 페이지 (로그인/가입/404): 센터 정렬 폼 + 여백 + 폰트만. 섹션 시퀀스 미적용
블로그/문서: 읽기 폭(max-w-3xl) + 타이포 중심. 사이드바 TOC 선택적
```

**3단계: 디자인 톤 판별**
```
어떤 분위기를 원하시나요?
A. Linear, Cal.com 같은 깔끔한 미니멀 스타일
B. Stripe, Vercel 같은 정돈된 프로페셔널 스타일 (기본값)
C. Raycast, Arc 같은 어두운 프리미엄 스타일
D. Notion, Loom 같은 따뜻하고 친근한 스타일
E. Supabase, Hono 같은 개발자 중심 스타일
```
사용자가 명시하지 않으면 B. 예시 사이트 이름으로 사용자가 직관적으로 선택.

**4단계: 코드 생성 전 구조 계획 (Chain of Thought)**
코드를 쓰기 전에 먼저 구조를 텍스트로 계획한다:
```
계획 예시:
- 섹션 구성: Nav → Hero(center) → Social Proof → Features(bento) → How It Works → CTA(dark) → Footer
- 각 섹션 배경: white → gray-50 → white → gray-50 → white → gray-900 → gray-950
- 각 섹션 패딩: py-24 → py-12 → py-20 → py-20 → py-20 → py-24 → py-16
- 폰트 페어: Geist Sans + Geist Mono
- 색상: Tone B 뉴트럴 + 사용자 악센트(#2563eb)
```
이 계획을 확정한 후 코드를 작성한다.

**5단계: 생성 시 규칙 적용 (사후 검증이 아닌 사전 적용)**
생성하면서 아래 규칙을 반드시 따른다 (생성 후 고치는 것이 아니라 처음부터 지킨다):
```
규칙 1: 섹션 배경 — 홀수 섹션 bg-white, 짝수 섹션 bg-muted. CTA는 bg-gray-900.
규칙 2: 섹션 패딩 — 히어로 py-24+, 소셜프루프 py-12, 일반 py-20, CTA py-24.
규칙 3: 카드 크기 — 카드 3개 이상이면 첫 번째를 col-span-2 또는 크게.
규칙 4: 타이포 — h1은 text-4xl 이상. 사용 font-size 6종 이내.
규칙 5: 통일성 — rounded-* 2종 이내. shadow-* 1종만.
규칙 6: 디테일 — 모든 버튼/카드에 hover + transition. 모든 인터랙티브에 focus-visible.
```

**6단계: 레퍼런스 참조하여 코드 작성**
- page-recipes.md에서 섹션 구성
- sections.md에서 각 섹션 코드
- components.md에서 컴포넌트 세부
- visual-guide.md에서 색감/이미지/트렌드

**7단계: 접근성 + 다크 모드 적용** (아래 참조)

**8단계: 최종 확인 (최소한의 사후 검증)**
```
□ 금지 목록 13개 위반 0건
□ h1/body 크기비 ≥ 2.5 (기대값 — 실측으로 교체)
□ 뉴트럴 색상 비율 ≥ 60%
□ 필수 디테일 10개 전부 포함
```

### 접근성 필수 사항 (MVP에 포함)

스킬이 생성하는 모든 코드에 기본 포함:
```
시맨틱 HTML:
  - <nav>, <main>, <footer>, <section> 시맨틱 태그 사용
  - 제목 순서: h1 → h2 → h3 (건너뛰기 금지)
  - 버튼은 <button>, 링크는 <a> (div로 대체 금지)

접근성 속성:
  - 아이콘 전용 버튼에 sr-only 텍스트 또는 aria-label
  - 이미지에 alt 텍스트
  - 모든 인터랙티브 요소에 focus-visible:ring-2 ring-offset-2

대비:
  - 일반 텍스트/배경 대비 4.5:1 이상
  - 큰 텍스트(18px bold 또는 24px 이상)/배경 대비 3:1 이상

모션:
  - 애니메이션에 prefers-reduced-motion: reduce 대응
    @media (prefers-reduced-motion: reduce) { animation: none; transition: none; }
```

### 다크 모드 팔레트 (MVP에 포함)

스킬이 생성하는 코드에 라이트/다크 모드 전환을 CSS 변수로 포함:
```css
:root {
  --bg: #ffffff;
  --text: #0f172a;
  --subtle-bg: #f8fafc;
  --border: #e2e8f0;
  --muted: #64748b;
  --accent: /* 사용자 브랜드 색상 또는 톤별 기본값 */;
}

.dark {
  --bg: #0a0a0a;
  --text: #fafafa;
  --subtle-bg: #171717;
  --border: #262626;
  --muted: #a3a3a3;
  --accent: /* 라이트와 동일하거나 밝기 조정 */;
}
```
HTML에 `class="dark"` 토글로 전환. Tailwind의 dark: 프리픽스 활용.

### 현실적 기대치

이 스킬의 목표는 AI 느낌을 "완전히 제거"하는 것이 아니라, **하한선을 보장**하는 것이다.
- 스킬 없이 기본 AI 생성: 3~4점 (편차 큼, 2~8)
- 스킬 적용 (기본): **6~7점** (편차 작음, 5.5~7.5) ← 핵심 목표
- 스킬 + 스크린샷 피드백(방법 B): **7~8점**
- 8점 이상: 사람이 직접 조정 필요

"3~4점에서 6~7점으로"가 이 프로젝트의 가치다.
"AI가 만든 것 같다"에서 "괜찮은데?"로 바뀌는 경계.

---


## 실행 계획 — 소거와 제약으로 저점을 올리는 학습 루프

### 핵심 원리

**"좋은 것을 고르는" 게 아니라 "싫은 것을 거르는" 방식이다.**

매 라운드에서 사용자는 "이건 안 돼"를 말한다.
제약조건(금지)이 쌓일수록 나쁜 결과가 나올 수 없게 된다.
좋은 것을 선택하지 않아도, 나쁜 것을 충분히 제거하면 좋은 것만 남는다.

```
라운드 1: 5개 톤 → "친근, 개발자는 아니야" → 2개 소거 → 3개 생존
라운드 2: 생존 3톤 × 구조 변형 → "균등 그리드는 아니야" → 구조 제약 추가
라운드 3: 생존 톤들 × 디테일 변형 → "둥근 모서리 싫어" → 디테일 제약 추가
...반복할수록 제약이 쌓이고, 결과의 하한선이 올라간다
```

**멀티톤:** 소거되지 않은 모든 톤이 최종 스킬에 살아남는다.
"프로페셔널도 좋고 다크도 좋다" → 스킬에 두 레시피가 모두 포함.
사용자가 나중에 "랜딩 만들어줘"라고 하면 톤을 선택할 수 있다.

### 왜 반복할수록 반드시 나아지는가

**제약은 단조 증가한다. 제약이 많을수록 나쁜 결과가 불가능해진다.**

```
라운드 1 제약: [보라 그라데이션 금지, 균등 패딩 금지]
→ 이 2개만으로도 "전형적 AI 느낌"의 절반이 사라진다

라운드 2 제약: [+다크 배경 금지, +3열 균등 카드 금지]
→ 4개 제약. 안 좋은 결과가 나올 경로가 더 줄어든다

라운드 3 제약: [+큰 둥근 모서리 금지, +Inter 폰트 금지]
→ 6개 제약. 결과가 더 좁은 "좋은 영역"에만 떨어진다

라운드 N 제약: [13개+]
→ 나쁜 결과가 나올 수 있는 경로가 거의 없다 = 저점이 높다
```

이건 되돌리기를 해도 유지된다.
"히어로를 split으로 바꿨는데 center가 나았어" → 구조만 되돌림.
하지만 "보라 그라데이션 금지"는 그대로. 절대 풀리지 않는다.

### 스킬의 구조: 공통 제약 + 톤별 레시피

```
SKILL.md 구조:

[공통 — 모든 톤에 적용] (소거로 쌓인 제약)
  ├── 금지 목록 (소거된 것들, 단조 증가)
  ├── 생성 시 규칙 6가지 (배경 교대, 패딩 변주, ...)
  ├── 수치 기준 (실측 통계)
  ├── 접근성
  └── 사전 질문 (브랜드 색상, 제품 설명)

[톤 레시피 — 소거되지 않은 톤들만 생존]
  ├── Tone B(프로페셔널): 뉴트럴 팔레트, 폰트 페어, 밀도, 디테일
  ├── Tone C(다크): 뉴트럴 팔레트, 폰트 페어, 밀도, 디테일
  └── Tone A(미니멀): 뉴트럴 팔레트, 폰트 페어, 밀도, 디테일
  (Tone D, E는 소거됨 → 스킬에 없음)
```

**톤과 무관한 것 (공통, 제약으로 쌓임):**
- 금지 목록, 구조 규칙, 수치, 디테일 규칙, 접근성

**톤별로 다른 것 (살아남은 톤마다 레시피):**
- 색상 팔레트, 폰트 페어, 배경 접근, 밀도/여백 수준

---

### 기술 스택
- Node.js 20+ / playwright (npm)
- child_process — claude -p 호출

### 디렉토리 구조
```
web-design-analyzer/
├── package.json
├── INSTRUCTION.md
├── templates/                          ← Stage 0에서 생성
│   └── (hero-center.tsx, hero-split.tsx, nav.tsx, ...)
├── scripts/
│   ├── 1-collect-urls.js               ← 시드 리스트 관리
│   ├── 2-css-analysis.js               ← CSS + 비율 추출
│   ├── 3-visual-analysis.js            ← 선택적
│   └── 4-statistics.js                 ← 누적 가중 통계
├── data/
│   ├── urls.json                       ← 전체 시드 리스트
│   ├── urls-roundN.json                ← 라운드별 크롤링 대상
│   ├── css-analysis.json               ← 누적 CSS 데이터
│   ├── site-weights.json               ← 가중치
│   └── statistics.json                 ← 가중 누적 통계
├── output/
│   ├── skill-versions/                 ← 라운드별 스킬 스냅샷
│   │   ├── round1/
│   │   │   ├── SKILL.md
│   │   │   └── samples/ (이 스킬로 생성한 HTML들)
│   │   ├── round2/
│   │   └── ...
│   └── web-design-system/              ← 최종 스킬
│       ├── SKILL.md
│       └── references/
└── feedback/
    ├── round1.md
    ├── round2.md
    └── accumulated.md                  ← 핵심: 누적 제약 + 소거 이력 + 생존 톤
```

---

### Stage 0: 준비 (~15분)

```bash
npm install
npx playwright install chromium
```

1. templates/ 폴더에 10개 섹션 템플릿 생성 (shadcn/ui blocks 참고, CSS 변수 사용)
2. 각 템플릿은 CSS 변수로 톤 교체 가능하게.

---

### 반복 루프 — 소거로 스킬을 개선하는 사이클

#### 매 라운드의 흐름:

```
[1] 크롤링 (첫 회: 범용 50개, 이후: 생존 톤 방향 30~50개)
    ↓
[2] 누적 가중 통계 업데이트
    ↓
[3] 스킬(SKILL.md) 업데이트
    - 이전 라운드의 소거 → 금지 목록에 추가
    - 통계 수치 업데이트
    - 소거된 톤의 레시피 제거
    ↓
[4] 이 스킬을 적용하여 생존 톤별 × 변형 축으로 HTML 생성
    - Claude Code가 SKILL.md를 읽고 HTML을 만든다
    ↓
[5] 스킬 + HTML을 skill-versions/roundN/에 스냅샷
    ↓
[6] 사용자에게 보여주고 "뭐가 싫은지" 물어보기
    ↓
[7] 소거 → 제약 추가 → 스킬 수정 → 다음 라운드
```

#### 핵심: 스킬을 거쳐서 HTML을 만든다

[3]에서 만든 SKILL.md가 [4]에서 HTML을 만들 때 **실제로 사용**된다.
사용자가 보는 HTML = 스킬이 만든 HTML.
스킬이 좋아지면 HTML이 좋아지고, HTML이 별로면 스킬이 별로인 것.
최종 스킬 = 마지막 라운드의 스킬 (이미 검증됨). 변환 과정 없음. 재현 보장.

#### 첫 라운드: 넓게 펼치고 소거 시작

```bash
node scripts/1-collect-urls.js                 # 전체 시드 리스트
node scripts/2-css-analysis.js --limit 50      # 범용 50개
node scripts/4-statistics.js                   # 통계
```

Claude Code가:
1. statistics.json 기반 초기 SKILL.md 생성 (PHASE 0~0.5의 모든 규칙 + 실측 수치)
2. **5가지 톤 각각으로** 같은 프롬프트("SaaS 랜딩")의 HTML을 생성
   - A: 미니멀, B: 프로페셔널, C: 다크 프리미엄, D: 친근한, E: 개발자

**사용자에게:**
```
5개를 보세요. "좋은 것"을 고를 필요 없습니다.
1. 확실히 싫은 것을 빼주세요.
2. 싫은 이유를 말해주세요. (예: "D는 너무 둥글둥글해서 싫다")
3. 생존한 것들 중에서 특별히 싫은 부분이 있으면 말해주세요.
```

**피드백 처리:**
```
사용자: "D랑 E 빼. D는 둥글둥글해서 싫고, E는 코드 느낌이 과해."
→ 소거: Tone D, Tone E
→ 금지 추가: 큰 border-radius(rounded-2xl+), 코드 블록 히어로, 모노스페이스 메인 폰트
→ 생존: A, B, C (3개 톤이 스킬에 남음)
→ feedback/accumulated.md 업데이트
```

핵심: 사용자가 "D가 싫다"고 한 이유("둥글둥글")를 **구체적 제약으로 변환**한다.
톤 자체를 소거하는 것보다, **왜 싫은지를 제약으로 만드는 게 더 가치 있다.**
"둥근 모서리 싫다"는 생존한 A, B, C에도 적용되어 전체 저점이 올라간다.

---

#### 이후 라운드: 제약 추가 → 저점 상승

**Claude Code가 매 라운드 하는 일:**

1. **소거 이유를 제약으로 변환:**
```
사용자: "B에서 카드가 전부 같은 크기인 게 밋밋해"
→ 금지 추가: 3개+ 카드 동일 크기
→ 이 제약이 A, B, C 전부에 적용됨 → 전체 저점 상승
```

2. **피드백 확인 요약:**
```
Claude Code: "확인합니다.
  금지 추가: 카드 동일 크기, 균등 그리드
  생존 톤: A, B, C (변화 없음)
  다음 변형: 생존 톤들에서 구조 차이
  맞나요?"
```

3. **생존 톤 방향으로 추가 크롤링:**
   Claude Code가 시드 리스트에서 생존 톤(A, B, C)에 맞는 사이트 30~50개 선별.
```bash
node scripts/2-css-analysis.js --urls data/urls-roundN.json
node scripts/4-statistics.js
```

4. **가중치 조정:**
   `data/site-weights.json`에 사이트별 가중치 기록.
   - 생존 톤에 맞는 사이트: 1.0
   - 소거된 톤 방향 사이트: 0.5
   - 범용(첫 라운드) 사이트: 0.7

5. **스킬 업데이트 후 변형 HTML 생성:**
   - 금지 목록에 새 제약 추가
   - 소거된 톤 레시피 제거
   - 수치를 새 누적 통계로 업데이트
   - **이 스킬을 읽고** 생존 톤 × 변형 축으로 3~5개 HTML 생성

6. **사용자에게 소거 요청:**
```
이전 제약이 전부 적용되어 있습니다.
1. 확실히 싫은 것을 빼주세요.
2. 싫은 이유를 말해주세요.
3. "이 정도면 다 괜찮다" → 확정 가능
```

---

#### 제약이 쌓이는 과정 (구체적 예시)

```
[PHASE 0 기본 금지]: 13개 (보라 그라데이션, 균등 패딩, h1 30px 이하, ...)

라운드 1 소거:
  톤 소거: D(친근), E(개발자)
  제약 추가: [+둥근 모서리 2xl+, +코드블록 히어로, +모노스페이스 메인폰트]
  누적 금지: 16개 → 저점 ★★☆☆☆

라운드 2 소거:
  구조 소거: 균등 3열 카드
  제약 추가: [+카드 동일 크기 금지, +히어로 60vh 미만 금지]
  누적 금지: 18개 → 저점 ★★★☆☆

라운드 3 소거:
  디테일 소거: 그림자 없는 밋밋한 카드
  제약 추가: [+카드에 shadow/border 필수, +nav backdrop-blur 필수]
  누적 금지: 20개 → 저점 ★★★★☆

라운드 4:
  사용자: "이 정도면 다 괜찮다. 확정."
  → 최종 금지: 20개+. 나쁜 결과 경로가 거의 없음.
```

---

#### 사용자 피드백 유형별 처리

**"이건 싫어" (소거 — 기본 모드):**
→ 싫은 이유를 구체적 제약으로 변환
→ 금지 목록에 추가 (모든 생존 톤에 적용)
→ 해당 톤/구조/디테일 소거

**"이 정도면 다 괜찮다" (확정):**
→ 루프 종료
→ 현재 스킬 = 최종 스킬 (생존 톤 전부 포함)

**"이전 라운드가 나았어" (되돌리기):**
→ skill-versions/roundN/SKILL.md를 꺼냄
→ **금지 목록은 현재(최신)것 유지** (절대 퇴보 안 함)
→ 나머지만 되돌림 → 새 변형 생성

**"다 별로. 다른 방향으로" (방향 전환):**
→ "어떤 부분이 싫은지"를 제약으로 추출 (이건 자산)
→ "마음에 드는 사이트 URL을 알려주세요" 요청
→ 해당 사이트 크롤링 → 새 기준
→ 금지 목록 전부 유지

---

#### 멀티톤 최종 스킬의 동작

최종 스킬에 3개 톤(A, B, C)이 살아남았다면:

```
사용자: "SaaS 랜딩 만들어줘"
스킬 동작:
  1. 사전 질문: 브랜드 색상, 제품 설명
  2. 톤 선택: "어떤 분위기를 원하세요?
     A. Linear, Cal.com 같은 미니멀
     B. Stripe, Vercel 같은 프로페셔널
     C. Raycast, Arc 같은 다크"
  3. 공통 제약 적용 (금지 20개 + 생성 규칙 + 수치)
  4. 선택된 톤 레시피 적용 (색상 + 폰트 + 밀도)
  5. 코드 생성
```

어떤 톤을 골라도 공통 제약이 적용되므로 **저점이 보장**된다.

---

#### 수렴 감지

- "이건 싫어"보다 "괜찮은데"가 많아지면 → "확정할 수 있을 것 같습니다."
- 5라운드+ "다 싫어" → "마음에 드는 사이트 URL을 직접 알려주세요."
- 생존 톤 1개 → 자연스럽게 싱글톤 확정

#### 크롤링 없는 라운드

데이터 충분하면 (100개+) 크롤링 없이 제약 추가 + 변형만 가능.

---

### Stage 최종: 스킬 + 에이전트 생성

사용자가 "확정"하면 **두 가지 산출물**을 만든다.

#### 산출물 1: 정적 스킬 (가볍게 쓰기)

```
output/web-design-system/
├── SKILL.md                    ← .claude/skills/에 넣으면 바로 동작
└── references/
    ├── sections.md
    ├── components.md
    ├── page-recipes.md
    ├── visual-guide.md
    └── review-script.md
```

**스킬 = 규칙서.** Claude Code가 읽고 따른다.
"h1은 48px 이상", "보라 그라데이션 금지", "Tone B 레시피" 등 정적 규칙.
설치 1초. 누구나 복사해서 바로 쓸 수 있다. 가볍다.

**한계:** 규칙만 따를 뿐, 상황 판단을 못한다.
"의료 서비스라서 톤이 달라야 하는데..." → 스킬에 없으면 대응 불가.
생성 후 자가 검증도 규칙이 있어야만 동작. 능동적이지 않다.

**사용법:**
```bash
cp -r output/web-design-system/ my-project/.claude/skills/web-design-system/
claude "SaaS 랜딩 만들어줘"
```

#### 산출물 2: 에이전트 (능동적으로 쓰기)

```
output/web-design-agent/
├── agent.yaml                  ← 에이전트 정의 (5요소 구조)
├── SKILL.md                    ← 동일한 스킬 (에이전트가 내부적으로 참조)
├── references/                 ← 동일
└── tools/
    ├── analyze-code.md         ← 생성한 코드를 분석하는 프롬프트
    ├── screenshot-review.md    ← 스크린샷 피드백 루프 프롬프트
    └── tone-detect.md          ← 프로젝트 컨텍스트에서 톤 자동 판별 프롬프트
```

**에이전트 = 능동적으로 판단하고 실행하고 검증하는 것.** 스킬의 상위 호환.

에이전트가 스킬과 다른 점:

| | 스킬 (정적) | 에이전트 (능동) |
|---|---|---|
| 톤 판별 | 사용자에게 물어봄 | 프로젝트 컨텍스트를 읽고 자동 추천 |
| 금지 위반 | 생성 시 규칙으로만 | 생성 후 코드를 분석해서 위반 감지 + 자동 수정 |
| 스크린샷 피드백 | 선택적 스크립트 | 자동으로 렌더링 → 비평 → 수정 루프 |
| 프로젝트 적응 | 없음 (범용 규칙) | 기존 코드를 읽고 스타일을 맞춤 |
| 컴포넌트 일관성 | 없음 | 기존 컴포넌트를 감지하고 동일 스타일로 생성 |

**agent.yaml 구조 (SpoonAI Orchestra 5요소):**

```yaml
name: "Web Design Expert"
role: "web_design_expert"
version: "1.0"
created_by: "auto"

identity:
  personality: |
    시니어 프론트엔드 디자이너. 실측 데이터 기반으로 판단한다.
    "예쁜" 대신 "의도적인 선택"을 추구한다.
    AI 느낌 나는 결과물을 극도로 경계한다.
  communication: |
    코드로 말한다. 추상적 디자인 용어 대신 구체적 CSS 값을 제시한다.
    "여백을 넓게"가 아니라 "py-24를 py-32로."
  thinking: |
    모든 디자인 결정에서 "이게 AI 기본값인가?"를 먼저 판단한다.
    기본값이면 의도적으로 벗어난다.
    200개 사이트 실측 데이터의 상위 그룹 패턴을 기준으로 삼는다.
  expertise:
    - React + Tailwind + shadcn/ui 기반 프론트엔드 구현
    - 시각적 계층, 리듬, 비례, 여백의 코드 레벨 구현
    - 디자인 톤 판별 및 일관된 톤 유지
    - 접근성 (WCAG 2.2) 및 반응형 디자인
    - 프로덕트 스크린샷/목업 처리

mission: |
  사용자의 프론트엔드 요청을 받아, AI 느낌 없는 전문가 수준의 코드를 생성한다.
  내장된 SKILL.md의 규칙을 따르되, 프로젝트 컨텍스트에 맞게 능동적으로 판단한다.
  생성 후 반드시 자가 검증을 수행하고, 위반 사항을 자동 수정한다.

critical_rules:
  must:
    - 코드 생성 전에 프로젝트의 기존 코드를 읽고 스타일을 파악할 것
    - SKILL.md의 금지 목록을 100% 준수할 것
    - 생성 후 6가지 코드 구조 분석을 수행하고 위반 시 자동 수정할 것
    - 톤이 명시되지 않으면 프로젝트 컨텍스트에서 추론하고 사용자에게 확인할 것
    - 모든 인터랙티브 요소에 hover + transition + focus-visible을 포함할 것
  must_not:
    - SKILL.md 금지 목록의 어떤 항목도 위반하지 말 것
    - 기존 프로젝트의 디자인 시스템과 충돌하는 스타일을 쓰지 말 것
    - border-radius, shadow, 색상을 프로젝트 내에서 불일치하게 쓰지 말 것
    - 사용자에게 확인 없이 톤을 바꾸지 말 것
    - 접근성 기본 사항(시맨틱 HTML, 대비, 포커스)을 생략하지 말 것

deliverables:
  - 완전한 React + Tailwind 코드 (단일 파일 또는 컴포넌트)
  - 반응형 (데스크탑 + 모바일)
  - 라이트/다크 모드 CSS 변수 포함
  - 접근성 기본 사항 포함

success_metrics:
  - SKILL.md 금지 목록 위반 0건
  - 6가지 코드 구조 분석 전부 통과
  - 프로젝트 기존 코드와 border-radius/shadow/색상 불일치 0건
  - 생성된 코드가 "AI가 만든 것 같다"는 느낌이 없을 것
```

**에이전트의 능동적 행동 3가지:**

1. **프로젝트 컨텍스트 읽기:**
   프론트엔드 요청을 받으면, 먼저 프로젝트의 기존 코드(tailwind.config, globals.css, 기존 컴포넌트)를 읽는다.
   기존에 `rounded-lg`를 쓰고 있으면 에이전트도 `rounded-lg`를 쓴다.
   기존에 `blue-600`이 악센트면 에이전트도 `blue-600`을 쓴다.
   → 스킬은 이걸 못한다. 에이전트는 기존 코드에 적응한다.

2. **생성 후 자가 검증 + 자동 수정:**
   코드를 생성한 후, `tools/analyze-code.md`의 프롬프트로 자기 코드를 분석한다.
   금지 위반, 불일치, 디테일 누락을 감지하면 자동으로 수정한다.
   → 스킬은 "규칙대로 생성하라"만. 에이전트는 "생성하고 → 검증하고 → 수정한다."

3. **선택적 스크린샷 피드백:**
   HTML을 Playwright로 렌더링 → 스크린샷 → Claude Vision으로 비평 → 코드 수정.
   `tools/screenshot-review.md`의 프롬프트를 사용한다.
   → 스킬에서는 사용자가 수동으로 실행해야 하는 것을, 에이전트는 자동으로 한다.

**사용법:**
```bash
# 방법 1: agent.yaml을 Claude Code에 직접 전달
claude "agent.yaml을 읽고 이 에이전트로 SaaS 랜딩을 만들어줘"

# 방법 2: SpoonAI Orchestra에서 사용 (향후)
spoon run "SaaS 랜딩 만들어줘" --agent web_design_expert

# 방법 3: Claude Code Agent Teams에서 사용
# 다른 에이전트(planner, code-reviewer)와 함께 팀으로 동작
```

---

#### 스킬 vs 에이전트: 언제 뭘 쓰나

```
스킬을 쓸 때:
  ✅ 빠르게 프론트엔드를 만들고 싶을 때 (설치 1초)
  ✅ 다른 개발자에게 배포할 때 (의존성 없음)
  ✅ 가벼운 프로젝트 (규칙만으로 충분)

에이전트를 쓸 때:
  ✅ 기존 프로젝트에 새 페이지를 추가할 때 (기존 스타일 일관성 필요)
  ✅ 높은 퀄리티가 필요할 때 (자가 검증 + 자동 수정)
  ✅ SpoonAI Orchestra나 Agent Teams와 함께 쓸 때
  ✅ 스크린샷 피드백까지 자동으로 돌리고 싶을 때
```

---

### 고도화 보장 메커니즘 — 요약

```
절대 줄어들지 않는 것 (단조 증가):
  ✅ 금지 목록 — 소거가 쌓인다. 되돌려도 줄어들지 않는다.
  ✅ 크롤링 데이터 — 50→100→150→... 삭제 안 함.
  ✅ 제약의 구체성 — "D 싫어" → "둥근 모서리 싫어" → "rounded-xl+ 금지"

줄어들 수 있는 것 (사용자가 명시적으로만):
  🔄 생존 톤 수 — 5→3→2 (남은 것이 더 정교해짐)

왜 저점이 올라가는가:
  → 금지가 길수록 나쁜 결과의 "경로"가 줄어든다
  → 충분히 줄어들면 어떤 톤을 골라도 최소 수준 이상
  → 이것이 "저점을 올린다"의 의미
```

---

### 중단 복구
- data/, feedback/, output/skill-versions/ 폴더가 상태 보존.
- 세션 끊기면: "INSTRUCTION.md 읽고 이어서 해줘"
  → skill-versions/에서 마지막 라운드 확인
  → feedback/accumulated.md에서 누적 제약 확인
  → 마지막 스킬 기반으로 재개

### 에러 처리
- 사이트 접속 실패: 건너뛰기
- JSON 파싱 실패: 1회 재시도 후 건너뛰기
- 라운드당 30~50개 중 20개 이상 성공하면 충분
- 시드 소진: "크롤링 가능 사이트 부족. 현재 데이터로 더 개선할까요, 확정할까요?"

---

## 완료 기준

### 루프 진행 중:
1. 매 라운드 `skill-versions/roundN/SKILL.md`가 스냅샷되어 있다
2. `feedback/accumulated.md`에 금지 목록이 라운드마다 증가하고 있다
3. 생존 톤이 명확하다
4. "전보다 나아졌다" 또는 "괜찮다"가 나오고 있다

### 최종 완료:
5. 사용자가 "확정"을 선언했다
6. 누적 크롤링 데이터 100개 이상
7. **스킬:** `output/web-design-system/SKILL.md` + references/ 생성 완료
8. **에이전트:** `output/web-design-agent/agent.yaml` + tools/ 생성 완료
9. 스킬에 생존 톤 레시피 포함 (멀티톤)
10. 스킬에 누적 금지 목록 포함 (PHASE 0 기본 + 라운드별 소거)
11. 에이전트가 프로젝트 컨텍스트 읽기 + 자가 검증 + 자동 수정을 수행
12. 어떤 톤을 선택해도 저점 이상의 결과가 재현된다

---

## 참고: 기존 코드

이 프로젝트 디렉토리에 이미 작성된 스크립트가 있을 수 있다.
이 기존 코드를 참고하되, 이 문서의 명세에 맞게 수정/보완하여 사용할 것.

특히:
- Stage 0: templates/ 폴더에 10개 섹션 템플릿 (shadcn/ui 참고, CSS 변수 사용)
- 1-collect-urls.js: 시드 리스트 관리. 사이트 선정은 Claude Code가 직접.
- 2-css-analysis.js: `--urls`, `--limit`, 비율 계산, 히어로 식별(top<50vh),
  폰트 태깅, networkidle 대기, 쿠키 배너 닫기, h1 폴백
- 4-statistics.js: 가중 통계. site-weights.json 읽어 가중 중앙값 계산.
- **스킬(SKILL.md)은 Claude Code가 매 라운드 직접 생성/수정**
- **변형 HTML도 Claude Code가 스킬을 읽고 직접 생성**
- 매 라운드 SKILL.md + HTML을 skill-versions/roundN/에 스냅샷
- **Stage 최종에서 agent.yaml + tools/ 생성** (에이전트 산출물)
- 3-visual-analysis.js: 선택적

---

## 참고: 설치 방법

**스킬 설치 (가볍게):**
```bash
cp -r output/web-design-system/ my-project/.claude/skills/web-design-system/
```

**에이전트 설치 (능동적으로):**
```bash
cp -r output/web-design-agent/ my-project/.claude/agents/web-design-expert/
# 또는 SpoonAI Orchestra의 agents/ 디렉토리에 복사
```
