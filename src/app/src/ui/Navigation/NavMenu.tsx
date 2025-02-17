import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import A11YNav from 'a11y-nav';
import ChevronDown from 'assets/icons/down-chevron.svg';
import ChevronRight from 'assets/icons/right-chevron.svg';
import classNames from 'classnames';
import CircleArrow from 'src/assets/icons/circle-arrow.svg';
import useIsTablet from 'src/hooks/useIsTablet';
import { Category } from 'src/types/category';
import { Menu } from 'src/types/menu';
import NavFeaturedCard from './NavFeaturedCard';
import styles from './navigation.module.scss';

export interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {
  menu: Menu;
  handleBackBtn: () => void;
  navObject: A11YNav | null;
}

interface ResponsiveNavProps {
  item: Category;
  closeAllMenus?: () => void;
}

export default function NavMenu({
  menu,
  handleBackBtn,
  navObject,
  ...props
}: NavMenuProps): JSX.Element {
  const { className, ...rest } = props;
  const useThreeCol = !!menu.card || menu.items.length === 3;
  const columnStyles = useThreeCol ? styles.threeCol : styles.fourCol;
  const isTablet = useIsTablet();

  function closeMenus() {
    if (navObject) navObject.closeAllMenus();
  }

  function getFormattedStackedCategories(items: Category[]): Array<Category | Category[]> {
    // invert array
    const reversed = items.slice().reverse();
    // format array, combining elements with stack prop into sub-arrays
    const formatted: Array<Category | Category[]> = reversed.reduce(function (
      arr,
      curr
    ): Array<Category | Category[]> {
      let newCurr: Category | Category[] | null = null;
      const lastItem = arr.at(-1);
      if (lastItem && Array.isArray(lastItem)) {
        if (lastItem && lastItem.at(0)?.stack) {
          lastItem.unshift(curr);
        } else if (curr.stack) {
          newCurr = [curr];
        } else {
          newCurr = curr;
        }
      } else if (curr.stack) {
        newCurr = [curr];
      } else {
        newCurr = curr;
      }
      if (newCurr !== null) arr.push(newCurr);
      return arr;
    },
    [] as Array<Category | Category[]>);
    // re-invert array to order items as they were passed in original array
    const formattedAndReversed = formatted.slice().reverse();
    return formattedAndReversed;
  }

  const formattedAndStackedCategories = getFormattedStackedCategories(menu && menu.items);

  return (
    <ul id={menu.id} className={classNames(styles.menu, className)} {...rest}>
      <li className={styles.navMenuContainer}>
        <button
          type="button"
          className={classNames(styles.trigger, styles.backBtn)}
          onClick={() => handleBackBtn()}
        >
          <ChevronRight className={classNames(styles.arrow, styles.mobileChevron)} />
          <span className={styles.navItemBack}>BACK</span>
        </button>

        <div className={styles.navMenuTitle}>
          {menu.name}
          {menu.link && (
            <Link
              onClick={closeMenus}
              aria-label={menu.name}
              className={styles.navMenuBtn}
              field={menu.link}
            >
              <CircleArrow />
            </Link>
          )}
        </div>
        <ul className={classNames(styles.navMenuItems, columnStyles)}>
          {formattedAndStackedCategories && formattedAndStackedCategories.length > 0
            ? formattedAndStackedCategories.map((item, ind) => {
                if (Array.isArray(item)) {
                  return (
                    <div key={ind}>
                      {item.map((item, ind) => {
                        return (
                          <li className={styles.categories} key={item.id}>
                            {isTablet ? (
                              <DesktopNavMenu
                                closeAllMenus={closeMenus}
                                item={item}
                                handleBlur={
                                  !menu.card && ind === menu.items.length - 1
                                    ? handleBackBtn
                                    : undefined
                                }
                              />
                            ) : (
                              <MobileNavMenu closeAllMenus={closeMenus} item={item} />
                            )}
                          </li>
                        );
                      })}
                    </div>
                  );
                } else {
                  return (
                    <li className={styles.categories} key={item.id}>
                      {isTablet ? (
                        <DesktopNavMenu
                          closeAllMenus={closeMenus}
                          item={item}
                          handleBlur={
                            !menu.card && ind === menu.items.length - 1 ? handleBackBtn : undefined
                          }
                        />
                      ) : (
                        <MobileNavMenu closeAllMenus={closeMenus} item={item} />
                      )}
                    </li>
                  );
                }
              })
            : null}
        </ul>
      </li>
      {menu.card && (
        <NavFeaturedCard {...menu.card} closeAllMenus={closeMenus} handleBlur={handleBackBtn} />
      )}
    </ul>
  );
}

function MobileNavMenu(props: ResponsiveNavProps): JSX.Element {
  const { item, closeAllMenus } = props;

  return (
    <div className={styles.mobileNavWrapper}>
      <button
        className={styles.catTitle}
        type="button"
        aria-expanded={false}
        aria-controls={item.id}
      >
        {item.title}
        <ChevronDown className={classNames(styles.arrow, styles.mobileChevron)} />
      </button>
      <ul id={item.id} className={styles.mobileSubNav}>
        {item.link && item.link.field.value.href && (
          <li className={styles.mobileSubNavLi} key={item.link.id}>
            {item.link.field.value.href && <Link onClick={closeAllMenus} field={item.link.field} />}
          </li>
        )}
        {item &&
          item.links &&
          item.links.map((link) =>
            link.field.value.href ? (
              <li className={styles.mobileSubNavLi} key={link.id}>
                <Link onClick={closeAllMenus} field={link.field} />
              </li>
            ) : null
          )}
      </ul>
    </div>
  );
}

function DesktopNavMenu(
  props: ResponsiveNavProps & { handleBlur: (() => void) | undefined }
): JSX.Element {
  const { item, handleBlur, closeAllMenus } = props;
  const { link } = item;
  return (
    <ul className={styles.desktopNavWrapper}>
      {link && link.field.value.href !== '' ? (
        <li className={styles.catTitle}>
          <a className={styles.catTitleLink} href={link.field.value.href}>
            {item.title}
          </a>
        </li>
      ) : (
        <li className={styles.catTitle}>{item.title}</li>
      )}
      {item &&
        item.links &&
        item.links.map((link, index) => (
          <li key={link.id}>
            {link.field.value.href && (
              <Link
                onClick={closeAllMenus}
                field={link.field}
                onBlur={index === item.links.length - 1 ? () => handleBlur?.() : undefined}
              />
            )}
          </li>
        ))}
    </ul>
  );
}
