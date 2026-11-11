/**
 * JSON-LD 를 <script> 안에 넣어도 태그가 끊기지 않게 직렬화합니다.
 * 제목 등에 '</script>' 가 들어 있어도 글자로만 남습니다.
 */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
