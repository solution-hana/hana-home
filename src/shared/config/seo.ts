import {
  FAQ_ITEMS,
  COMPANY_NAME,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_TIKTOK_URL,
  COMPANY_THREAD_URL,
  COMPANY_YOUTUBE_URL,
  COMPANY_FAX_NUMBER,
  COMPANY_PHONE_NUMBER,
  COMPANY_INSTAGRAM_URL,
  COMPANY_NAVER_BLOG_URL,
  COMPANY_REPRESENTATIVE,
  COMPANY_BUSINESS_NUMBER,
  COMPANY_KAKAO_CHANNEL_URL,
} from './constants';
import { COLUMNS, findColumn } from './columns';

// canonical·og:url·JSON-LD가 공유하는 기준 도메인
export const SITE_URL = 'https://www.solutionhana.co.kr';

export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;

export interface PageSeo {
  title: string;
  description: string;
}

export const DEFAULT_SEO: PageSeo = {
  title: '(주)하나솔루션 - 태양광 에너지 솔루션',
  description: '전북 부안 기반 태양광 전문기업 (주)하나솔루션. 가정용 태양광, 자가용 PPA, 발전사업 RPS, RE100, 리파워링까지 설계·시공·유지보수를 수행합니다.',
};

export const PAGE_SEO: Record<string, PageSeo> = {
  '/': DEFAULT_SEO,

  '/about/introduction': {
    title: '회사소개 | (주)하나솔루션',
    description: '(주)하나솔루션은 전북 부안에 본사를 둔 태양광 에너지 전문기업입니다. 품질경영시스템 인증과 중소벤처기업 확인서를 보유하고 전기공사업 등록(서울-06429) 기반으로 시공합니다.',
  },
  '/about/location': {
    title: '오시는 길 | (주)하나솔루션',
    description: `(주)하나솔루션 본사 위치와 찾아오시는 길 안내. 주소 ${COMPANY_ADDRESS}, 대표번호 ${COMPANY_PHONE_NUMBER}.`,
  },

  '/business/solar-home': {
    title: '가정용 태양광 | (주)하나솔루션',
    description: '가정용 태양광은 주택 지붕·마당에 설치해 직접 생산한 전기를 우선 사용하고 남은 전력을 한전으로 역전송해 전기요금에서 차감하는 상계거래 방식입니다. 설치 조건과 절감 효과를 안내합니다.',
  },
  '/business/solar-parking': {
    title: '주차장 태양광 | (주)하나솔루션',
    description: '주차장 상부 유휴공간에 태양광 구조물을 설치해 발전 수익과 차량 보호 효과를 동시에 얻는 주차장 태양광 사업을 안내합니다.',
  },
  '/business/ppa': {
    title: '자가용 PPA | (주)하나솔루션',
    description: '자가소비형 PPA는 건물 지붕에 태양광 설비를 설치해 생산 전력을 사업장에서 우선 사용하고 잉여 전력을 판매하는 방식입니다. 초기 투자 부담 없이 전기요금을 절감할 수 있습니다.',
  },
  '/business/rps': {
    title: '발전사업 RPS | (주)하나솔루션',
    description: 'RPS는 태양광 발전 전력을 판매해 SMP와 REC 수익을 얻는 발전사업입니다. 유휴부지와 건물 지붕을 활용한 사업성 검토부터 인허가, 시공까지 지원합니다.',
  },
  '/business/re100': {
    title: 'RE100 | (주)하나솔루션',
    description: '기업이 사용하는 전력을 재생에너지로 전환하는 RE100 이행을 위한 태양광 설비 구축과 이행 수단을 안내합니다.',
  },
  '/business/re-powering': {
    title: '리파워링 | (주)하나솔루션',
    description: '노후 태양광 설비의 발전량 저하 원인을 진단하고 모듈·인버터 교체로 발전 효율을 회복하는 리파워링 절차와 기대 효과를 안내합니다.',
  },
  '/business/solar-cleaning': {
    title: '태양광 모듈 청소 | (주)하나솔루션',
    description: '먼지·황사·조류 배설물로 인한 태양광 모듈 오염은 발전량을 떨어뜨립니다. 전문 장비를 이용한 모듈 청소 방법과 발전량 회복 효과를 안내합니다.',
  },
  '/business/profit-calculator': {
    title: '예상 수익 계산기 | (주)하나솔루션',
    description: '설치 용량과 지역 조건을 입력해 태양광 발전 예상 수익과 전기요금 절감액을 계산해 보세요. SMP·REC 기준의 수익 구조를 함께 확인할 수 있습니다.',
  },

  '/portfolio/ppa': {
    title: 'PPA 시공사례 | (주)하나솔루션',
    description: '(주)하나솔루션이 수행한 자가소비형 PPA 태양광 시공사례입니다. 설치 현장과 용량별 실적을 확인하실 수 있습니다.',
  },
  '/portfolio/rps': {
    title: 'RPS 시공사례 | (주)하나솔루션',
    description: '(주)하나솔루션이 수행한 발전사업(RPS) 태양광 시공사례입니다. 지역별·용량별 발전소 구축 실적을 확인하실 수 있습니다.',
  },
  '/portfolio/residential': {
    title: '가정용 시공사례 | (주)하나솔루션',
    description: '(주)하나솔루션이 시공한 가정용(상계거래형) 태양광 설치 사례입니다. 주택 유형별 설치 모습을 확인하실 수 있습니다.',
  },
  '/portfolio/electrical-work': {
    title: '전기공사업 시공사례 | (주)하나솔루션',
    description: '(주)하나솔루션의 전기공사업 등록(서울-06429) 기반 전기설비 공사 수행 실적입니다.',
  },

  '/promotion/social-contribution': {
    title: '사회공헌 | (주)하나솔루션',
    description: '(주)하나솔루션이 지역사회와 함께한 사회공헌 활동과 나눔 사례를 소개합니다.',
  },
  '/promotion/column': {
    title: '칼럼 | (주)하나솔루션',
    description: '공장·축사 지붕 태양광 설치 방식과 가능 여부 등 태양광 설치 전에 많이 묻는 질문을 (주)하나솔루션이 쉽게 풀어 드립니다.',
  },
  ...Object.fromEntries(COLUMNS.map((column) => [
    `/promotion/column/${column.slug}`,
    { title: `${column.title} | 칼럼 | (주)하나솔루션`, description: column.description },
  ])),

  '/support/faq': {
    title: '자주 묻는 질문 | (주)하나솔루션',
    description: '태양광 설치 비용, 상계거래, PPA, RPS, 설치 기간 등 태양광 사업에 대해 가장 많이 묻는 질문과 답변을 모았습니다.',
  },
  '/support/notice': {
    title: '공지사항 | (주)하나솔루션',
    description: '(주)하나솔루션의 공지사항과 태양광 지원사업·제도 변경 소식을 전해드립니다.',
  },
  '/support/inquiry': {
    title: '견적문의 | (주)하나솔루션',
    description: `태양광 설치 상담과 무료 견적을 신청하세요. 대표번호 ${COMPANY_PHONE_NUMBER} 또는 온라인 문의로 접수하실 수 있습니다.`,
  },
};

