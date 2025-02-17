import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import ContentDetailNav, { NavigationProps } from 'src/ui/ContentDetail/ContentDetailNav';
//import { IsEditing } from 'components/Helpers/ContentUtil';
import { LinkJson, StringJson } from 'src/repository/shared/types';
import AnchorComponent from './AnchorComponent';
import { GetContentDetailsNav } from 'src/repository/ContentDetails/functions';
import { GetDictionaryPhrase } from 'components/Helpers/ContentUtil';

interface Fields {
  data: {
    item: {
      title: StringJson;
      children: { results: { id: string; link: LinkJson }[] };
    };
  };
}

export type ContentDetailNavDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ContentDetailNavMarkup = ({ fields, params }: ContentDetailNavDataProps): JSX.Element => {
  const ContentDetailNavDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">ComponentDetailsNavigation</span>
  );

  const closeLabel = GetDictionaryPhrase('close');

  if (fields.data.item) {
    const ContentDetailsNavProps: NavigationProps = {
      navTitle: <Text field={fields.data.item.title.jsonValue} />,
      navLinks: GetContentDetailsNav(fields.data.item.children.results),
      closeLabel: closeLabel,
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <ContentDetailNav {...ContentDetailsNavProps} />
      </AnchorComponent>
    );
  }

  return <ContentDetailNavDefaultComponent />;
};

export const Default = (props: ContentDetailNavDataProps): JSX.Element => {
  return ContentDetailNavMarkup(props);
};
