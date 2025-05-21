export const buildAggregatedData = (data: Map<string, any>) => {
  const aggregatedData = new Map<string, any>();

  data.forEach((value: any, key: string) => {
    aggregatedData.set(
      key,
      value.reduce((acc: number, item: any) => acc + parseFloat(item.currentBalance), 0)
    );
  });

  return aggregatedData;
};
