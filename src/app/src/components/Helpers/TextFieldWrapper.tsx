import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

export type TextProps = {
  params?: { [key: string]: string };
  field: Field<string>;
};
const TextFieldWrapper = (props: TextProps): JSX.Element => {
  const textField = <Text field={props.field} />;

  return textField;
};

export default TextFieldWrapper;
