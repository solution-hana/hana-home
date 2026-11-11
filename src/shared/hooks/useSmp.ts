import { useQuery } from '@tanstack/react-query';

import supabase from '@/shared/config/supabase';
import { getSmpDailyWeightedSummaries, groupSmpByTradeDate } from '@/shared/utils/smp';
import { keepLastGood, readLastGood } from '@/shared/utils/storage';
import type { SmpDailyWeightedSummary } from '@/types/smp';

// 조회가 실패하거나 비었을 때 쓰는 마지막 정상값 저장 키
const SMP_CACHE_KEY = 'hana:smp-weekly';

// 주간 SMP 조회 훅 (하루 마다 재조회)
export const useWeeklySmp = () => {
  return useQuery({
    queryKey: ['smp', 'weekly'],
    queryFn: async () => {
      const now = new Date();
      const tradeDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      // 현재 날짜 기준 일주일치 데이터 조회
      const { data, error } = await supabase
        .from('smp_spot_hourly')
        .select('*')
        .lte('trade_date', tradeDate)
        .order('trade_date', { ascending: false })
        .limit(7 * 48);
      
      if (error) {
        const cached = readLastGood<SmpDailyWeightedSummary>(SMP_CACHE_KEY);
        if (cached.length > 0) return cached;
        throw error;
      }

      const grouped = groupSmpByTradeDate(data ?? []);
      const summaries = getSmpDailyWeightedSummaries(grouped);

      return keepLastGood(SMP_CACHE_KEY, summaries);
    },
    // 24시간 1분 동안 fresh (하루에 한 번 조회)
    staleTime: 1000 * 60 * 60 * 24 + 1000 * 60,

    // 24시간 1분 동안 캐시 유지
    gcTime: 1000 * 60 * 60 * 24 + 1000 * 60,

    retry: 1,

    // stale 상태일 때 포커스하면 재조회
    refetchOnWindowFocus: true,

    refetchInterval: false,
  });
}