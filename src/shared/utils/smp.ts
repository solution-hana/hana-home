import type { Smp, SmpGroupedByDate, SmpDailyWeightedSummary } from '@/types/smp';

/**
 * SMP 배열을 trade_date 기준으로 그룹합니다.
 * @param list - 그룹할 SMP 배열 (쿼리 결과 등)
 * @returns trade_date를 키로 하는 그룹 객체 (데이터 등장 순서 유지)
 */
export function groupSmpByTradeDate(list: Smp[]): SmpGroupedByDate {
  const grouped: SmpGroupedByDate = {};

  for (const item of list) {
    const key = item.trade_date;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  }

  return grouped;
}

/**
 * YYYY-MM-DD → YYYY년 MM월 DD일 포맷
 */
export function formatSmpDateToKorean(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${y}년 ${m}월 ${d}일`;
}

/**
 * 가중평균 계산 헬퍼 함수
 */
function calcWeightedAvg(items: Smp[], weightKey: keyof Smp): number {
  let weightedSum = 0;
  let weightSum = 0;
  let priceSum = 0;
  let count = 0;

  for (const item of items) {
    const price = Number(item.smp);
    if (!Number.isFinite(price)) continue;

    // 가중치가 비어 있거나 글자로 오면 0 으로 본다
    const weight = Number(item[weightKey]) || 0;
    weightedSum += price * weight;
    weightSum += weight;
    priceSum += price;
    count += 1;
  }

  if (count === 0) return 0;

  // 가중치(부하) 값이 없는 날은 단순 평균으로 계산한다
  const avg = weightSum > 0 ? weightedSum / weightSum : priceSum / count;

  return Math.round(avg * 100) / 100;
}

/**
 * 그룹된 SMP에서 날짜별 가중평균·포맷 날짜를 도출합니다.
 * - 육지 SMP 가중평균: land_load 가중치 사용
 * - 제주 SMP 가중평균: jeju_load 가중치 사용
 * - 통합 SMP 가중평균: total_load 가중치 사용
 *
 * @param grouped - trade_date로 그룹된 SMP (groupSmpByTradeDate 결과)
 * @returns 날짜순 정렬된 요약 배열
 */
export function getSmpDailyWeightedSummaries(
  grouped: SmpGroupedByDate
): SmpDailyWeightedSummary[] {
  return Object.keys(grouped)
    .sort()
    .map((date) => {
      const items = grouped[date];
      const landItems = items.filter((d) => d.area_code === "LAND");
      const jejuItems = items.filter((d) => d.area_code === "JEJU");

      return {
        date,
        dateFormatted: formatSmpDateToKorean(date),
        landWeightedAvg: calcWeightedAvg(landItems, "land_load"),
        jejuWeightedAvg: calcWeightedAvg(jejuItems, "jeju_load"),
        totalWeightedAvg: calcWeightedAvg(landItems, "total_load"),
      };
    })
    // 가격이 하나도 없는 날은 뺀다(0원으로 보이지 않게)
    .filter((summary) => summary.landWeightedAvg > 0 || summary.jejuWeightedAvg > 0);
}
