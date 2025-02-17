import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { SiteLink } from 'src/types/generic';
import styles from './benefit-card.module.scss';

export interface BenefitCard {
  icon?: JSX.Element;
  title?: JSX.Element | string;
  richTextCopy?: JSX.Element | string;
  link: SiteLink;
}

export interface BenefitCardProps {
  card: BenefitCard;
  isDarkTheme?: boolean;
  isEditing?: boolean;
}

export default function BenefitsCard({
  card,
  isEditing,
  isDarkTheme,
}: BenefitCardProps): JSX.Element {
  const { icon, title, richTextCopy, link } = card;
  return !isEditing ? (
    !link.field.value.href ? (
      <div className={styles.card}>
        <div className={styles.content}>
          {icon && (
            <span className={classNames(styles.icon, isDarkTheme ? styles.darkTheme : '')}>
              {icon}
            </span>
          )}
          {title && <h3 className={styles.title}>{title}</h3>}
          {richTextCopy && (
            <div className={classNames(styles.richText, 'rich-text')}>{richTextCopy}</div>
          )}
        </div>
      </div>
    ) : (
      <div className={classNames(styles.card, styles.hasLink, isDarkTheme ? styles.darkTheme : '')}>
        <div className={styles.content}>
          {icon && (
            <span className={classNames(styles.icon, isDarkTheme ? styles.darkTheme : '')}>
              {icon}
            </span>
          )}
          {title && (
            <h3 className={styles.title}>
              <Link
                field={link.field}
                className={classNames(
                  styles.benefitsCardLinkText,
                  isEditing ? 'pages-card-link' : ''
                )}
                editable={isEditing}
              >
                {title}
              </Link>
            </h3>
          )}
          {richTextCopy && (
            <div className={classNames(styles.richText, 'rich-text')}>{richTextCopy}</div>
          )}
        </div>
      </div>
    )
  ) : (
    <div className={styles.card}>
      <div className={styles.content}>
        <div>
          Card Link: <Link field={link.field} editable={isEditing} />
        </div>
        {icon && (
          <span className={classNames(styles.icon, isDarkTheme ? styles.darkTheme : '')}>
            {icon}
          </span>
        )}
        {title && <h3 className={styles.title}>{title}</h3>}
        {richTextCopy && (
          <div className={classNames(styles.richText, 'rich-text')}>{richTextCopy}</div>
        )}
      </div>
    </div>
  );
}
