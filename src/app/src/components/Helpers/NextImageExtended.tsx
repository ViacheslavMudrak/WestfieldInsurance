import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ImageField } from '@sitecore-jss/sitecore-jss-react';
import { IsEditing } from './ContentUtil';

export interface NewImageProps {
  field?: ImageField;
}

const NextImageExtended = (props: NewImageProps): JSX.Element => {
  const hasEmptyDimension =
    props?.field?.value?.src !== undefined &&
    (props.field?.value?.width === undefined ||
      props.field?.value?.width === '' ||
      props.field?.value?.height === undefined ||
      props.field?.value?.height == '');

  if (props.field?.value?.src?.includes('.svg') && hasEmptyDimension) {
    props.field.value.width = 1;
    props.field.value.height = 1;

    return <NextImage {...props} />;
  } else if (hasEmptyDimension) {
    if (IsEditing()) {
      return (
        <>
          <span style={{ color: 'red' }}>Fill in image dimensions</span>
          <NextImage {...props} />
        </>
      );
    } else {
      return <></>;
    }
  } else {
    return <NextImage {...props} />;
  }
};

export default NextImageExtended;
