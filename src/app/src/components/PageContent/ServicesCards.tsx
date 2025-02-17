import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import ServicesCards, { ServicesCardsProps } from 'src/ui/ServicesCards/ServicesCards';
import { ComponentTheme } from 'src/types/generic';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { StringJson } from 'src/repository/shared/types';
import { ServicesCardResult } from 'src/repository/servicesCards/types';
import { GetServicesCards } from 'src/repository/servicesCards/functions';
import AnchorComponent from './AnchorComponent';
import { repositoryConstants } from 'src/repository/constants';

interface Fields {
  data: {
    item: {
      title: StringJson;
      label: StringJson;
      children: { results: ServicesCardResult[] };
    };
  };
}

export type ServicesCardsDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ServicesCardsMarkup = ({ fields, params }: ServicesCardsDataProps): JSX.Element => {
  const ServicesCardsDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">ServicesCards</span>
  );

  if (fields.data.item) {
    const ServicesCardsProps: ServicesCardsProps = {
      title: <Text field={fields.data.item.title.jsonValue} />,
      label: <Text field={fields.data.item.label.jsonValue} />,
      cards: GetServicesCards(fields.data.item.children.results),
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <ServicesCards {...ServicesCardsProps} />
      </AnchorComponent>
    );
  }

  return IsEditing() ? <ServicesCardsDefaultComponent /> : <></>;
};

export const Default = (props: ServicesCardsDataProps): JSX.Element => {
  return ServicesCardsMarkup(props);
};
