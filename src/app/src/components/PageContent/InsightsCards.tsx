import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import Cta from 'components/Helpers/Cta';
import { repositoryConstants } from 'src/repository/constants';
import { LinkJson, StringJson } from 'src/repository/shared/types';
import { ButtonVariants, ComponentTheme } from 'src/types/generic';
import InsightsCards, { InsightsCardsProps } from 'src/ui/InsightsCards/InsightsCards';
import AnchorComponent from './AnchorComponent';
import { InsightCard } from 'src/repository/insightsCards/types';
import { MapInsightsCards } from 'src/repository/insightsCards/functions';

interface Fields {
  data: {
    datasource: {
      title: StringJson;
      ctaLink: LinkJson;
      insightsCards: {
        results: InsightCard[];
      };
    };
  };
}

type InsightsCardsPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
};

const InsightsCardsDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Insights Cards</span>
);

const InsightsCardsMarkup = ({ params, fields }: InsightsCardsPropsBed): JSX.Element => {
  const datasource = fields.data.datasource;
  if (datasource) {
    const insightsCardsProps: InsightsCardsProps = {
      title: <Text field={datasource.title.jsonValue} />,
      link: (
        <Cta
          link={datasource.ctaLink.jsonValue}
          style={
            GetStyle(
              params?.Styles,
              repositoryConstants.styles.ctaStyleName,
              repositoryConstants.styles.ctaDefaultStyle
            ) as ButtonVariants
          }
        />
      ),
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      imageLinks: MapInsightsCards(datasource.insightsCards.results),
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <InsightsCards {...insightsCardsProps} />
      </AnchorComponent>
    );
  }

  return IsEditing() ? <InsightsCardsDefaultComponent /> : <></>;
};

export const Default = (props: InsightsCardsPropsBed): JSX.Element => {
  return InsightsCardsMarkup(props);
};
