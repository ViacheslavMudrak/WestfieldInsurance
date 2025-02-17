import styles from './footer-social.module.scss';

export interface FooterSocialProps {
  items: (JSX.Element | null)[];
}

export default function FooterSocial({ items }: FooterSocialProps): JSX.Element {
  return (
    <ul className={styles.list}>
      {items &&
        items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
          </li>
        ))}
    </ul>
  );
}
