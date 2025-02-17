import { ContentDetailsNavResult } from './types';
import { SiteLink } from 'src/types/generic';

export function GetContentDetailsNav(cards: ContentDetailsNavResult[] | undefined): SiteLink[] {
  const resultToMap: SiteLink[] = [];
  if (cards) {
    cards.forEach((card) => {
      if (card) {
        resultToMap.push({
          field: card.link.jsonValue,
          id: card.id,
        });
      }
    });
  }
  return resultToMap;
}

export function checkNavigation(object): boolean {
  const keyToCheck = 'componentName'; // The key you are looking for
  const valueToMatch = 'ContentDetailsNav'; // The value you want to match

  let hasNav = false;
  // Check if any object in the array has the key with the matching value
  object.forEach((obj) => {
    if (obj[keyToCheck] && obj[keyToCheck] == valueToMatch) {
      hasNav = true;
    }
  });

  return hasNav;
}
