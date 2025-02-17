import { Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import styles from './navigation-card.module.scss';

export interface NavFeaturedCardProps {
  image?: JSX.Element;
  title?: string;
  content?: string;
  link: LinkField;
  handleBlur?: () => void;
  closeAllMenus?: () => void;
}

export default function NavFeaturedCard(props: NavFeaturedCardProps): JSX.Element {
  const { image, title, content, link, handleBlur, closeAllMenus } = props;
  return (
    <li className={styles.navCard}>
      <Link onClick={closeAllMenus} field={link} editable={false} onBlur={() => handleBlur?.()}>
        {image}
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          {content && <div className={styles.text}>{content}</div>}
        </div>
      </Link>
    </li>
  );
}
