import { GetTags } from 'components/Helpers/ContentUtil';
import { getFavIconUrl } from 'src/LayoutUtils';

const findChildTag = (input: string, parentTag: string): string | null => {
  const pairs = input.split(';');
  for (const pair of pairs) {
    const [parent, child] = pair.split(':');
    if (parent === parentTag) {
      return child;
    }
  }
  return null; // Return null if "Resources" parent tag is not found
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSchemaData = (data: any, siteName: string) => {
  if (data) {
    const tags = GetTags(data.SxaTags);
    const logo = getFavIconUrl(siteName);
    const schemaType = findChildTag(tags, 'Resources');
    const returnObject = {
      '@context': 'https://schema.org',
      '@type': schemaType ?? 'Article',
      headline: data.Title.value,
      image: data.Image.value.src,
      authors: data.Authors.map((author) => ({
        '@type': 'Person',
        name: author.displayName,
      })),
      publisher: {
        '@type': 'Organization',
        name: 'Westfield Insurance',
        logo: {
          '@type': 'ImageObject',
          url: logo,
        },
      },
      datePublished: data.PublishedDate.value,
    };
    return JSON.stringify(returnObject);
  } else {
    return '';
  }
};
