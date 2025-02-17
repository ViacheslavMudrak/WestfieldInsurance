import { AuthorBioProps } from 'src/ui/AuthorBio/AuthorBio';
import { Author } from '../shared/types';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';

export function MapAuthorList(data: Author[]): AuthorBioProps[] {
  const authors: AuthorBioProps[] = [];
  if (!data) return authors;

  data.forEach((item) => {
    authors.push({
      bioName: <Text field={item.fields.Title} editable={false} />,
      label: <Text field={item.fields.Label} />,
      bioText: <RichText field={item.fields.ShortBioCopy} />,
      image: <NextImageExtended field={item.fields.Image} />,
    });
  });

  return authors;
}
