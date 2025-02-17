import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { Fragment } from 'react';
import { FooterContentType } from 'src/types/footer';
import styles from './footer-links.module.scss';

export interface FooterLinkProps {
  links: FooterContentType[];
}

export default function FooterLinks(props: FooterLinkProps): JSX.Element {
  const { links } = props;
  return (
    <div className={styles.copyrightAndLinks}>
      <div className={styles.links}>
        {links.map(({ type, content, id }, index) => {
          return (
            <Fragment key={id}>
              {type === 'text' ? <span>{content.text}</span> : null}
              {type === 'link' ? <Link field={content.field} className={styles.link} /> : null}
              {index !== links.length - 1 && <span className={styles.divider}>|</span>}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
