import {
  ComponentRendering,
  Field,
  ImageField,
  Placeholder,
  RichText,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { IsEditing } from 'components/Helpers/ContentUtil';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import { checkNavigation } from 'src/repository/ContentDetails/functions';
import ContentDetail, { ContentDetailProps } from 'src/ui/ContentDetail/ContentDetail';

interface Fields {
  PageTitle: Field<string>;
  RichTextCopy: Field<string>;
  Label: Field<string>;
  Image: ImageField;
  Subtitle: Field<string>;
  ImageCaption: Field<string>;
  HasNavigation: Field<string>;
}

type ContentDetailsCardsDataProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields: Fields;
};

const ContentDetailsCardsMarkup = ({
  fields,
  rendering,
}: ContentDetailsCardsDataProps): JSX.Element => {
  const ContentDetailsCardsDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">ContentDetailsCards</span>
  );
  if (fields) {
    const datasource = fields;
    const ContentDetailsCardsProps: ContentDetailProps = {
      title: <Text field={datasource.PageTitle} />,
      label: <Text field={datasource.Label} />,
      subtitle: <Text field={datasource.Subtitle} />,
      mainContent: <RichText field={datasource.RichTextCopy} />,
      image: <NextImageExtended field={fields.Image} />,
      imageCaption: <Text field={datasource.ImageCaption} />,
      isEditing: IsEditing(),
      hasNavigation: checkNavigation(rendering.placeholders?.['headless-contentdetail-navigation']),
    };
    return (
      <ContentDetail {...ContentDetailsCardsProps}>
        <Placeholder name="headless-contentdetail-navigation" rendering={rendering} />
        <Placeholder name="content-details-bottom" rendering={rendering} />
      </ContentDetail>
    );
  }

  return <ContentDetailsCardsDefaultComponent />;
};

export const Default = (props: ContentDetailsCardsDataProps): JSX.Element => {
  return ContentDetailsCardsMarkup(props);
};
