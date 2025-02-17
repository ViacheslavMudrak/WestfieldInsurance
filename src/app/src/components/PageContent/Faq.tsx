import AccordionVariant, { AccordionVariantProps } from 'src/ui/Accordion/AccordionVariant';
import AnchorComponent from './AnchorComponent';
import { AccordionResult } from 'src/repository/Accordion/types';
import { MapAccordion } from 'src/repository/Accordion/functions';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { repositoryConstants } from 'src/repository/constants';
import { LinkJson, StringJson } from 'src/repository/shared/types';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Cta from 'components/Helpers/Cta';
import { ButtonVariants, ComponentTheme } from 'src/types/generic';

interface Fields {
  data: {
    datasource: {
      title: StringJson;
      label: StringJson;
      copy: StringJson;
      ctaLink: LinkJson;
      faqs: {
        results: AccordionResult[];
      };
    };
  };
}

type AccordionPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
};

const FaqDefaultComponent = (): JSX.Element => <span className="is-empty-hint">Faq</span>;

const FaqDefaultMarkup = (
  { fields, params }: AccordionPropsBed,
  twoColumn: boolean,
  align?: 'left' | 'right' | undefined
): JSX.Element => {
  const datasource = fields.data.datasource;
  if (datasource) {
    const accordionProps: AccordionVariantProps = {
      title: <Text field={datasource.title.jsonValue} />,
      label: <Text field={datasource.label.jsonValue} />,
      content: <RichText field={datasource.copy.jsonValue} />,
      link: (
        <Cta
          link={datasource.ctaLink.jsonValue}
          style={
            GetStyle(
              params && params.Styles ? params.Styles : '',
              repositoryConstants.styles.ctaStyleName,
              repositoryConstants.styles.ctaDefaultStyle
            ) as ButtonVariants
          }
        />
      ),
      twoColumn: twoColumn,
      align: align,
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      questions: MapAccordion(datasource.faqs.results, 20),
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <AccordionVariant {...accordionProps} />
      </AnchorComponent>
    );
  }

  return <FaqDefaultComponent />;
};

export const Default = (props: AccordionPropsBed): JSX.Element => {
  return FaqDefaultMarkup(props, false);
};

export const TwoColumnLeft = (props: AccordionPropsBed): JSX.Element => {
  return FaqDefaultMarkup(props, true, 'left');
};

export const TwoColumnRight = (props: AccordionPropsBed): JSX.Element => {
  return FaqDefaultMarkup(props, true, 'right');
};
