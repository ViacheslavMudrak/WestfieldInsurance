import Script from 'next/script';
import { useRef } from 'react';
import styles from './hubspot-form.module.scss';

export interface HubspotFormProps {
  title?: JSX.Element | string;
  region?: JSX.Element | string;
  portalId?: JSX.Element | string;
  formId?: JSX.Element | string;
  isEditing?: boolean;
  EditingField?: JSX.Element;
}

export default function HubspotForm({
  title,
  region,
  portalId,
  formId,
  isEditing,
  EditingField,
}: HubspotFormProps): JSX.Element {
  const mapRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.formItem}>
      {!!title && <div className={styles.formItemTitle}>{title}</div>}
      {isEditing && EditingField}
      <div ref={mapRef} className={styles.scriptWrapper} id="hubspotform"></div>
      <Script
        src="https://js.hsforms.net/forms/embed/v2.js"
        onReady={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: '#hubspotform',
          });
        }}
      />
    </div>
  );
}
