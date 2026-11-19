import { Flex } from '@chakra-ui/react';

import { useResponsive } from '@/shared/hooks/useResponsive';
import { SubNavbarDesktop, SubNavbarMobile } from '@/shared/components/sub/SubNavbar';

import ColumnList from '@/domains/promotion/components/ColumnList';
import ColumnDetail from '@/domains/promotion/components/ColumnDetail';
import NewsList from '@/domains/promotion/components/NewsList';
import NewsDetail from '@/domains/promotion/components/NewsDetail';
import SocialContribution from '@/domains/promotion/components/SocialContribution';

const navItems: { name: string, path: string }[] = [
  { name: '사회공헌', path: '/promotion/social-contribution' },
  { name: '태양광 정보', path: '/promotion/column' },
  { name: '태양광 뉴스', path: '/promotion/news' },
];

interface PromotionProps {
  type: 'social-contribution' | 'column' | 'news';
  id?: string;
}

export default function Promotion(props: PromotionProps) {
  const { type, id } = props;
  const { isDesktop } = useResponsive();
  return (
    <Flex 
      flex="1"
      width="100%"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      {isDesktop ? <SubNavbarDesktop type={type} items={navItems} /> : <SubNavbarMobile type={type} items={navItems} />}
      {type === 'social-contribution' && <SocialContribution />}
      {type === 'column' && (id ? <ColumnDetail slug={id} /> : <ColumnList />)}
      {type === 'news' && (id ? <NewsDetail slug={id} /> : <NewsList />)}
    </Flex>
  );
}