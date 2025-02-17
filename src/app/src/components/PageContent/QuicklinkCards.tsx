import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import QuickLinks, { QuickLinksProps } from 'src/ui/QuickLinks/QuickLinks';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { StringJson } from 'src/repository/shared/types';
import { GetQuicklinkCards } from 'src/repository/QuicklinkCards/functions';
import AnchorComponent from './AnchorComponent';
import { QuicklinksCardResult } from 'src/repository/QuicklinkCards/types';
import { repositoryConstants } from 'src/repository/constants';
import { ComponentTheme } from 'src/types/generic';

interface Fields {
  data: {
    item: {
      title: StringJson;
      children: { results: QuicklinksCardResult[] };
    };
  };
}

export type QuicklinkCardsDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const QuicklinkCardsMarkup = ({ fields, params }: QuicklinkCardsDataProps): JSX.Element => {
  const QuicklinkCardsDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">QuicklinkCards</span>
  );

  if (fields?.data?.item) {
    const QuicklinkCardsProps: QuickLinksProps = {
      title: <Text field={fields.data.item.title.jsonValue} />,
      cardLinks: GetQuicklinkCards(fields.data.item.children.results),
      isEditing: IsEditing(),
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <QuickLinks {...QuicklinkCardsProps} />
      </AnchorComponent>
    );
  }

  return <QuicklinkCardsDefaultComponent />;
};

export const Default = (props: QuicklinkCardsDataProps): JSX.Element => {
  return QuicklinkCardsMarkup(props);
};
