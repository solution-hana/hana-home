import { useEffect, useState } from 'react';

import { Box, Flex, Group, Stack } from '@chakra-ui/react';

import { Region } from '@/types/common';

import { RecMonthlyItem } from '@/types/rec';
import { SmpDailyWeightedSummary } from '@/types/smp';

import { useResponsive } from '@/shared/hooks/useResponsive';
import { Impactor } from '@/shared/components/common/Impactor';
import { useMonthlyRec } from '@/shared/hooks/useRec';
import { useWeeklySmp } from '@/shared/hooks/useSmp';

import { SmpMarketPrice } from './components/SmpMarketPrice';
import { RecMarketPrice } from './components/RecMarketPrice';
import { SmpRecSumPrice } from './components/SmpRecSumPrice';
import { SmpWeeklyChart } from './components/SmpWeeklyChart';
import { RecMonthlyChart } from './components/RecMonthlyChart';
import { InSightHeadDesktop, InSightHeadMobile } from './components/InSightHead';

export default function Insight() {
  const { isDesktop } = useResponsive();
  
  // 주간 SMP 데이터
  const { data: weeklySmpData } = useWeeklySmp() as { data: SmpDailyWeightedSummary[] };
  
  // 월간 REC 데이터
  const { data: monthlyRecData } = useMonthlyRec() as { data: RecMonthlyItem[] };

  const [region, setRegion] = useState<Region>('LAND');
  
  // 가장 최근 날짜 SMP 데이터
  const [latestSmpData, setLatestSmpData] = useState<SmpDailyWeightedSummary | undefined>(undefined);
  // 가장 최근 날짜 이전 날짜 SMP 데이터
  const [previousSmpData, setPreviousSmpData] = useState<SmpDailyWeightedSummary | undefined>(undefined);

  // 가장 최근 날짜 REC 데이터
  const [latestRecData, setLatestRecData] = useState<RecMonthlyItem | undefined>(undefined);
  // 가장 최근 날짜 이전 날짜 REC 데이터
  const [previousRecData, setPreviousRecData] = useState<RecMonthlyItem | undefined>(undefined);


  // SMP: 가장 최근 날짜 데이터와 그 전 날짜 데이터만 추출
  useEffect(() => {
    if (weeklySmpData && weeklySmpData.length > 0) {
      setLatestSmpData(weeklySmpData.find((data) => data.date === weeklySmpData[weeklySmpData.length - 1].date));
      setPreviousSmpData(weeklySmpData.find((data) => data.date === weeklySmpData[weeklySmpData.length - 2]?.date));
    }
  }, [weeklySmpData])

  // REC: 가장 최근 날짜 데이터와 그 전 날짜 데이터만 추출
  useEffect(() => {
    if (monthlyRecData && monthlyRecData.length > 0) {
      setLatestRecData(monthlyRecData.find((data) => data.date === monthlyRecData[0].date));
      setPreviousRecData(monthlyRecData.find((data) => data.date === monthlyRecData[1]?.date));
    }
  }, [monthlyRecData])
  
  return (
    <Box
      width="100%"
      height="100%"
      bg="transparent"
      mx="auto"
      my={8}
      py={{ base: "48px", md: "80px" }}
      px={{ base: 4, md: 8 }}
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Flex width="100%" maxW="1280px" flexDirection="column" gap={8}>
        {/* 헤더 영역 */}
        <Impactor direction="bottom" once>
          <Box px={8}>
            {isDesktop ? <InSightHeadDesktop region={region} setRegion={setRegion} /> : <InSightHeadMobile region={region} setRegion={setRegion} />}
          </Box>
        </Impactor>

        {/* 콘텐츠 영역 */}
        <Stack width='100%' px={isDesktop ? 8 : 0} mt={4} gap={8}>
          {/* 실시간 가격 동향 */}
          <Group
            display='flex'
            flexDirection={isDesktop ? 'row' : 'column'}
            alignItems='stretch'
            justifyContent='stretch'
            gap={8}
            width='100%'
            flexWrap='nowrap'
          >
            {/* SMP 시세 */}
            <Box flex={isDesktop ? 1 : undefined} minWidth={0} width={isDesktop ? undefined : '100%'}>
              <Impactor direction="bottom" once>
                <SmpMarketPrice region={region} latestSmpData={latestSmpData!} previousSmpData={previousSmpData!} />
              </Impactor>
            </Box>

            {/* REC 현물 시세 */}
            <Box flex={isDesktop ? 1 : undefined} minWidth={0} width={isDesktop ? undefined : '100%'}>
              <Impactor direction="bottom" once delay={1}>
                <RecMarketPrice region={region} latestRecData={latestRecData!} previousRecData={previousRecData!} />
              </Impactor>
            </Box>

            {/* SMP + (REC/1000 x 가중치) 수익 합계 */}
            <Box flex={isDesktop ? 1 : undefined} minWidth={0} width={isDesktop ? undefined : '100%'}>
              <Impactor direction="bottom" once delay={1.3}>
                <SmpRecSumPrice region={region} smpData={latestSmpData!} recData={latestRecData!} />
              </Impactor>
            </Box>
          </Group>

          <Group
            display='flex'
            flexDirection={isDesktop ? 'row' : 'column'}
            alignItems='stretch'
            justifyContent='stretch'
            gap={8}
            width='100%'
            flexWrap='nowrap'
          >
            {/* SMP 주간 추이 차트 */}
            <Box flex={isDesktop ? 1 : undefined} minWidth={0} width={isDesktop ? undefined : '100%'}>
              <Impactor direction="bottom" once>
                <SmpWeeklyChart region={region} data={weeklySmpData!} />
              </Impactor>
            </Box>

            {/* REC 현물 월간 추이 차트 */}
            <Box flex={isDesktop ? 1 : undefined} minWidth={0} width={isDesktop ? undefined : '100%'}>
              <Impactor direction="bottom" once delay={1}>
                <RecMonthlyChart region={region} data={monthlyRecData!} />
              </Impactor>
            </Box>
          </Group>
        </Stack>
      </Flex>
    </Box>
  );
}