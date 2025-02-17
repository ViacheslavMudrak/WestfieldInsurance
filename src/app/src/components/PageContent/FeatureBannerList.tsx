import {
  ComponentRendering,
  Field,
  Placeholder,
  RichText,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import FeatureBannerList, {
  FeatureBannerListProps,
} from 'src/ui/FeatureBannerList/FeatureBannerList';
import AnchorComponent from './AnchorComponent';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { repositoryConstants } from 'src/repository/constants';
import { ComponentTheme } from 'src/types/generic';

interface Fields {
  Title: Field<string>;
  Label: Field<string>;
}

type FeatureBannerListDataProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields: Fields;
};

const FeatureBannerListMarkup = ({
  fields,
  params,
  rendering,
}: FeatureBannerListDataProps): JSX.Element => {
  const FeatureBannerListDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">Feature Banner</span>
  );
  if (fields) {
    const featureBannerListProps: FeatureBannerListProps = {
      title: <Text field={fields.Title} />,
      subtitle: <RichText field={fields.Label} />,
      backgroundColor: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <FeatureBannerList {...featureBannerListProps}>
          <Placeholder name="banner-list-card" rendering={rendering} />
        </FeatureBannerList>
      </AnchorComponent>
    );
  }

  return <FeatureBannerListDefaultComponent />;
};

export const Default = (props: FeatureBannerListDataProps): JSX.Element => {
  return FeatureBannerListMarkup(props);
};
