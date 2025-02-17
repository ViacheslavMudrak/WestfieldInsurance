import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import ChevronDown from 'src/assets/icons/down-chevron.svg';
import useIsTablet from 'src/hooks/useIsTablet';
import useToggle from 'src/hooks/useToggle';
import { Category } from 'src/types/category';
import styles from './footer.module.scss';

export interface FooterNavigationProps {
  category: Category;
}

export default function FooterNavigation(props: FooterNavigationProps): JSX.Element {
  const { category } = props;
  const [showLinks, toggleShowLinks] = useToggle();
  const isTablet = useIsTablet();

  return (
    <div className={styles.linksBlock}>
      {!isTablet && (
        <>
          <h2 className={styles.navTitleHeader}>
            <button
              onClick={() => toggleShowLinks(!showLinks)}
              className={classNames(styles.navTitle, showLinks ? 'open' : null)}
              aria-expanded={showLinks}
            >
              {category.title}
              <ChevronDown />
            </button>
          </h2>
        </>
      )}
      <ul className={showLinks ? 'show' : ''}>
        {isTablet && (
          <li>
            <h2 className={styles.navTitle}>{category.title}</h2>
          </li>
        )}
        {category &&
          category.links &&
          category.links.map((link) => (
            <li key={link.id}>
              <Link field={link.field} />
            </li>
          ))}
      </ul>
    </div>
  );
}
