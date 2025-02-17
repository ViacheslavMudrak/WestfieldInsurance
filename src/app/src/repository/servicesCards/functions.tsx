import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import { ServicesCardResult } from './types';
import { ServicesCard } from 'src/ui/ServicesCards/ServicesCard';

export function GetServicesCards(cards: ServicesCardResult[] | undefined): ServicesCard[] {
  const resultToMap: ServicesCard[] = [];
  if (cards) {
    cards.forEach((card) => {
      if (card.name) {
        resultToMap.push({
          icon: <NextImageExtended field={card.image.jsonValue} />,
          title: <Text field={card.title.jsonValue} />,
          richTextCopy: <RichText field={card.copy.jsonValue} />,
          link: {
            field: card.link.jsonValue,
            id: card.id,
          },
        });
      }
    });
  }
  return resultToMap;
}
