import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import { ImageLink } from 'src/types/imageLink';
import { RichTextCard } from './types';

export function MapRichTextCards(data: RichTextCard[]): ImageLink[] {
  const imageLinks: ImageLink[] = [];
  if (!data) return imageLinks;

  data.forEach((richTextCard) => {
    imageLinks.push({
      image: <NextImageExtended field={richTextCard.image?.jsonValue} />,
      title: <Text field={richTextCard.title.jsonValue} />,
      content: <RichText field={richTextCard.richTextCopy.jsonValue} />,
      link: {
        field: richTextCard.link.jsonValue,
        id: richTextCard.id,
      },
    });
  });

  return imageLinks;
}
