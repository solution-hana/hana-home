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
  '/promotion/column/agrivoltaics-special-act-before-enforcement',
  '/promotion/column/agricultural-promotion-area-agrivoltaics',
  '/promotion/column/net-metering-over-10kw-surplus-settlement',
  '/promotion/column/what-is-smp',
  '/promotion/column/what-is-rec',
  '/promotion/column/install-cost-per-kw',
  '/promotion/column/how-to-read-solar-quote',
  '/promotion/column/how-to-choose-solar-installer',
  '/promotion/column/warehouse-roof-solar-conditions',
  '/promotion/column/parking-lot-canopy-solar',
  '/promotion/column/farmland-conversion-solar-procedure',
  '/promotion/column/forest-land-solar-temporary-use-permit',
  '/promotion/column/kepco-grid-connection-check',

  '/support/faq',
  '/support/notice',
  '/support/inquiry',
];

// 색인 대상은 아니지만 직접 접근 시 404가 되면 안 되는 경로
export const UNLISTED_ROUTES = ['/preparation'];

// 공개된 공지사항 상세 경로를 DB에서 조회한다
export async function fetchNoticeRoutes(supabaseUrl, supabaseKey) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('posts')
    .select('id')
    .eq('category', 'NOTICE')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`공지사항 경로 조회 실패: ${error.message}`);
  }

  return data.map((post) => `/support/notice/${post.id}`);
}
