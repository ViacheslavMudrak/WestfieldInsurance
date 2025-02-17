import FooterSocial from './FooterSocial';
import styles from './footer-contact.module.scss';

export interface FooterContactProps {
  socialItems: JSX.Element[];
  contactItems: JSX.Element[];
}

export default function FooterContact(props: FooterContactProps): JSX.Element {
  const { socialItems, contactItems } = props;
  return (
    <div className={styles.contact}>
      {contactItems &&
        contactItems.map((item, _index) => (
          <div className={styles.contactLine} key={_index}>
            {item}
          </div>
        ))}
      <FooterSocial items={socialItems} />
    </div>
  );
}
