# Taste Profile

## Hard Constraints (수동 관리)
SKILL.md 참조. 사이클 진행하며 필요 시 사용자가 추가.

## Soft Preferences (자동 집계)
- tone.dark: 0.47
- style.luxury: 0.20
- style.glassmorphism: 0.20
- style.minimal: 0.29
- style.immersive: 0.10
- style.cinema: 0.10
- style.portfolio: 0.10
- style.colorful: 0.10
- style.playful: 0.10
- style.interactive: 0.10
- style.editorial: 0.10
- style.pastel: 0.10
- style.dev-tool: 0.10
- density.sparse: 0.37
- density.balanced: 0.44
- density.dense: 0.10

## Anti-taste (자동 집계)
- style.military
- style.technical
- style.monospace
- style.earthy
- style.typography (단독 타이포그래피 전문은 거부)
- style.saas (단순 SaaS 랜딩은 거부)
- style.neon (네온 포트폴리오 거부)

## Reference Anchors
- 064 Neon Cinema, 065 Aurora Spirits, 066 Reality Interface, 067 Elastic Museum, 069 Interfere, 070 Overlay Beauty, 073 Poppr Immersive

## 2026-03-23 사이클 1 기록
- 소스: Awwwards, CSSDA (via WebSearch), Lapa Ninja
- 검색: 15개 URL → 분석 10개 → 게이트 통과 10개 → 큐레이션 10개 → keep 7개 → 최종 등록 6개 (072 제거)
- kept: [064, 065, 066, 067, 069, 070]
- deleted: [068 Binary Defense (무거움), 071 Ecrin Digital (별로), 073 Good Fella Coffee (별로)]
- rejected: 없음
- 패턴: dark 선호, luxury/glassmorphism/colorful 선호, military/monospace 거부

## 2026-03-23 사이클 2 기록
- 소스: Godly, Dark Mode Design, One Page Love, Awwwards, Lapa Ninja, Land-book
- 검색: 18개 URL → 분석 12개 → 게이트 통과 10개 → 큐레이션 10개 → keep 1개 → 최종 등록 1개
- kept: [073 Poppr Immersive]
- deleted: [Linus Rogge, Basement Foundry, Dann Petty, Shapeshyft, Kuba Zając, Obsidian Assembly, Aventura Dental, Apollo Studio, Resn] (다 별로)
- rejected: [Norma (redirect), Saaspo (403), Breakthrough Energy (403)]
- 패턴: 대부분 거부 — 단순 포트폴리오/에이전시 사이트는 거의 다 탈락. immersive/독특한 컨셉만 통과

## 스킬 변경 이력
- 2026-03-23 사이클 1: Godly/Httpster/Minimal Gallery 등 date-based 검색 약한 소스의 쿼리를 카테고리 기반으로 수정
- 2026-03-23 사이클 2: anti-taste에 typography, saas, neon 추가. 샘플 생성 시 opus 모델 필수 규칙 확인
