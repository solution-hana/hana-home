const POPUP_HIDE_PREFIX = 'popup-hide-until:';

function getPopupHideKey(storageKey: string) {
  return `${POPUP_HIDE_PREFIX}${storageKey}`;
}

/** localStorage에서 값을 안전하게 읽습니다. */
export function getLocalStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** localStorage에 값을 안전하게 저장합니다. */
export function setLocalStorageItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // private mode 등으로 저장 실패 시 무시
  }
}

/** localStorage에서 키를 안전하게 제거합니다. */
export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/**
 * 팝업 '오늘 하루 보지 않기' 상태인지 확인합니다.
 *
 * @param storageKey - 팝업 식별 키 (예: "home-notice")
 * @returns 오늘 자정까지 숨김 처리된 경우 true
 */
export function isPopupHiddenForToday(storageKey: string): boolean {
  const raw = getLocalStorageItem(getPopupHideKey(storageKey));
  if (!raw) return false;

  const until = Number(raw);
  if (Number.isNaN(until)) return false;

  return Date.now() < until;
}

/**
 * 팝업을 오늘 하루 동안 숨기도록 localStorage에 저장합니다.
 * 만료 시점은 당일 23:59:59.999 입니다.
 *
 * @param storageKey - 팝업 식별 키 (예: "home-notice")
 */
export function hidePopupForToday(storageKey: string): void {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  setLocalStorageItem(getPopupHideKey(storageKey), String(end.getTime()));
}

/**
 * 팝업 '오늘 하루 보지 않기' 상태를 해제합니다.
 *
 * @param storageKey - 팝업 식별 키
 */
export function clearPopupHideForToday(storageKey: string): void {
  removeLocalStorageItem(getPopupHideKey(storageKey));
}

/** 마지막으로 정상 조회된 목록을 읽습니다. 없거나 깨졌으면 빈 배열. */
export function readLastGood<T>(key: string): T[] {
  try {
    const parsed: unknown = JSON.parse(getLocalStorageItem(key) ?? '[]');
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

/**
 * 조회 결과가 있으면 저장해 두고 그대로 돌려주고,
 * 비어 있으면 마지막으로 저장해 둔 목록을 대신 돌려줍니다.
 */
export function keepLastGood<T>(key: string, items: T[]): T[] {
  if (items.length === 0) {
    return readLastGood<T>(key);
  }

  setLocalStorageItem(key, JSON.stringify(items));

  return items;
}