// 공지사항 상세는 DB에서 불러온 제목·본문으로 메타데이터를 구성한다
export function buildNoticeSeo(title: string, contentText: string): PageSeo {
  const description = contentText.trim().replace(/\s+/g, ' ').slice(0, 160);

  return {
    title: `${title} | 공지사항 | (주)하나솔루션`,
    description: description || PAGE_SEO['/support/notice'].description,
  };
}

// PAGE_SEO에 없는 경로는 상위 경로로 거슬러 올라가며 탐색한다 (예: /support/notice/12 → /support/notice)
export function resolvePageSeo(pathname: string): PageSeo {
  const segments = pathname.replace(/\/+$/, '').split('/').filter(Boolean);

  for (let depth = segments.length; depth > 0; depth -= 1) {
    const candidate = `/${segments.slice(0, depth).join('/')}`;

    if (PAGE_SEO[candidate]) {
      return PAGE_SEO[candidate];
    }
  }

  return DEFAULT_SEO;
}

// 주소 상수의 '(본사)' 같은 접두 표기는 구조화 데이터에 넣지 않는다
const STREET_ADDRESS = COMPANY_ADDRESS.replace(/^\s*\([^)]*\)\s*/, '');

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: STREET_ADDRESS,
  addressCountry: 'KR',
};

// 기본값이 외부 URL이 아닌 소셜 링크(/preparation 등)는 sameAs에서 제외한다
const SOCIAL_PROFILE_URLS = [
  COMPANY_NAVER_BLOG_URL,
  COMPANY_KAKAO_CHANNEL_URL,
  COMPANY_YOUTUBE_URL,
  COMPANY_TIKTOK_URL,
  COMPANY_INSTAGRAM_URL,
  COMPANY_THREAD_URL,
].filter((url) => url.startsWith('http'));

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// 검색엔진·생성형 AI가 회사 엔티티를 식별하는 기준 노드
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: OG_IMAGE_URL,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE_NUMBER,
    faxNumber: COMPANY_FAX_NUMBER,
    taxID: COMPANY_BUSINESS_NUMBER,
    address: POSTAL_ADDRESS,
    employee: {
      '@type': 'Person',
      name: COMPANY_REPRESENTATIVE,
      jobTitle: '대표',
    },
    sameAs: SOCIAL_PROFILE_URLS,
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/about/location#localbusiness`,
    name: COMPANY_NAME,
    url: `${SITE_URL}/about/location`,
    image: OG_IMAGE_URL,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE_NUMBER,
    address: POSTAL_ADDRESS,
    parentOrganization: { '@id': ORGANIZATION_ID },
  };
}

export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/support/faq#faqpage`,
    mainEntity: FAQ_ITEMS.filter((item) => item.isVisible).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// 칼럼 상세 경로(/promotion/column/<slug>)의 글을 Article 노드로 만든다
function buildColumnArticleJsonLd(pathname: string) {
  const column = findColumn(pathname.match(/^\/promotion\/column\/([^/]+)\/?$/)?.[1]);

  if (!column) {
    return undefined;
  }

  const url = `${SITE_URL}/promotion/column/${column.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: column.title,
    description: column.description,
    datePublished: column.publishedAt,
    url,
    mainEntityOfPage: url,
    image: OG_IMAGE_URL,
    inLanguage: 'ko-KR',
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function resolveJsonLd(pathname: string) {
  const nodes: object[] = [buildOrganizationJsonLd()];

  if (pathname === '/about/location') {
    nodes.push(buildLocalBusinessJsonLd());
  }

  if (pathname === '/support/faq') {
    nodes.push(buildFaqJsonLd());
  }

  const columnArticle = buildColumnArticleJsonLd(pathname);

  if (columnArticle) {
    nodes.push(columnArticle);
  }

  return nodes;
}
