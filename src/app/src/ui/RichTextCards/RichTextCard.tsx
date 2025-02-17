import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { ImageLink } from 'src/types/imageLink';
import styles from './richText-cards.module.scss';

export interface RichTextCardProps {
  card: ImageLink;
  isEditing: boolean;
}

export default function RichTextCard({ card, isEditing }: RichTextCardProps): JSX.Element {
  const { image, content, link, title } = card;

  const renderContent = (content: JSX.Element | string) => {
    if (typeof content === 'string') {
      return (
        <span className={styles.cardsItemText} dangerouslySetInnerHTML={{ __html: content }} />
      );
    }
    return <span className={styles.cardsItemText}>{content}</span>;
  };

  const hasLink = (): boolean => {
    return !!(link && link.field && link.field.value && link.field.value.href);
  };

  return (
    <div className={styles.cardsItem}>
      <div className={styles.cardsItemBox}>
        <div className={styles.cardsItemImage}>
          {link && hasLink() ? (
            <Link field={link.field} className={classNames(styles.richTextCardLinkImage)}>
              {image}
            </Link>
          ) : (
            <div className={classNames(styles.richTextCardLinkImage)}>{image}</div>
          )}
        </div>
        <h3 className={styles.cardsItemTitle}>
          {link && hasLink() ? (
            <Link
              field={link.field}
              className={classNames(
                styles.richTextCardLinkText,
                isEditing ? 'pages-card-link' : ''
              )}
              editable={isEditing}
            >
              {title}
            </Link>
          ) : (
            <span
              className={classNames(
                styles.richTextCardLinkText,
                isEditing ? 'pages-card-link' : ''
              )}
            >
              {title}
            </span>
          )}
        </h3>
        {renderContent(content)}
      </div>
    </div>
  );
}
