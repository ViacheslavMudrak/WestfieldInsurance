import { InsightCard } from './types';
import { ImageLink } from 'src/types/imageLink';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';

export function MapInsightsCards(data: InsightCard[]): ImageLink[] {
  const imageLinks: ImageLink[] = [];
  if (!data) return imageLinks;

  data.forEach((insightCard) => {
    imageLinks.push({
      image: <NextImageExtended field={insightCard.image?.jsonValue} />,
      title: <Text field={insightCard.title.jsonValue} />,
      content: <Text field={insightCard.copy.jsonValue} />,
      link: {
        field: insightCard.link.jsonValue,
        id: insightCard.id,
      },
    });
  });

  return imageLinks;
}
