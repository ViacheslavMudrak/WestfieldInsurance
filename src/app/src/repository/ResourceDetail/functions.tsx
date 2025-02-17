import { Author } from '../shared/types';

export function MapAuthor(data: Author[]): string[] | undefined {
  if (!data) return undefined;

  return data.map((item, index) => {
    if (index === 0) {
      return item.fields.Title.value;
    } else if (index === data.length - 1) {
      return ' and ' + item.fields.Title.value;
    } else {
      return ', ' + item.fields.Title.value;
    }
  });
}
