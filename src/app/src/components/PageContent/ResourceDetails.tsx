import { DateField, Field, ImageField, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import { MapAuthor } from 'src/repository/ResourceDetail/functions';
import { Author } from 'src/repository/shared/types';
import ResourceDetail, { ResourceDetailProps } from 'src/ui/ResourceDetail/ResourceDetail';
import { IsEditing } from '../Helpers/ContentUtil';

interface Fields {
  PageTitle: Field<string>;
  LeadInContent: Field<string>;
  Content: Field<string>;
  Image: ImageField;
  ImageCaption: Field<string>;
  PublishedDate: Field<string>;
  Authors: Author[];
}

type ResourceDetailsPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
};

const ResourceDetailsMarkup = ({ fields }: ResourceDetailsPropsBed): JSX.Element => {
  if (fields) {
    const resourceDetailsProps: ResourceDetailProps = {
      title: <Text field={fields.PageTitle} editable={IsEditing()} />,
      leadContent: <Text field={fields.LeadInContent} editable={IsEditing()} />,
      mainContent: <RichText field={fields.Content} editable={IsEditing()} />,
      image: fields.Image.value?.src ? <NextImageExtended field={fields.Image} /> : undefined,
      imageCaption: <Text field={fields.ImageCaption} editable={IsEditing()} />,
      publishedDate: (
        <DateField
          field={fields.PublishedDate}
          render={(date) =>
            (date?.getUTCMonth() === 0
              ? date.getUTCMonth() + 1
              : date?.getUTCMonth()
              ? date?.getUTCMonth() + 1
              : '') +
            '/' +
            date?.getUTCDate() +
            '/' +
            date?.getUTCFullYear()
          }
          editable={IsEditing()}
        />
      ),
      author: MapAuthor(fields.Authors),
    };
    return <ResourceDetail {...resourceDetailsProps} />;
  }

  return <></>;
};

export const Default = (props: ResourceDetailsPropsBed): JSX.Element => {
  return ResourceDetailsMarkup(props);
};
