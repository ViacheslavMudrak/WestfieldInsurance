import styles from './insights-cards.module.scss';
import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { ImageLink } from 'src/types/imageLink';

export interface InsightsCardProps {
  card: ImageLink;
  isEditing: boolean;
}

export default function InsightCard({ card, isEditing }: InsightsCardProps): JSX.Element {
  const { image, content, link } = card;
  return (
    <div className={styles.cardsItem}>
      <div className={styles.cardsItemBox}>
        <div className={styles.cardsItemImage}>{image}</div>
        <h3 className={styles.cardsItemTitle}>
          {link && (
            <Link
              field={link.field}
              className={classNames(
                styles.insightsCardLinkText,
                isEditing ? 'pages-card-link' : ''
              )}
              editable={isEditing}
            ></Link>
          )}
        </h3>
        <span className={styles.cardsItemText}>{content}</span>
      </div>
    </div>
  );
}
