import { Field, ImageField, LinkField, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import FeatureBanner, { FeatureBannerProps } from 'src/ui/FeatureBanner/FeatureBanner';
import AnchorComponent from './AnchorComponent';
import Cta from 'components/Helpers/Cta';
import { GetDictionaryPhrase, GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { repositoryConstants } from 'src/repository/constants';
import { ButtonVariants, ComponentTheme } from 'src/types/generic';

interface Fields {
  Title: Field<string>;
  RichTextCopy: Field<string>;
  CtaLink: LinkField;
  Image: ImageField;
  Label: Field<string>;
  Video: {
    id: string;
    fields: {
      Link: LinkField;
      Title: Field<string>;
      VideoCaption: Field<string>;
      RichTextCopy: Field<string>;
    };
  };
  Caption: Field<string>;
}

type FeatureBannerDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FeatureBannerMarkup = (
  { fields, params }: FeatureBannerDataProps,
  reverse: boolean
): JSX.Element => {
  const FeatureBannerDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">Feature Banner</span>
  );
  if (fields) {
    const isVideo = fields.Video && fields.Video.fields.Link.value.href != '' ? true : false;
    const seeTranscriptText = GetDictionaryPhrase('see-transcript');
    const featureBannerProps: FeatureBannerProps = {
      title: <Text field={fields.Title} />,
      content: <RichText field={fields.RichTextCopy} />,
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
      label: <Text field={fields.Label} />,
      reverse: reverse,
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      isVideo: isVideo,
      src: fields.Video?.fields.Link.value.href,
      isEditing: IsEditing(),
      EditingLink: <>Video selection located in Explorer</>,
      transcript: <RichText field={fields.Video?.fields.RichTextCopy} />,
      caption: isVideo ? (
        <Text field={fields.Video.fields.VideoCaption} />
      ) : (
        <Text field={fields.Caption} />
      ),
      seeTranscriptText: seeTranscriptText,
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <FeatureBanner {...featureBannerProps} />
      </AnchorComponent>
    );
  }

  return <FeatureBannerDefaultComponent />;
};

export const Default = (props: FeatureBannerDataProps): JSX.Element => {
  return FeatureBannerMarkup(props, true);
};

export const ImageLeft = (props: FeatureBannerDataProps): JSX.Element => {
  return FeatureBannerMarkup(props, false);
};
