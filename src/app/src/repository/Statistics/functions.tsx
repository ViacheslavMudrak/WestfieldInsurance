import { StatisticCard } from 'src/ui/Statistics/Statistics';
import { StatisticResult } from './types';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

export function MapStatistics(data: StatisticResult[]): StatisticCard[] {
  const itemLinks: StatisticCard[] = [];
  if (!data) return itemLinks;

  data.forEach((statistic) => {
    itemLinks.push({
      numbers: <Text field={statistic.statistic.jsonValue} />,
      content: <RichText field={statistic.content.jsonValue} />,
    });
  });

  return itemLinks;
}
