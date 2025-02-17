import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { StringJson } from 'src/repository/shared/types';
import { BenefitsCardResult } from 'src/repository/Benefits/types';
import { GetBenefitsCards } from 'src/repository/Benefits/functions';
import Benefits, { BenefitsProps } from 'src/ui/Benefits/Benefits';
import { repositoryConstants } from 'src/repository/constants';
import { ComponentTheme } from 'src/types/generic';

interface Fields {
  data: {
    datasource: {
      title: StringJson;
      label: StringJson;
      richTextCopy: StringJson;
      benefits: { results: BenefitsCardResult[] };
    };
  };
}

export type BenefitsCardsDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BenefitsCardsMarkup = ({ fields, params }: BenefitsCardsDataProps): JSX.Element => {
  const BenefitsCardsDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">BenefitsCards</span>
  );

  if (fields.data.datasource) {
    const datasource = fields.data.datasource;
    const BenefitsCardsProps: BenefitsProps = {
      title: <Text field={datasource.title.jsonValue} />,
      label: <Text field={datasource.label.jsonValue} />,
      subtitle: <RichText field={datasource.richTextCopy.jsonValue} />,
      cards: GetBenefitsCards(datasource.benefits.results),
      isEditing: IsEditing(),
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
    };
    return <Benefits {...BenefitsCardsProps} />;
  }

  return <BenefitsCardsDefaultComponent />;
};

export const Default = (props: BenefitsCardsDataProps): JSX.Element => {
  return BenefitsCardsMarkup(props);
};
