import styles from './quick-links.module.scss';
import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { CardLink } from 'src/types/cardLink';

export interface QuickLinksCardProps {
  card: CardLink;
  isEditing?: boolean;
}

export default function QuickLinksCard({ card, isEditing }: QuickLinksCardProps): JSX.Element {
  const { icon, link } = card;
  return (
    <div key={link.id} className={styles.linksItem}>
      <div className={styles.linksItemImage}>{icon}</div>
      <span className={styles.linksItemTitle}>
        <Link
          {...link}
          className={classNames(styles.quicklinksCardLinkText, isEditing ? 'pages-card-link' : '')}
        ></Link>
      </span>
    </div>
  );
}
