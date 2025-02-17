import A11YNav from 'a11y-nav';
import CaretDown from 'assets/icons/caret-down.svg';
import ChevronRight from 'assets/icons/right-chevron.svg';
import classNames from 'classnames';
import { useRef } from 'react';
import { Menu } from 'src/types/menu';
import NavMenu from './NavMenu';
import styles from './navigation.module.scss';

export interface NavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  item: Menu;
  navObject: A11YNav | null;
}

export default function NavItem({ item, navObject, ...props }: NavItemProps): JSX.Element {
  const btnRef = useRef<HTMLButtonElement>(null);

  function goBack() {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
      btnRef.current.focus();
    }
  }

  return (
    <li className={styles.topLevelMenuLi} {...props}>
      <button
        type="button"
        aria-expanded={false}
        aria-controls={item.id}
        className={classNames(styles.item, styles.trigger, styles.desktopItem)}
        ref={btnRef}
      >
        <span className={styles.navItemName}>{item.name}</span>
        <CaretDown className={classNames(styles.arrow, styles.desktopCaret)} />
        <ChevronRight className={classNames(styles.arrow, styles.mobileChevron)} />
      </button>
      <NavMenu navObject={navObject} menu={item} handleBackBtn={goBack} />
    </li>
  );
}
