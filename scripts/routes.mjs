import fs from 'node:fs';

import { createClient } from '@supabase/supabase-js';

/**
 * 프리렌더와 sitemap이 공유하는 경로 목록.
 * 각 페이지 컴포넌트가 허용하는 :type 값과 일치해야 한다.
 */
export const CONTENT_ROUTES = [
  '/',

  '/about/introduction',
  '/about/location',

  '/business/solar-home',
  '/business/solar-parking',
  '/business/ppa',
  '/business/rps',
  '/business/re100',
  '/business/re-powering',
  '/business/solar-cleaning',
  '/business/profit-calculator',

  '/portfolio/ppa',
  '/portfolio/rps',
  '/portfolio/residential',
  '/portfolio/electrical-work',

  '/promotion/social-contribution',
  // 태양광 정보 상세 경로는 src/shared/config/columns.ts 의 slug와 일치해야 한다
  '/promotion/column',
  '/promotion/column/factory-roof-direct-vs-lease',
  '/promotion/column/livestock-roof-asbestos-slate',
  '/promotion/column/factory-roof-electricity-bill-savings',
  '/promotion/column/factory-roof-install-conditions',
  '/promotion/column/roof-lease-rent-factors',
  '/promotion/column/livestock-roof-by-animal-type',
  '/promotion/column/livestock-asbestos-slate-removal-support',
  '/promotion/column/farmland-solar-install-conditions',
  '/promotion/column/what-is-smp',
  '/promotion/column/what-is-rec',
  '/promotion/column/install-cost-per-kw',
  '/promotion/column/how-to-read-solar-quote',
  '/promotion/column/how-to-choose-solar-installer',
  '/promotion/column/warehouse-roof-solar-conditions',
  '/promotion/column/parking-lot-canopy-solar',
  '/promotion/column/farmland-conversion-solar-procedure',
  '/promotion/column/kepco-grid-connection-check',
  '/promotion/column/net-metering-surplus-power-settlement',
  '/promotion/column/forest-land-solar-temporary-use-permit',

  // 태양광 뉴스 상세 경로는 src/shared/config/news.ts 의 slug와 일치해야 한다
  '/promotion/news',
  '/promotion/news/roof-solar-fall-warning-safety-subsidy',
  '/promotion/news/grid-innovation-honam-substation-release',
  '/promotion/news/hanasolution-iso9001-certification',

  '/support/faq',
  '/support/notice',
  '/support/inquiry',
];

// sitemap 에 넣지 않을 경로. 빌드 산출물의 html 은 자동 수집되므로,
// public/ 에 둔 구글 소유확인 파일이 확장자 없는 주소(404)로 들어가지 않게 뺀다.
export const SITEMAP_EXCLUDE = ['/googlec6f6252f97816075'];

// 글이 아닌 일반 페이지의 sitemap lastmod. 일반 페이지 내용을 바꾼 날에 고쳐 적는다.
// (적지 않으면 플러그인이 모든 주소에 빌드 시각을 찍어 lastmod 가 전부 같아진다)
export const STATIC_LASTMOD = '2026-11-19';

// 태양광 정보·뉴스 글의 slug 별 게시일(publishedAt)을 설정 파일에서 읽는다
function readPublishedDates(file) {
  const text = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
  const dates = {};
  // slug 뒤에 처음 나오는 publishedAt 이 그 글의 게시일이다
  for (const match of text.matchAll(/slug:\s*'([^']+)'[\s\S]*?publishedAt:\s*'(\d{4}-\d{2}-\d{2})'/g)) {
    dates[match[1]] = match[2];
  }
  return dates;
}

function latest(dates) {
  return dates.reduce((a, b) => (a > b ? a : b));
}

/**
 * sitemap lastmod 를 경로별로 만든다.
 * - 글 상세: 그 글의 게시일
 * - 글 목록: 가장 최근 글의 게시일
 * - 공지사항 상세: 작성일(notices: fetchNotices 의 결과)
 * - 그 외: STATIC_LASTMOD
 */
export function buildLastmod(notices = []) {
  const lastmod = { '*': new Date(STATIC_LASTMOD) };

  const sections = [
    ['/promotion/column', '../src/shared/config/columns.ts'],
    ['/promotion/news', '../src/shared/config/news.ts'],
  ];

  for (const [base, file] of sections) {
    const dates = readPublishedDates(file);

    for (const route of CONTENT_ROUTES.filter((r) => r.startsWith(`${base}/`))) {
      const date = dates[route.slice(base.length + 1)];
      if (!date) {
        throw new Error(`sitemap lastmod: ${route} 의 publishedAt 을 찾지 못했습니다`);
      }
      lastmod[route] = new Date(date);
    }

    const all = Object.values(dates);
    if (all.length > 0) {
      lastmod[base] = new Date(latest([...all, STATIC_LASTMOD]));
    }
  }

  for (const notice of notices) {
    const parsed = new Date(notice.createdAt);
    if (notice.createdAt && !Number.isNaN(parsed.getTime())) {
      lastmod[notice.route] = parsed;
    }
  }

  return lastmod;
}

// 색인 대상은 아니지만 직접 접근 시 404가 되면 안 되는 경로
export const UNLISTED_ROUTES = ['/preparation'];

// 공개된 공지사항 상세 경로와 작성일을 DB에서 조회한다
export async function fetchNotices(supabaseUrl, supabaseKey) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('posts')
    .select('id, created_at')
    .eq('category', 'NOTICE')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`공지사항 경로 조회 실패: ${error.message}`);
  }

  return data.map((post) => ({ route: `/support/notice/${post.id}`, createdAt: post.created_at }));
}

// 공개된 공지사항 상세 경로만 필요할 때 쓴다(프리렌더)
export async function fetchNoticeRoutes(supabaseUrl, supabaseKey) {
  const notices = await fetchNotices(supabaseUrl, supabaseKey);

  return notices.map((notice) => notice.route);
}
