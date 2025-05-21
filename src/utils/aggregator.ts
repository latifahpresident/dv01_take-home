// this code was shared so trying to keep it dry
export const buildAggregatedData = (data: Map<string, any>) => {
  const aggregatedData = new Map<string, any>();
  const chartData: { name: string; value: number }[] = [];
  data.forEach((value: any, key: string) => {
    const total = value
      .reduce((acc: number, item: any) => acc + parseFloat(item.currentBalance), 0)
      .toFixed(2);

    chartData.push({
      name: key,
      value: total,
    });
    aggregatedData.set(key, total);
  });

  return {
    chartData: chartData.sort((a, b) => Number(a.name) - Number(b.name)),
    aggregatedData,
  };
};
