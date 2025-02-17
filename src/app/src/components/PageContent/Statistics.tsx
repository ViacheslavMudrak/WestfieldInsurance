import Statistics, { StatisticsProps } from 'src/ui/Statistics/Statistics';
import AnchorComponent from './AnchorComponent';
import { StatisticResult } from 'src/repository/Statistics/types';
import { MapStatistics } from 'src/repository/Statistics/functions';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { repositoryConstants } from 'src/repository/constants';
import { ComponentTheme } from 'src/types/generic';

interface Fields {
  data: {
    datasource: {
      statistics: {
        results: StatisticResult[];
      };
    };
  };
}

type StatisticsPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
};

const StatisticsDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Statistics</span>
);

const StatisticsMarkup = (
  { fields, params }: StatisticsPropsBed,
  isVertical: boolean
): JSX.Element => {
  const datasource = fields.data.datasource;
  if (datasource?.statistics?.results?.length) {
    const statisticsProps: StatisticsProps = {
      isEditing: IsEditing(),
      cards: MapStatistics(datasource.statistics.results),
      vertical: isVertical,
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <Statistics {...statisticsProps} />
      </AnchorComponent>
    );
  }

  return <StatisticsDefaultComponent />;
};

export const Default = (props: StatisticsPropsBed): JSX.Element => {
  return StatisticsMarkup(props, false);
};

export const Vertical = (props: StatisticsPropsBed): JSX.Element => {
  return StatisticsMarkup(props, true);
};
