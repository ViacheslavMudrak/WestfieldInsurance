import { useLayoutEffect, useRef } from 'react';
import styles from './embedded-form.module.scss';

export interface EmbeddedFormProps {
  title?: JSX.Element | string;
  schema?: string;
  isEditing?: boolean;
  EditingField?: JSX.Element;
}

export default function EmbeddedForm({
  title,
  schema,
  isEditing,
  EditingField,
}: EmbeddedFormProps): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const range = document.createRange();
    range.selectNode(elRef.current as Node);
    const documentFragment = range.createContextualFragment(schema || '');

    // Inject the markup, triggering a re-run!
    if (elRef.current) {
      elRef.current.innerHTML = '';
      elRef.current.append(documentFragment);
    }
  }, []);

  return (
    <div className={styles.formItem}>
      {!!title && <div className={styles.formItemTitle}>{title}</div>}
      {isEditing && EditingField}
      <div
        ref={elRef}
        className={styles.scriptWrapper}
        dangerouslySetInnerHTML={{ __html: schema || '' }}
      ></div>
    </div>
  );
}
