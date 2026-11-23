import { NAVER_AD_SITE_DOMAIN, NAVER_AD_SITE_ID } from '@/shared/config/constants';

/**
 * 네이버 검색광고 전환 추적 (wcs.trans 방식)
 * 공식 가이드: https://naver.github.io/conversion-tracking/pages/01_script_guide_wcstrans/
 *
 * - 사이트 ID(NAVER_AD_SITE_ID)가 비어 있으면 아무것도 불러오지 않는다.
 * - 프리렌더(빌드 중 헤드리스 브라우저)와 관리자 화면에서는 실행하지 않는다.
 */

const SCRIPT_URL = 'https://wcs.naver.net/wcslog.js';

// 전환 유형 코드(가이드의 type). 전화하기=call, 문의/상담하기=inquiry, 신청완료=lead
export type NaverAdConversionType = 'call' | 'inquiry' | 'lead';

declare global {
  interface Window {
    wcs?: {
      inflow: (domain?: string) => void;
      trans: (conversion: { type: string }) => void;
    };
    wcs_add?: Record<string, string>;
    wcs_do?: () => void;
  }
}

let scriptPromise: Promise<boolean> | null = null;

function isEnabled() {
  if (!NAVER_AD_SITE_ID) return false;
  if (typeof window === 'undefined') return false;
  if (navigator.webdriver) return false;
  if (window.location.pathname.startsWith('/hana/back')) return false;

  return true;
}

function loadScript() {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

// 공통 스크립트: 페이지가 열릴 때마다(주소가 바뀔 때마다) 한 번 호출한다
export async function trackNaverAdPageView() {
  if (!isEnabled()) return;

  const loaded = await loadScript();
  if (!loaded || !window.wcs || !window.wcs_do) return;

  window.wcs_add = window.wcs_add ?? {};
  window.wcs_add.wa = NAVER_AD_SITE_ID;
  window.wcs.inflow(NAVER_AD_SITE_DOMAIN);
  window.wcs_do();
}

// 전환 스크립트: 전화 누르기 같은 행동이 일어난 시점에 호출한다
export async function trackNaverAdConversion(type: NaverAdConversionType) {
  if (!isEnabled()) return;

  const loaded = await loadScript();
  if (!loaded || !window.wcs) return;

  window.wcs_add = window.wcs_add ?? {};
  window.wcs_add.wa = NAVER_AD_SITE_ID;
  window.wcs.trans({ type });
}
