import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import { ProductCard } from 'src/types/productCard';
import { ProductsCardResult } from './types';

export function GetProductsCards(cards: ProductsCardResult[] | undefined): ProductCard[] {
  const resultToMap: ProductCard[] = [];
  if (cards) {
    cards.forEach((card) => {
      if (card.name) {
        resultToMap.push({
          icon: <NextImageExtended field={card.image.jsonValue} />,
          content: <RichText field={card.copy.jsonValue} />,
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
