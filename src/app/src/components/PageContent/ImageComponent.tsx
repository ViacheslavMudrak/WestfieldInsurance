import ImageComponent, { ImageComponentProps } from 'src/ui/ImageComponent/ImageComponent';
import AnchorComponent from './AnchorComponent';
import { IsEditing } from 'components/Helpers/ContentUtil';
import { Field, ImageField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImageExtended from 'components/Helpers/NextImageExtended';

interface Fields {
  Image: ImageField;
  ImageCaption: Field<string>;
}

export type ImagesDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImagesMarkup = ({ fields, params }: ImagesDataProps): JSX.Element => {
  const ImagesDefaultComponent = (): JSX.Element => <span className="is-empty-hint">Images</span>;

  if (fields) {
    const ImagesProps: ImageComponentProps = {
      image: <NextImageExtended field={fields.Image} />,
      caption: <Text field={fields.ImageCaption} editable={IsEditing()} />,
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <ImageComponent {...ImagesProps} />
      </AnchorComponent>
    );
  }

  return <ImagesDefaultComponent />;
};

export const Default = (props: ImagesDataProps): JSX.Element => {
  return ImagesMarkup(props);
};
