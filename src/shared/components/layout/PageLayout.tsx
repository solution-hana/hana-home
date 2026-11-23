import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import Header from '@/shared/components/header';
import Footer from '@/shared/components/footer';
import SubHero from '@/shared/components/sub/SubHero';
import FloatingActionButton from '@/shared/components/fab';

import { useSeo } from '@/shared/hooks/useSeo';
import { trackNaverAdPageView } from '@/shared/utils/naverAd';

interface PageLayoutProps {
  children: React.ReactNode;
  showSubHero?: boolean;
}

export default function PageLayout({ children, showSubHero = true }: PageLayoutProps) {
  const location = useLocation();

  useSeo();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // 네이버 검색광고 공통 스크립트: 주소가 바뀔 때마다 페이지 열람을 한 번 보낸다
  useEffect(() => {
    void trackNaverAdPageView();
  }, [location.pathname]);

  return (
    <Flex minH="100dvh" direction="column">
      <Header />
      {showSubHero && <SubHero />}
      <Box as="main" flex="1" display="flex" flexDirection="column">
        {children}
      </Box>
      <Footer />
      <FloatingActionButton />
    </Flex>
  );
}
