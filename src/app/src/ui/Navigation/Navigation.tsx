import A11YNav from './a11y-nav';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from 'src/assets/icons/close.svg';
import HamburgerIcon from 'src/assets/icons/hamburger.svg';
import useIsTablet from 'src/hooks/useIsTablet';
import { SiteLink } from 'src/types/generic';
import { Menu } from 'src/types/menu';
import HeaderTopLinks from '../Header/HeaderTopLinks';
import Search from '../Search/Search';
import NavItem from './NavItem';
import styles from './navigation.module.scss';

export interface NavigationProps {
  links: SiteLink[];
  menu: Menu[];
  accessToken?: string;
  organizationId?: string;
}

export default function Navigation(props: NavigationProps): JSX.Element {
  const { links, menu } = props;
  const menuRef = useRef<HTMLUListElement>(null);

  const a11yNav = useRef<A11YNav | null>(null);
  const isTablet = useIsTablet();
  const [dynamicStyle, setDynamicStyle] = useState({ height: '' });
  const initialDynamicStyle = {};

  useEffect(() => {
    setDynamicStyle({ height: isTablet ? '' : 'calc((var(--vh, 1vh) * 100) - 120px)' });
  }, [isTablet]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Only count the banner which is in header
      const banner = document.querySelector(
        '[class*="alert-banner_wrapper"]:not(footer~[class*="alert-banner_wrapper"])'
      ) as HTMLDivElement;
      if (banner) {
        const computedStyle = window.getComputedStyle(banner);
        const height = parseInt(computedStyle.getPropertyValue('height'), 10);
        setDynamicStyle({
          height: isTablet ? '' : `calc((var(--vh, 1vh) * 100) - 120px - ${height}px)`,
        });
        clearInterval(interval);
      }
    }, 500);
  }, [isTablet]);

  useEffect(() => {
    // dynamically change --vh variable when screen resized
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      const vh2 = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh2}px`);
    });
  }, []);

  useEffect(() => {
    if (menuRef.current && !a11yNav.current) {
      a11yNav.current = new A11YNav(menuRef.current, {
        duration: 0,
        focusOnOpen: false,
      });
    }

    return () => {
      a11yNav.current?.destroy();
      a11yNav.current = null;
    };
  }, [isTablet]);

  useEffect(() => {
    const handleHeaderLinkClick = (event: Event) => {
      const customEvent = event as CustomEvent;
      a11yNav.current?.closeAllMenus();
      return customEvent;
    };

    window.addEventListener('headerLinkClick', handleHeaderLinkClick);

    return () => {
      window.removeEventListener('headerLinkClick', handleHeaderLinkClick);
    };
  }, []);

  return (
    <nav className={styles.navigation} role="navigation" ref={menuRef}>
      <button
        type="button"
        aria-controls="nav-menu"
        aria-expanded="false"
        className={styles.hamburgerButton}
      >
        <HamburgerIcon />
        <CloseIcon />
        <span className={classNames('sr-only')}>Toggle navigation</span>
      </button>
      <div
        id="nav-menu"
        className={styles.nav}
        style={dynamicStyle?.height ? dynamicStyle : initialDynamicStyle}
      >
        <div className={styles.topLevelMenu}>
          <ul className={styles.mobileMenuTop}>
            <Search
              className={styles.mobileMenuSearch}
              accessToken={props.accessToken}
              organizationId={props.organizationId}
            />
            {menu &&
              menu.map((item) => {
                return (
                  <NavItem
                    navObject={a11yNav ? a11yNav.current : null}
                    className={styles.topLevelMenuLi}
                    item={item}
                    key={item.id}
                  />
                );
              })}
          </ul>
          <div className={styles.mobileMenuLinks}>
            <HeaderTopLinks links={links} />
          </div>
        </div>
      </div>
    </nav>
  );
}
