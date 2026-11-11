import { useEffect, useState } from 'react';

import { Box, createListCollection, Flex, Grid, Heading, Text } from '@chakra-ui/react';

import { RecMonthlyItem } from '@/types/rec';
import { SmpDailyWeightedSummary } from '@/types/smp';

import { calcProfit } from '@/domains/business/profit/hooks/useProfit';
import { ProfitConditon } from '@/domains/business/profit/ProfitConditon';
import { ProfitAnalysis } from '@/domains/business/profit/ProfitAnalysis';

import { useWeeklySmp } from '@/shared/hooks/useSmp';
import { useMonthlyRec } from '@/shared/hooks/useRec';
import { formatManUnit } from '@/shared/utils/number';
import { useAddressToLocation } from '@/shared/hooks/useMap';
import { Impactor } from '@/shared/components/common/Impactor';

const areaType = createListCollection({
  items: [
    { value: 'land', label: '토지' },
    { value: 'building', label: '건물' },
  ]
});

export interface ProfitValues {
  address: string;
  areaType: { value: string; label: string };
  capacity: number;
  constructionCost: number;
  recPrice: number;
  smpPrice: number;
  loanRate: number;
  loanInterestRate: number;
  generationTime: number;
  rateOfReturn: number;
  monthlyProfit: number;
  annualProfit: number;
  latitude: number;
  longitude: number;
  roadAddress: string;
  jibunAddress: string;
}

const initialValues: ProfitValues = {
  address: '',
  areaType: areaType.items[0],
  capacity: 0,
  // 공사비 (고정값)
  constructionCost: 1100000,
  // REC 가격 (실시간)
  recPrice: 0,
  // SMP 가격 (실시간)
  smpPrice: 0,
  // 대출 비율 (미사용)
  loanRate: 0,
  // 대출 이자율 (미사용)
  loanInterestRate: 0,
  // 발전 시간 (고정값)
  generationTime: 3.6,
  // 수익률
  rateOfReturn: 0,
  // 월간 수익
  monthlyProfit: 0,
  // 연간 수익
  annualProfit: 0,
  // 좌표
  latitude: 37.5665,
  longitude: 126.9780,
  roadAddress: '',
  jibunAddress: '',
}

export default function ProfitCalculator() {
  const [values, setValues] = useState(initialValues);

  // 주간 SMP 데이터
  const { data: weeklySmpData } = useWeeklySmp() as { data: SmpDailyWeightedSummary[] };
  
  // 월간 REC 데이터
  const { data: monthlyRecData } = useMonthlyRec() as { data: RecMonthlyItem[] };

  // 마운트 시 초기값 설정
  useEffect(() => {
    setValues(initialValues);
  }, []);

  // SMP·REC 데이터 로드 시 가격 반영
  useEffect(() => {
    if (weeklySmpData?.length && monthlyRecData?.length) {
      setValues((prev) => ({
        ...prev,
        smpPrice: weeklySmpData[weeklySmpData.length - 1].totalWeightedAvg,
        recPrice: monthlyRecData[0].unifiedAvgPrice / 1000,
      }));
    }
  }, [weeklySmpData, monthlyRecData]);

  // 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === 'capacity' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  // 사업지유형 변경 핸들러
  const handleAreaTypeChange = (item: { value: string; label: string }) => {
    setValues((prev) => ({ ...prev, areaType: item }));
  };

  // 주소 좌표 조회 훅
  const { mutateAsync: addressToLocation, isPending: isAddressToLocationPending } = useAddressToLocation();
  
  // 주소 좌표 조회 핸들러
  const handleAddressToLocation = async (address: string) => {
    const data = await addressToLocation(address);
    setValues((prev) => ({
      ...prev,
      longitude: data.longitude,
      latitude: data.latitude,
      roadAddress: data.roadAddress ?? '',
      jibunAddress: data.jibunAddress ?? '',
    }));
  }

  // 수익 계산 핸들러
  const handleCalculateProfit = async (address: string) => {
    // 주소 좌표 조회
    await handleAddressToLocation(address);

    // 예상 수익 계산
    const result = await calcProfit(values);


    if (result) {
      setValues((prev) => ({
        ...prev,
        generationTime: result.generationTime ?? 0,
        rateOfReturn: result.rateOfReturn ?? 0,
        monthlyProfit: Number(formatManUnit(result.monthlyProfit ?? 0)),
        annualProfit: Number(formatManUnit(result.annualProfit ?? 0)),
      }));
    }
  }

  return (
    <Flex 
      mb={12}
      mt={12}
      gap={6}
      width="100%"
      height="auto"
      maxW="960px"
      borderRadius="lg"
      overflow="hidden"
      direction="column"
      position="relative"
      p={{ base: 0, md: 12 }}
    >
      <Impactor direction="bottom" once>
        <Box px={{ base: 6, md: 8 }}>
          <Heading
            mb={4}
            size="5xl"
            color="gray.800"
            lineHeight="1.35"
            fontWeight="semibold"
          >
            예상 수익계산기
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color="gray.600"
          >
            발전소 운영 데이터를 기반으로 예상 발전량과 수익을 지금 바로 확인해보세요.
          </Text>
        </Box>
      </Impactor>

      <Grid
        p={4}
        width="100%"
        gap={{ base: 4, md: 8 }}
        templateColumns="1fr"
      >
        <Impactor direction="bottom" once delay={1.0}>
          <ProfitConditon 
            areaType={areaType} 
            values={values} 
            onChange={handleChange} 
            onAreaTypeChange={handleAreaTypeChange} 
            onCalculateProfit={handleCalculateProfit} 
            isPending={isAddressToLocationPending}
          />
        </Impactor>
        <Impactor direction="bottom" once delay={1.5}>
          <ProfitAnalysis values={values} />
        </Impactor>
      </Grid>
    </Flex>
  );
}