import { ComponentTheme } from 'src/types/generic';
import { FeatureBannerListProps } from 'src/ui/FeatureBannerList/FeatureBannerList';

export const exampleFeatureBannerListProps = (
  props: FeatureBannerListProps
): FeatureBannerListProps => {
  const { title, subtitle, backgroundColor } = props;
  return {
    title: title ? title : <div>{'Celebrating Our Centennial'}</div>,
    subtitle: subtitle,
    backgroundColor: backgroundColor ? backgroundColor : ComponentTheme.Gray,
  };
};
