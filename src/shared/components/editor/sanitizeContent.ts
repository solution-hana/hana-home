import type { JSONContent } from '@tiptap/react';

import { toSafeUrl } from '@/shared/utils/url';

// 색상으로 허용하는 모양: #hex · rgb()/hsl() · var(--이름) · 색 이름
const SAFE_COLOR = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\([\d\s.,%/]+\)|var\(--[\w-]+\)|[a-z]+)$/i;
const SAFE_WIDTH = /^\d{1,4}(\.\d+)?(%|px)?$/;

function isSafeImage(node: JSONContent) {
  return node.type !== 'image' || Boolean(toSafeUrl(node.attrs?.src));
}

/**
 * DB 에서 읽은 게시글 본문(JSON)을 화면에 그리기 전에 걸러냅니다.
 * - 링크·이미지 주소: http(s)·사이트 안 경로만 남김
 * - 글자색·형광펜 색: 색상 모양이 아니면 지움(style 속성에 다른 CSS 를 끼워 넣지 못하게)
 */
export function sanitizeContent(node: JSONContent): JSONContent {
  const next: JSONContent = { ...node };

  if (node.type === 'image') {
    next.attrs = {
      ...node.attrs,
      src: toSafeUrl(node.attrs?.src),
      width: SAFE_WIDTH.test(String(node.attrs?.width ?? '')) ? node.attrs?.width : '100%',
    };
  }

  if (node.marks) {
    next.marks = node.marks.map((mark) => {
      if (!mark.attrs) {
        return mark;
      }

      const attrs = { ...mark.attrs };
      const { color } = attrs;

      if (color != null && !(typeof color === 'string' && SAFE_COLOR.test(color.trim()))) {
        attrs.color = null;
      }

      if (mark.type === 'link') {
        attrs.href = toSafeUrl(attrs.href) ?? null;
      }

      return { ...mark, attrs };
    });
  }

  if (node.content) {
    next.content = node.content.filter(isSafeImage).map(sanitizeContent);
  }

  return next;
}
