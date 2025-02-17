import { Text, Field, ImageField, LinkField, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import ExampleComponent, {
  ExampleComponentPropsUi,
} from 'src/ui/ExampleComponent/ExampleComponent';
import { GetLink } from '../Helpers/ContentUtil';
import NextImageExtended from 'components/Helpers/NextImageExtended';

interface Fields {
  Title: Field<string>;
  RichTextCopy: Field<string>;
  Copy: Field<string>;
  Link: LinkField;
  Image: ImageField;
}

type ExampleComponentProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ExampleComponentDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Example Component</span>
);

const ExampleComponentMarkup = (props: ExampleComponentProps): JSX.Element => {
  if (props.fields) {
    const exampleComponentProps: ExampleComponentPropsUi = {
      title: <Text field={props.fields.Title} />,
      richTextCopy: <RichText field={props.fields.RichTextCopy} />,
      copy: <Text field={props.fields.Copy} />,
      image: <NextImageExtended field={props.fields.Image} />,
      link: GetLink(props.fields.Link),
    };
    return <ExampleComponent {...exampleComponentProps} />;
  }

  return <ExampleComponentDefaultComponent />;
};

export const Default = (props: ExampleComponentProps): JSX.Element => {
  return ExampleComponentMarkup(props);
};
