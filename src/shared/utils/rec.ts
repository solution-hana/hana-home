import { Rec, RecMonthlyItem } from '@/types/rec';

/** YYYY-MM-DD → YYYY년 MM월 DD일 */
function formatTradeDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${y}년 ${m}월 ${d}일`;
}

/** 통합평균가 = (육지 가격×육지 거래량 + 제주 가격×제주 거래량) / (육지 거래량 + 제주 거래량) */
export function calcUnifiedAvgPrice(rec: Rec): number {
  const landPrice = Number(rec.land_avg_price) || 0;
  const jejuPrice = Number(rec.jeju_avg_price) || 0;
  const landVolume = Number(rec.land_trade_volume) || 0;
  const jejuVolume = Number(rec.jeju_trade_volume) || 0;
  const totalVolume = landVolume + jejuVolume;

  if (totalVolume > 0) {
    return (landPrice * landVolume + jejuPrice * jejuVolume) / totalVolume;
  }

  // 거래량 값이 없는 날은 육지 평균가 → 종가 → 제주 평균가 순으로 대신 쓴다
  return landPrice || Number(rec.closing_price) || jejuPrice || 0;
}

export function parseMonthlyRec(recs: Rec[]): RecMonthlyItem[] {
  return recs
    .map((rec) => ({
      date: rec.trade_date,
      dateFormatted: formatTradeDate(rec.trade_date),
      landAvgPrice: Number(rec.land_avg_price) || 0,
      jejuAvgPrice: Number(rec.jeju_avg_price) || 0,
      unifiedAvgPrice: calcUnifiedAvgPrice(rec),
    }))
    // 가격이 하나도 없는 날(휴장 등)은 뺀다
    .filter((item) => item.landAvgPrice > 0 || item.unifiedAvgPrice > 0);
}
