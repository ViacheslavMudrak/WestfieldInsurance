import AnchorComponent from './AnchorComponent';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { IsEditing } from 'components/Helpers/ContentUtil';
import EmbeddedForm, { EmbeddedFormProps } from 'src/ui/EmbeddedForm/EmbeddedForm';

interface Fields {
  Title: Field<string>;
  EmbeddedFormCode: Field<string>;
}

export type EmbeddedFormDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const EmbeddedFormMarkup = ({ fields, params }: EmbeddedFormDataProps): JSX.Element => {
  const EmbeddedFormDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">Embedded Form</span>
  );

  if (fields) {
    const embeddedFormProps: EmbeddedFormProps = {
      title: <Text field={fields.Title} editable={IsEditing()} />,
      schema: fields.EmbeddedFormCode.value.toString(),
      EditingField: (
        <>
          Edit Embedded Form Code: <Text field={fields.EmbeddedFormCode} />
        </>
      ),
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <EmbeddedForm {...embeddedFormProps} />
      </AnchorComponent>
    );
  }

  return IsEditing() ? <EmbeddedFormDefaultComponent /> : <></>;
};

export const Default = (props: EmbeddedFormDataProps): JSX.Element => {
  return EmbeddedFormMarkup(props);
};
