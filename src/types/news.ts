/** 본문 한 줄 안의 조각 — 문자열은 일반 글자, strong은 굵은 글자 */
export type NewsInline = string | { strong: string };

/** 뉴스 기사 본문 블록 */
export type NewsBlock =
  | { type: 'paragraph'; parts: NewsInline[] }
  | { type: 'heading'; text: string }
  | { type: 'list'; ordered?: boolean; items: NewsInline[][] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  /** 원문을 그대로 옮긴 문장. source는 아래 sources 배열의 name과 같게 쓴다 */
  | { type: 'quote'; text: string; source: string }
  | { type: 'note'; text: string };

/** 기사 근거가 된 공식 원문 */
export interface NewsSource {
  /** 예: 산업통상자원부 보도자료 「…」 */
  name: string;
  url: string;
  /** 원문 발표일 YYYY-MM-DD */
  publishedAt: string;
}

/** 뉴스 기사 1편 */
export interface NewsArticle {
  slug: string;
  /** 목록에서 제목 위에 보이는 분류 (예: 정책, 지원사업, 회사 소식) */
  category: string;
  title: string;
  subtitle?: string;
  /** 목록 카드용 요약 1~2문장 */
  summary: string;
  /** 검색 결과·공유용 설명 */
  description: string;
  /** 기사 게시일 YYYY-MM-DD */
  publishedAt: string;
  /** 내용을 고친 날 YYYY-MM-DD (없으면 게시일과 같음) */
  modifiedAt?: string;
  /** 회사 자체 소식이면 true — 기사 위에 '하나솔루션 소식' 표시 */
  isCompanyNews?: boolean;
  /** 본문 맨 위 핵심 요약(리드) — AI가 가장 먼저 읽는 문단 */
  lead: string;
  blocks: NewsBlock[];
  /** 기사 근거 원문. 회사 소식이 아니면 1개 이상 필수 */
  sources: NewsSource[];
}
