import { Button, Flex } from '@chakra-ui/react';

import { useResponsive } from '@/shared/hooks/useResponsive';

import { SubNavbarDesktop, SubNavbarMobile } from '@/shared/components/sub/SubNavbar';

import PortfolioContents from './components/PortfolioContents';
import PortfolioElectrical from './components/PortfolioElectrical';

const navItems: { name: string, path: string }[] = [
  { name: 'PPA(자가소비형)', path: '/portfolio/ppa' },
  { name: 'RPS(발전사업)', path: '/portfolio/rps' },
  { name: '가정용(상계거래형) 태양광', path: '/portfolio/residential' },
  { name: '전기공사업', path: '/portfolio/electrical-work' },
];

interface PortfolioProps {
  type: 'ppa' | 'rps' | 'residential' | 'electrical-work';
}

export default function Portfolio(props: PortfolioProps) {
  const { type } = props;
  const { isDesktop } = useResponsive();

  const handleClick = () => {
    // 블로그 PPA 이동
    if (type === 'ppa') {
      window.open('https://blog.naver.com/hanasolution__/224237999037', '_blank', 'noopener,noreferrer');
    }

    // 블로그 RPS 이동
    if (type === 'rps') {
      window.open('https://blog.naver.com/hanasolution__/224234163099', '_blank', 'noopener,noreferrer');
    }

    // 블로그 가정용(상계거래형) 이동
    if (type === 'residential') {
      window.open('https://blog.naver.com/hanasolution__/224206483822', '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <Flex flex="1" width="100%" direction="column">
      <Flex 
        mb={12}
        gap={12}
        width="100%"
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        {isDesktop ? <SubNavbarDesktop type={type} items={navItems} /> : <SubNavbarMobile type={type} items={navItems} />}
        {type === 'ppa' && <PortfolioContents isDesktop={isDesktop} type={type} />}
        {type === 'rps' && <PortfolioContents isDesktop={isDesktop} type={type} />}
        {type === 'residential' && <PortfolioContents isDesktop={isDesktop} type={type} />}
        {type === 'electrical-work' && <PortfolioElectrical />}
      </Flex> 
    
      {type !== 'electrical-work' && (
        <Flex
          py={24}
          width="100%"
          alignItems="center"
          justifyContent="center"
          backgroundColor="gray.800"
        >
          <Button
            px={12}
            py={8}
            size='xl'
            shadow='xl'
            bg='green.500'
            color='white'
            fontSize='xl'
            fontWeight='bold'
            borderRadius='full'
            fontFamily='NanumSquareNeo'
            transition='all 0.3s ease-in-out'
            _hover={{ transform: 'translateY(-3px)', bg: 'green.600' }}
            onClick={handleClick}
          >
            <span>시공사례 더보기</span>
          </Button>
        </Flex>
      )}
    </Flex>
  )
}