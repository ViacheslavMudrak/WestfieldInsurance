import { Text, Field, ImageField, LinkField, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetDictionaryPhrase, GetStyle } from '../Helpers/ContentUtil';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import Error, { ErrorProps } from 'src/ui/Error/Error';
import Cta from 'components/Helpers/Cta';
import { repositoryConstants } from 'src/repository/constants';
import { ButtonVariants } from 'src/types/generic';

interface Fields {
  Title: Field<string>;
  RichTextCopy: Field<string>;
  Copy: Field<string>;
  Link: LinkField;
  Image: ImageField;
  SearchEngine: {
    fields: {
      AccessToken: Field<string>;
      OrganizationId: Field<string>;
    };
  };
}

type Custom404Props = {
  params: { [key: string]: string };
  fields: Fields;
};

const Custom404DefaultComponent = (text: string): JSX.Element => (
  <span className="is-empty-hint">{text}</span>
);

const Custom404Markup = (props: Custom404Props): JSX.Element => {
  const selectSearchEngineText = GetDictionaryPhrase('select-search-engine');
  if (
    props.fields.SearchEngine === null ||
    props.fields.SearchEngine?.fields?.AccessToken?.value === null ||
    props.fields.SearchEngine?.fields?.OrganizationId?.value === null
  ) {
    return Custom404DefaultComponent(selectSearchEngineText);
  }

  if (props.fields) {
    const custom404Props: ErrorProps = {
      title: <Text field={props.fields.Title} />,
      richTextCopy: <RichText field={props.fields.RichTextCopy} />,
      image: <NextImageExtended field={props.fields.Image} />,
      link: (
        <Cta
          link={props.fields.Link}
          style={
            GetStyle(
              props.params && props.params.Styles ? props.params.Styles : '',
              repositoryConstants.styles.ctaStyleName,
              repositoryConstants.styles.ctaDefaultStyle
            ) as ButtonVariants
          }
        />
      ),
      orgId: props.fields.SearchEngine.fields.OrganizationId.value,
      accessToken: props.fields.SearchEngine.fields.AccessToken.value,
    };
    return <Error {...custom404Props} />;
  }

  return Custom404DefaultComponent('Custom 404 Component');
};

export const Default = (props: Custom404Props): JSX.Element => {
  return Custom404Markup(props);
};
