import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import Cta from 'components/Helpers/Cta';
import { repositoryConstants } from 'src/repository/constants';
import { MapRichTextCards } from 'src/repository/richTextCards/functions';
import { RichTextCard } from 'src/repository/richTextCards/types';
import { LinkJson, StringJson } from 'src/repository/shared/types';
import { ButtonVariants, ComponentTheme } from 'src/types/generic';
import RichTextCards, { RichTextCardsProps } from 'src/ui/RichTextCards/RichTextCards';
import AnchorComponent from './AnchorComponent';

interface Fields {
  data: {
    datasource: {
      title: StringJson;
      ctaLink: LinkJson;
      richTextCards: {
        results: RichTextCard[];
      };
    };
  };
}

type RichTextCardsPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
};

const RichTextCardsDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Rich Text Cards</span>
);

const RichTextCardsMarkup = ({ params, fields }: RichTextCardsPropsBed): JSX.Element => {
  const datasource = fields.data.datasource;
  if (datasource) {
    const richTextCardsProps: RichTextCardsProps = {
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
      imageLinks: MapRichTextCards(datasource.richTextCards.results),
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <RichTextCards {...richTextCardsProps} />
      </AnchorComponent>
    );
  }

  return IsEditing() ? <RichTextCardsDefaultComponent /> : <></>;
};

export const Default = (props: RichTextCardsPropsBed): JSX.Element => {
  return RichTextCardsMarkup(props);
};
