import NextImageExtended from 'components/Helpers/NextImageExtended';
import { CardLink } from 'src/types/cardLink';
import { QuicklinksCardResult } from './types';

export function GetQuicklinkCards(cards: QuicklinksCardResult[] | undefined): CardLink[] {
  const resultToMap: CardLink[] = [];
  if (cards) {
    cards.forEach((card) => {
      if (card) {
        resultToMap.push({
          icon: <NextImageExtended field={card.image.jsonValue} />,
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
