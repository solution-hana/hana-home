import { useQuery } from '@tanstack/react-query';

import type { Rec, RecMonthlyItem } from '@/types/rec';

import supabase from '@/shared/config/supabase';
import { parseMonthlyRec } from '@/shared/utils/rec';
import { keepLastGood, readLastGood } from '@/shared/utils/storage';

// 조회가 실패하거나 비었을 때 쓰는 마지막 정상값 저장 키
const REC_CACHE_KEY = 'hana:rec-recent';

// 월간 REC 현물 시세 조회 훅 (하루 마다 재조회)
export const useMonthlyRec = () => {
  return useQuery({
    queryKey: ['rec', 'monthly'],
    queryFn: async () => {
      const now = new Date();
      // 오늘 날짜 포맷팅
      const tradeDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      // 오늘까지의 최근 거래일 조회(수집이 늦어도 마지막 시세가 보이도록 시작일 제한을 두지 않는다)
      const { data, error } = await supabase
        .from('rec_spot_daily')
        .select('*')
        .lte('trade_date', tradeDate)
        .order('trade_date', { ascending: false })
        .limit(14);

      if (error) {
        const cached = readLastGood<RecMonthlyItem>(REC_CACHE_KEY);
        if (cached.length > 0) return cached;
        throw error;
      }

      // 가격이 있는 최근 7거래일만 사용
      const formattedRec = parseMonthlyRec((data ?? []) as Rec[]).slice(0, 7);

      return keepLastGood(REC_CACHE_KEY, formattedRec);
    },
    // 24시간 1분 동안 fresh
    staleTime: 1000 * 60 * 60 * 24 + 1000 * 60,

    // 24시간 1분 동안 유지
    gcTime: 1000 * 60 * 60 * 24 + 1000 * 60,

    retry: 1,

    // stale 상태일 때 포커스하면 재조회
    refetchOnWindowFocus: true,

    refetchInterval: false,
  });
}