import Accordion, { AccordionProps } from 'src/ui/Accordion/Accordion';
import AccordionVariant, { AccordionVariantProps } from 'src/ui/Accordion/AccordionVariant';
import AnchorComponent from './AnchorComponent';
import { AccordionResult } from 'src/repository/Accordion/types';
import { MapAccordion } from 'src/repository/Accordion/functions';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { repositoryConstants } from 'src/repository/constants';
import { StringJson } from 'src/repository/shared/types';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentTheme } from 'src/types/generic';

interface Fields {
  data: {
    datasource: {
      title: StringJson;
      accordions: {
        results: AccordionResult[];
      };
    };
  };
}

type AccordionPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
};

const AccordionDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Accordion</span>
);

const AccordionMarkup = ({ fields, params }: AccordionPropsBed): JSX.Element => {
  const datasource = fields?.data.datasource;
  if (datasource) {
    const accordionProps: AccordionProps = {
      title: <Text field={datasource.title.jsonValue} />,
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      questions: MapAccordion(datasource.accordions.results, 10),
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <Accordion {...accordionProps} />
      </AnchorComponent>
    );
  }

  return <AccordionDefaultComponent />;
};

const AccordionVariantMarkup = ({ fields, params }: AccordionPropsBed): JSX.Element => {
  const datasource = fields.data.datasource;
  if (datasource?.accordions?.results?.length) {
    const accordionVariantProps: AccordionVariantProps = {
      title: <Text field={datasource.title.jsonValue} />,
      questions: MapAccordion(datasource.accordions.results, 10),
      isEditing: IsEditing(),
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <AccordionVariant {...accordionVariantProps} />
      </AnchorComponent>
    );
  }

  return <AccordionDefaultComponent />;
};

export const Default = (props: AccordionPropsBed): JSX.Element => {
  return AccordionVariantMarkup(props);
};

export const SimpleAccordion = (props: AccordionPropsBed): JSX.Element => {
  return AccordionMarkup(props);
};
