// 상호명
export const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME as string || "㈜하나솔루션";

// 대표자
export const COMPANY_REPRESENTATIVE = import.meta.env.VITE_COMPANY_REPRESENTATIVE as string || "문서준";

// 사업자번호
export const COMPANY_BUSINESS_NUMBER = import.meta.env.VITE_COMPANY_BUSINESS_NUMBER as string || "372-88-03574";

// 전기공사업번호
export const COMPANY_ELECTRIC_BUSINESS_NUMBER = import.meta.env.VITE_COMPANY_ELECTRIC_BUSINESS_NUMBER as string || "서울-06429";

// 주소
// export const COMPANY_ADDRESS = import.meta.env.VITE_COMPANY_ADDRESS as string || "(본사) 전북특별자치도 부안군 부안읍 동중길 20";
export const COMPANY_ADDRESS = import.meta.env.VITE_COMPANY_ADDRESS as string || "(본사) 전북특별자치도 부안군 행안면 매창로 15-1";

// 대표번호
export const COMPANY_PHONE_NUMBER = import.meta.env.VITE_COMPANY_PHONE_NUMBER as string || "1577-1497";

// 팩스번호
export const COMPANY_FAX_NUMBER = import.meta.env.VITE_COMPANY_FAX_NUMBER as string || "0504-427-5924";

// 이메일
export const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL as string || "hnsolution1116@naver.com";

// 카카오톡 채널 URL
export const COMPANY_KAKAO_CHANNEL_URL = import.meta.env.VITE_COMPANY_KAKAO_CHANNEL_URL as string || "https://pf.kakao.com/_KvpIX";

// 카카오톡 채널톡 URL
export const COMPANY_KAKAO_CHAT_URL = import.meta.env.VITE_COMPANY_KAKAO_CHAT_URL as string || "https://pf.kakao.com/_KvpIX/chat";

// 네이버 블로그 URL
export const COMPANY_NAVER_BLOG_URL = import.meta.env.VITE_COMPANY_NAVER_BLOG_URL as string || "https://blog.naver.com/hanasolution__";

// 틱톡 URL
export const COMPANY_TIKTOK_URL = import.meta.env.VITE_COMPANY_TIKTOK_URL as string || "https://www.tiktok.com/@hanasolution_solar";

// 유튜브 URL
export const COMPANY_YOUTUBE_URL = import.meta.env.VITE_COMPANY_YOUTUBE_URL as string || "https://www.youtube.com/@hanasolution_solar";

// 스레드 URL
export const COMPANY_THREAD_URL = import.meta.env.VITE_COMPANY_THREAD_URL as string || "https://www.threads.com/@hanasolution_solar";

// 인스타그램 URL
export const COMPANY_INSTAGRAM_URL = import.meta.env.VITE_COMPANY_INSTAGRAM_URL as string || "https://www.instagram.com/hanasolution_solar/";

// 헤더 메뉴
export const HEADER_MENU = [
  {
    name: "기업정보",
    path: "/about",
    childMenu: [
      { name: "회사소개", path: "/about/introduction" },
      { name: "오시는 길", path: "/about/location" },
    ],
  },
  {
    name: "사업소개",
    path: "/business",
    childMenu: [
      { name: "가정용태양광", path: "/business/solar-home" },
      { name: "주차장태양광", path: "/business/solar-parking" },
      { name: "자가용PPA", path: "/business/ppa" },
      { name: "발전사업RPS", path: "/business/rps" },
      { name: "RE100", path: "/business/re100" },
      { name: "리파워링", path: "/business/re-powering" },
      { name: "태양광모듈청소", path: "/business/solar-cleaning" },
      { name: "예상 수익계산기", path: "/business/profit-calculator" },
    ],
  },
  {
    name: "시공사례",
    path: "/portfolio",
    childMenu: [
      { name: "PPA(자가소비형)", path: "/portfolio/ppa" },
      { name: "RPS(발전사업)", path: "/portfolio/rps" },
      { name: "가정용(상계거래형)", path: "/portfolio/residential" },
      { name: "전기공사업", path: "/portfolio/electrical-work" },
    ],
  },
  {
    name: "홍보센터",
    path: "/promotion",
    childMenu: [
      { name: "사회공헌", path: "/promotion/social-contribution" },
      { name: "칼럼", path: "/promotion/column" },
      { name: "유튜브", path: COMPANY_YOUTUBE_URL },
      { name: "틱톡", path: COMPANY_TIKTOK_URL },
      { name: "블로그", path: COMPANY_NAVER_BLOG_URL },
    ],
  },
  {
    name: "고객센터",
    path: "/support",
    childMenu: [
      { name: "자주묻는질문", path: "/support/faq" },
      { name: "공지사항", path: "/support/notice" },
      { name: "견적문의", path: "/support/inquiry" },
    ],
  },
];

