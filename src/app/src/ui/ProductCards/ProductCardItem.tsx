import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { ProductCard } from 'src/types/productCard';
import styles from './product-cards.module.scss';

export interface ProductCardItemProps {
  card: ProductCard;
  isEditing?: boolean;
}

export default function ProductCardItem({ card, isEditing }: ProductCardItemProps): JSX.Element {
  return (
    <div key={card.link.id} className={classNames(styles.cardItemLink, 'cardItemLink')}>
      <div className={styles.cardItemBox}>
        <div className={styles.cardItemImage}>
          <div className={styles.cardImageWrap}>{card.icon}</div>
        </div>
        <h3 className={styles.cardItemTitle}>
          <Link
            {...card.link}
            className={classNames(styles.productsCardLinkText, isEditing ? 'pages-card-link' : '')}
          ></Link>
        </h3>
        <div className={styles.cardItemText}>{card.content}</div>
      </div>
    </div>
  );
}
