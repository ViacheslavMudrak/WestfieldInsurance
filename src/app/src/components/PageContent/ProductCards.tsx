import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import ProductsCards, { ProductCardsProps } from 'src/ui/ProductCards/ProductCards';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { StringJson } from 'src/repository/shared/types';
import { ProductsCardResult } from 'src/repository/productsCards/types';
import { GetProductsCards } from 'src/repository/productsCards/functions';
import { repositoryConstants } from 'src/repository/constants';
import AnchorComponent from './AnchorComponent';
import { ComponentTheme } from 'src/types/generic';

interface Fields {
  data: {
    item: {
      title: StringJson;
      label: StringJson;
      children: { results: ProductsCardResult[] };
    };
  };
}

export type ProductsCardsDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProductsCardsMarkup = (
  { fields, params }: ProductsCardsDataProps,
  isCarousel: boolean
): JSX.Element => {
  const ProductsCardsDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">ProductsCards</span>
  );

  if (fields?.data?.item) {
    const ProductsCardsProps: ProductCardsProps = {
      title: <Text field={fields.data.item.title.jsonValue} />,
      label: <Text field={fields.data.item.label.jsonValue} />,
      cards: GetProductsCards(fields.data.item.children.results),
      isEditing: IsEditing(),
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      carousel: isCarousel,
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <ProductsCards {...ProductsCardsProps} />
      </AnchorComponent>
    );
  }

  return IsEditing() ? <ProductsCardsDefaultComponent /> : <></>;
};

export const Default = (props: ProductsCardsDataProps): JSX.Element => {
  return ProductsCardsMarkup(props, false);
};

export const Carousel = (props: ProductsCardsDataProps): JSX.Element => {
  return ProductsCardsMarkup(props, true);
};
