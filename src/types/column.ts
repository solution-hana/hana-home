/** 본문 한 줄 안의 조각 — 문자열은 일반 글자, strong은 굵은 글자 */
export type ColumnInline = string | { strong: string };

/** 태양광 정보 글 본문 블록 */
export type ColumnBlock =
  | { type: 'heading'; text: string }
  | { type: 'list'; ordered?: boolean; items: ColumnInline[][] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'note'; text: string }
  | { type: 'faq'; items: { question: string; answer: string }[] };

/** 태양광 정보 글 1편 */
export interface Column {
  slug: string;
  /** 목록에서 제목 위에 보이는 분류 */
  category: string;
  title: string;
  summary: string;
  description: string;
  publishedAt: string;
  /** 본문 맨 위 '짧은 답' 문단 */
  answer: ColumnInline[];
  blocks: ColumnBlock[];
  /** 본문 맨 아래 맺음 문장 */
  closing: string;
}
