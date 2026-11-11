import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import type { PageSeo } from '@/shared/config/seo';
import { SITE_URL, OG_IMAGE_URL, resolveJsonLd, resolvePageSeo } from '@/shared/config/seo';
import { serializeJsonLd } from '@/shared/utils/jsonLd';

const JSON_LD_ELEMENT_ID = 'page-json-ld';

/**
 * 현재 경로에 맞는 title·description·canonical·OG·JSON-LD를 문서에 반영하는 훅
 *
 * 빌드 시 프리렌더러가 이 훅이 갱신한 <head>를 그대로 정적 HTML로 저장하므로,
 * JS를 실행하지 않는 검색·AI 크롤러도 페이지별 메타데이터를 읽을 수 있다.
 */
export function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = resolvePageSeo(pathname);
    const canonicalUrl = buildCanonicalUrl(pathname);

    document.title = title;

    setMetaContent('name', 'description', description);
    setMetaContent('property', 'og:title', title);
    setMetaContent('property', 'og:description', description);
    setMetaContent('property', 'og:url', canonicalUrl);
    setMetaContent('property', 'og:image', OG_IMAGE_URL);

    setCanonicalUrl(canonicalUrl);
    setJsonLd(resolveJsonLd(pathname));
  }, [pathname]);
}

/**
 * 비동기로 불러온 데이터로 title·description을 덮어쓸 때 사용하는 훅
 *
 * PageLayout의 useSeo는 경로가 바뀔 때만 실행되므로, 데이터가 도착한 뒤
 * 실행되는 이 훅의 값이 최종적으로 남는다.
 */
export function useSeoOverride(seo: PageSeo | undefined) {
  const title = seo?.title;
  const description = seo?.description;

  useEffect(() => {
    if (!title || !description) {
      return;
    }

    document.title = title;
    setMetaContent('name', 'description', description);
    setMetaContent('property', 'og:title', title);
    setMetaContent('property', 'og:description', description);
  }, [title, description]);
}

function buildCanonicalUrl(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, '');

  return `${SITE_URL}${normalizedPath || '/'}`;
}

function setMetaContent(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setCanonicalUrl(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function setJsonLd(nodes: object[]) {
  let element = document.getElementById(JSON_LD_ELEMENT_ID);

  if (!element) {
    element = document.createElement('script');
    element.id = JSON_LD_ELEMENT_ID;
    element.setAttribute('type', 'application/ld+json');
    document.head.appendChild(element);
  }

  element.textContent = serializeJsonLd(nodes);
}
