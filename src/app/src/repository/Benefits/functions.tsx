import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import { BenefitsCardResult } from './types';
import { BenefitCard } from 'src/ui/Benefits/BenefitsCard';

export function GetBenefitsCards(cards: BenefitsCardResult[] | undefined): BenefitCard[] {
  const resultToMap: BenefitCard[] = [];
  if (cards) {
    cards.forEach((card, index) => {
      if (card.id && index < 9) {
        resultToMap.push({
          icon: <NextImageExtended field={card.image.jsonValue} />,
          richTextCopy: <RichText field={card.copy.jsonValue} />,
          link: {
            field: card.link.jsonValue,
            id: card.id,
          },
          title: <Text field={card.title.jsonValue} />,
        });
      }
    });
  }
  return resultToMap;
}
