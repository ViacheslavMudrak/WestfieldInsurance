import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { IsEditing } from 'components/Helpers/ContentUtil';
import HubspotForm, { HubspotFormProps } from 'src/ui/HubspotForm/HubspotForm';
import AnchorComponent from './AnchorComponent';

interface Fields {
  Title: Field<string>;
  Region: Field<string>;
  PortalId: Field<string>;
  FormId: Field<string>;
}

export type HubspotFormDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HubspotFormMarkup = ({ fields, params }: HubspotFormDataProps): JSX.Element => {
  const HubspotFormDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">Embedded Form</span>
  );

  if (fields) {
    const hubspotFormProps: HubspotFormProps = {
      title: <Text field={fields.Title} editable={IsEditing()} />,
      region: IsEditing() ? (
        <Text field={fields.Region} editable={IsEditing()} />
      ) : (
        fields.Region.value.toString()
      ),
      portalId: IsEditing() ? (
        <Text field={fields.PortalId} editable={IsEditing()} />
      ) : (
        fields.PortalId.value.toString()
      ),
      formId: IsEditing() ? (
        <Text field={fields.FormId} editable={IsEditing()} />
      ) : (
        fields.FormId.value.toString()
      ),
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <HubspotForm {...hubspotFormProps} />
      </AnchorComponent>
    );
  }

  return IsEditing() ? <HubspotFormDefaultComponent /> : <></>;
};

export const Default = (props: HubspotFormDataProps): JSX.Element => {
  return HubspotFormMarkup(props);
};
