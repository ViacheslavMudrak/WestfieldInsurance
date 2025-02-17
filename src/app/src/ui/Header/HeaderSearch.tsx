import { useEffect, useRef, useState } from 'react';
import SearchIcon from 'src/assets/icons/search.svg';
import CloseIcon from 'src/assets/icons/close-black.svg';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import useToggle from 'src/hooks/useToggle';
import Search, { SearchProps } from '../Search/Search';
import styles from './header-search.module.scss';
import classNames from 'classnames';

export default function HeaderSearch(props: SearchProps): JSX.Element {
  const [searchOpen, toggleSearchOpen] = useToggle();
  const [zoomed, setZoomed] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(searchRef, () => toggleSearchOpen(false));

  useEffect(() => {
    reportWindowSize();
    window.addEventListener('resize', reportWindowSize);
  });

  function reportWindowSize() {
    let zoom = Math.round((window?.outerWidth / window.innerWidth) * 100) / 100;

    const userAgent = navigator.userAgent;
    if (userAgent.match(/firefox|fxios/i)) {
      zoom = window.devicePixelRatio;
    }
    if (zoom && zoom > 1.7) {
      setZoomed(true);
    } else {
      setZoomed(false);
    }
  }

  return (
    <div
      ref={searchRef}
      className={classNames(styles.toggleSearchContainer, zoomed ? styles.zoomed : '')}
    >
      <button
        className={styles.toggleSearch}
        onClick={() => toggleSearchOpen()}
        aria-expanded={searchOpen}
        aria-label="search"
      >
        <SearchIcon />
      </button>
      <div className={classNames(styles.container, !searchOpen ? styles.hideSearchContainer : '')}>
        <div className={styles.title}>Search</div>
        <Search accessToken={props.accessToken} organizationId={props.organizationId} />
        <button
          className={styles.closeSearch}
          onClick={() => toggleSearchOpen(false)}
          onBlur={() => toggleSearchOpen(false)}
          aria-expanded={searchOpen}
          aria-label="close search"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
