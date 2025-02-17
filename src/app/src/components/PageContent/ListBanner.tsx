import { Field, ImageField, LinkField, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import ListBanner, { ListBannerProps } from 'src/ui/FeatureBannerList/ListBanner';
import AnchorComponent from './AnchorComponent';
import Cta from 'components/Helpers/Cta';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { repositoryConstants } from 'src/repository/constants';
import { ButtonVariants } from 'src/types/generic';

interface Fields {
  Title: Field<string>;
  RichTextCopy: Field<string>;
  Image: ImageField;
  CtaLink: LinkField;
}

type ListBannerDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ListBannerMarkup = (
  { fields, params }: ListBannerDataProps,
  reverse: boolean
): JSX.Element => {
  const ListBannerDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">Feature Banner</span>
  );
  const isEditing = IsEditing();

  if (fields) {
    const listBanner: ListBannerProps = {
      title: <Text field={fields.Title} />,
      richText: <RichText field={fields.RichTextCopy} />,
      image: <NextImageExtended field={fields.Image} />,
      link: (
        <Cta
          link={fields.CtaLink}
          style={
            GetStyle(
              params?.Styles,
              repositoryConstants.styles.ctaStyleName,
              repositoryConstants.styles.ctaDefaultStyle
            ) as ButtonVariants
          }
        />
      ),
      invert: reverse,
      isEditing: isEditing,
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <ListBanner {...listBanner} />
      </AnchorComponent>
    );
  }

  return <ListBannerDefaultComponent />;
};

export const Default = (props: ListBannerDataProps): JSX.Element => {
  return ListBannerMarkup(props, false);
};

export const ImageLeft = (props: ListBannerDataProps): JSX.Element => {
  return ListBannerMarkup(props, true);
};
