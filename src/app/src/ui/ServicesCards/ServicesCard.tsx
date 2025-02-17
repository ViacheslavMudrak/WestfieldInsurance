import classNames from 'classnames';
import { SiteLink } from 'src/types/generic';
import styles from './services-card.module.scss';

export interface ServicesCard {
  icon?: JSX.Element;
  title?: JSX.Element | string;
  richTextCopy?: JSX.Element | string;
  link: SiteLink;
}

export interface ServicesCardProps {
  card: ServicesCard;
  isEditing: boolean;
}

export default function ServicesCard({ card, isEditing }: ServicesCardProps): JSX.Element {
  const { icon, title, richTextCopy, link } = card;
  return (
    <div className={styles.servicesCard}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {title && (
        <h3 className={styles.title}>
          <a
            href={
              link.field.value.anchor
                ? link.field.value.href + '#' + link.field.value.anchor
                : link.field.value.href
            }
            className={classNames(styles.servicesCardLinkText, isEditing ? 'pages-card-link' : '')}
          >
            {link.field.value.text
              ? link.field.value.text
              : link.field.value.title
              ? link.field.value.title
              : link.field.value.href}
          </a>
        </h3>
      )}
      {richTextCopy && (
        <div className={classNames(styles.richText, 'rich-text')}>{richTextCopy}</div>
      )}
    </div>
  );
}