/**---------------------------------------- 메인 페이지 히어로 섹션 ----------------------------------------**/

// 메인 페이지 배경 이미지
export const HERO_BACKGROUND_IMAGES = [
  { image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1920&q=90" },
  { image: "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?auto=format&fit=crop&w=1920&q=90" },
  { image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&w=1920&q=90" },
  { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=90" },
];

// 메인 페이지 배경 이미지 페이드 시간
export const FADE_DURATION_MS = 2000;

// 메인 페이지 배경 이미지 슬라이드 인터벌
export const SLIDE_INTERVAL_MS = 5000;

/**---------------------------------------- 메인 페이지 히어로 섹션 ----------------------------------------**/

// 서브 페이지 정보
export const SUB_HERO_INFO = [
  { 
    pathname: "/about",
    title: "회사소개",
    subtitle: "About Us",
    image: "https://images.unsplash.com/photo-1614366502473-e54666693b44?auto=format&fit=crop&w=1920&q=90", 
  },
  { 
    pathname: "/business", 
    title: "사업소개", 
    subtitle: "Business Introduction", 
    image: "https://images.unsplash.com/photo-1707247111552-aaf74241058b?auto=format&fit=crop&w=1920&q=90" 
  },
  { 
    pathname: "/promotion", 
    title: "홍보센터", 
    subtitle: "Promotion", 
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1920&q=90" 
  },
  { pathname: "/support", 
    title: "고객센터", 
    subtitle: "Customer Support", 
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop&w=1920&q=80" 
  },
  { pathname: "/portfolio", 
    title: "시공사례", 
    subtitle: "Business Performance", 
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1074&auto=format&fit=crop&w=1920&q=90" 
  },
];

import { FAQ } from '@/types/common';

// 자주묻는질문 아이템 리스트
export const FAQ_ITEMS: FAQ[] = [
  {
    id: 1,
    question: "태양광이란 무엇인가요?",
    answer: "태양광은 태양의 빛 에너지를 이용해 전기를 생산하는 친환경 발전 시스템입니다. 태양광 사업은 가정용 태양광(상계거래), 자가소비형 PPA, 발전사업(RPS) 등으로 나뉘며 각 사업 유형에 따라 설치 비용 및 소요 기간이 상이할 수 있습니다.",
    isVisible: true,
  },
  {
    id: 2,
    question: "가정용 태양광이 무엇인가요?",
    answer: "가정용 태양광은 우리 집(지붕,마당 등)에 설치된 태양광 설비로 전기를 직접 생산하여 우선 사용하고, 남은 전력은 한전으로 역전송되어 다음 달 전기요금에서 차감되는 구조입니다. 전력이 계속 남을 경우 다음 달로 이월되어 장기적으로 전기요금 부담을 줄이는 효과가 있습니다.",
    isVisible: true,
  },
  {
    id: 3,
    question: "PPA가 무엇인가요?",
    answer: "자가소비형 PPA는 건물 지붕 등에 태양광 설비를 설치하여 생산된 전기를 해당 사업장에서 우선 사용하고, 남는 전력은 판매하여 추가 수익을 창출하는 방식입니다. 즉, 전기요금 절감과 발전 수익을 동시에 기대할 수 있는 구조입니다.",
    isVisible: true,
  },
  {
    id: 4,
    question: "RPS가 무엇인가요?",
    answer: "RPS(신재생에너지 공급의무화 제도)는 태양광 설비로 생산한 전력을 판매하여 SMP(전력 판매대금)와 REC 수익을 창출하는 발전사업 방식입니다. 사업장 내 유휴부지나 건물 지붕을 활용해 전기 사용 여부와 관계없이 장기적인 수익 창출이 가능합니다.",
    isVisible: true,
  },
  {
    id: 5,
    question: "SMP란?",
    answer: "태양광으로 생산된 전기를 한국전력 전력망을 통해 전력거래소 전력시장에 판매하고 전기 판매대금을 매월 정산받는 수익입니다.",
    isVisible: true,
  },
  {
    id: 6,
    question: "REC란?",
    answer: "태양광 발전 시 발급되는 신재생에너지 인증서로, RPS 의무가 있는 발전사에 별도로 판매하여 추가 수익 창출이 가능합니다.",
    isVisible: true,
  },
  {
    id: 7,
    question: "태양광을 설치하는데 조건이 필요한가요?",
    answer: "태양광 설치를 위해서는 몇 가지 설치 조건 확인이 필요합니다. 태양광 설치 조건은 여러 가지가 있지만 가장 우선적으로 확인해야 할 부분은 한전 선로 확보 여부입니다. 모든 태양광은 생산된 전기를 전력망으로 송전해야 하기 때문에 계통 연계 가능 여부에 따라 설치 가능 용량 및 사업 진행 여부가 결정될 수 있습니다.",
    isVisible: true,
  },
];

export const BUSINESS_ITEMS = [
  {
    id: 1,
    title: "자가용 PPA",
    subtitle: "Power Purchase Agreement",
    description:
      "태양광 설비를 통해 생산된 전기를 건물에서 우선 사용하고, 남는 전력은 판매하여 수익을 창출하는 전력 활용 방식입니다.",
    image: "https://images.unsplash.com/photo-1552197892-f2ad2f75e7c8?auto=format&fit=crop&w=1920&q=90",
    accent: "#2980B9",
    href: "/business/ppa",
  },
  {
    id: 2,
    title: "K-RE100",
    subtitle: "Renewable Electricity 100%",
    description:
      "한국형 RE100 정책을 기반으로 맞춤형 컨설팅부터 구축, 운영까지 통합 에너지 솔루션을 제공합니다.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=90",
    accent: "#27AE60",
    href: "/business/re100",
  },
  {
    id: 3,
    title: "태양광 리파워링",
    subtitle: "Re-Powering",
    description:
      "저효율·노후 설비를 최신 기술로 교체해 발전량 증가와 유지보수 비용 절감을 동시에 실현합니다.",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1920&q=90",
    accent: "#F1C40F", 
    href: "/business/re-powering",
  },  
  {
    id: 4,
    title: "발전사업 RPS",
    subtitle: "Renewable Portfolio Standard",
    description:
      "정부의 의무공급제도에 따라 형성된 REC 시장을 통해 태양광 발전의 수익성을 지원합니다.",
    image: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1920&q=90",
    accent: "#E67E22",
    href: "/business/rps",
  },
]

// 견적문의 - 개인정보 수집·이용 동의 테이블 행
export const PRIVACY_TABLE_ROWS = [
  {
    items: '이메일, 전화번호, 주소, 문의 내용',
    purpose: '고객 문의 사항 처리 및 응대, 회사 제품 및 서비스 정보 제공',
    period: '3년',
  },
]

import blog from '@/assets/images/social/blog.png';
import instagram from '@/assets/images/social/instagram.png';
import kakao from '@/assets/images/social/kakao.png';
import thread from '@/assets/images/social/thread.png';
import tiktok from '@/assets/images/social/tiktok.png';
import youtube from '@/assets/images/social/youtube.png';

// Floating Action Button
export const PROMOTION_NAV_LINKS = [
  { name: '유튜브', image: youtube, url: COMPANY_YOUTUBE_URL },
  { name: '틱톡', image: tiktok, url: COMPANY_TIKTOK_URL },
  { name: '블로그', image: blog, url: COMPANY_NAVER_BLOG_URL },
  { name: '카카오톡', image: kakao, url: COMPANY_KAKAO_CHAT_URL },
  { name: '스레드', image: thread, url: COMPANY_THREAD_URL },
  { name: '인스타그램', image: instagram, url: COMPANY_INSTAGRAM_URL },
];

// Supabase
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
export const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

// Naver
export const MAP_NAVER_API_URL = import.meta.env.VITE_NAVER_MAP_URL as string;

// 중소기업 인증 이미지
import ventureCompany from '@/assets/images/cert/중소벤처기업_확인서.jpg';
// 품질경영 인증 이미지
import qualityManagement from '@/assets/images/cert/품질경영시스템_인증서.jpg';
// 생산물배상책임보험 증명 이미지 1
import productionLiabilityInsurance1 from '@/assets/images/cert/생산물배상책임보험_가입증명서_라이나_1.jpg';
// 생산물배상책임보험 증명 이미지 2
import productionLiabilityInsurance2 from '@/assets/images/cert/생산물배상책임보험_가입증명서_라이나_2.jpg';
// 생산물배상책임보험 증명 이미지 3
import productionLiabilityInsurance3 from '@/assets/images/cert/생산물배상책임보험_가입증명서_현대해상.jpg';

export const CERT_IMAGES = [
  { 
    name: '중소벤처기업 확인서',
    image: ventureCompany 
  },
  { 
    name: '품질경영시스템 인증서',
    image: qualityManagement 
  },
  { 
    name: '생산물배상책임보험 가입증명서 라이나손해보험',
    image: productionLiabilityInsurance1 
  },
  { 
    name: '생산물배상책임보험 가입증명서 라이나손해보험',
    image: productionLiabilityInsurance2 
  },
  { 
    name: '생산물배상책임보험 가입증명서 현대해상',
    image: productionLiabilityInsurance3 
  },
];