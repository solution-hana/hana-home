const SAFE_PROTOCOLS = ['http:', 'https:'];

// 브라우저가 주소에서 조용히 지우는 문자(탭·줄바꿈)와 그 밖의 제어문자·공백
// eslint-disable-next-line no-control-regex
const CONTROL_OR_SPACE = /[\u0000-\u0020\u007f]/;

/**
 * DB 등 밖에서 들어온 주소를 링크로 써도 되는지 검사합니다.
 * http(s) 주소와 사이트 안 경로('/...')만 통과시키고,
 * javascript: · data: 같은 주소는 undefined 로 돌려줍니다.
 */
export function toSafeUrl(value: string | null | undefined): string | undefined {
  const url = value?.trim();

  if (!url) {
    return undefined;
  }

  // 사이트 안 경로: '/'로 시작. '//' · '/\\'(다른 사이트로 해석됨)와 제어문자가 섞인 값은 막는다
  if (url.startsWith('/')) {
    return /^\/(?![/\\])/.test(url) && !CONTROL_OR_SPACE.test(url) && !url.includes('\\') ? url : undefined;
  }

  try {
    const parsed = new URL(/^www\./i.test(url) ? `https://${url}` : url);

    return SAFE_PROTOCOLS.includes(parsed.protocol) ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}

/**
 * 밖에서 들어온 이미지 주소를 CSS 배경(url(...))으로 쓸 때 사용합니다.
 * 검사를 통과한 주소만 따옴표로 감싸 돌려주므로 주소에 CSS 를 끼워 넣을 수 없습니다.
 */
export function toCssUrl(value: string | null | undefined): string | undefined {
  const url = toSafeUrl(value);

  return url ? `url("${url.replace(/"/g, '%22')}")` : undefined;
}

/** 주소가 다른 사이트(http·https)인지 여부 */
export function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

/** 검사를 통과한 주소만 새 창으로 엽니다. 새 창은 원래 창을 조작할 수 없습니다. */
export function openExternal(value: string | null | undefined) {
  const url = toSafeUrl(value);

  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
