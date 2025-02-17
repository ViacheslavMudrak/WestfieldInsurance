import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { getElementPosition } from 'lib/utils';
import { useEffect, useRef, useState } from 'react';
import { ElementDocumentPosition, SiteLink } from 'src/types/generic';
import useIsTablet from '../../hooks/useIsTablet';
import styles from './content-detail.module.scss';

export type NavigationProps = {
  navTitle?: JSX.Element | string;
  navLinks?: SiteLink[];
  closeLabel?: string;
};

export interface MappedSiteLinks {
  pageLink: string;
  elementLink: SiteLink;
  offset: ElementDocumentPosition;
}

export default function ContentDetailNav({
  navTitle,
  navLinks,
  closeLabel,
}: NavigationProps): JSX.Element {
  const isTablet = useIsTablet();
  const [mobileNavShown, setMobileNavShown] = useState(false);
  const [selectedMobileLink, setSelectedMobileLink] = useState<SiteLink>();
  const [mappedSiteLinks, setMappedSiteLinks] = useState<MappedSiteLinks[]>([]);

  useEffect(() => {
    const checkActiveElement = () => {
      const isActive = (eleY: number, docY: number): boolean => eleY - docY - 150 < 0;
      for (const mappedLink of mappedSiteLinks) {
        if (isActive(mappedLink.offset.top, window.scrollY))
          setSelectedMobileLink(mappedLink.elementLink);
      }
    };

    if (navLinks?.length && mappedSiteLinks.length === 0) {
      setSelectedMobileLink(navLinks[0]);

      const pageLinks: MappedSiteLinks[] = [];

      for (const link of navLinks) {
        let pageLink = link?.field?.value?.href;
        if (
          !pageLink &&
          link?.field?.value?.anchor &&
          link?.field?.value?.anchor.indexOf('#') < 0
        ) {
          pageLink = '#' + link?.field?.value?.anchor;
        }
        if (pageLink?.startsWith('#')) {
          const linkArea = document.querySelector(pageLink);
          if (linkArea) {
            pageLinks.push({
              pageLink: pageLink,
              elementLink: link,
              offset: getElementPosition(linkArea),
            });
          }
        }
        setMappedSiteLinks(pageLinks);
      }
    }

    checkActiveElement();

    document.addEventListener('scroll', checkActiveElement);

    return () => {
      document.removeEventListener('scroll', checkActiveElement);
    };
  }, [navLinks, mappedSiteLinks, isTablet]);

  const btnRef = useRef<HTMLButtonElement>(null);

  const showNav = () => {
    const hasNav = navLinks ? navLinks.length > 0 : false;
    if (!hasNav) return false;
    if (isTablet) {
      return true;
    }
    if (mobileNavShown) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (mobileNavShown) {
      if (btnRef.current && 'focus' in btnRef.current) {
        btnRef.current.focus();
      }
    }
  }, [mobileNavShown]);

  const navSelected = (el: SiteLink) => {
    setMobileNavShown(false);
    setSelectedMobileLink(el);
    return true;
  };

  return (
    <>
      {navTitle && <h2 className={styles.navTitle}>{navTitle}</h2>}
      {!isTablet && !mobileNavShown && selectedMobileLink?.field.value.text && (
        <button
          className={styles.navMobileToggle}
          onClick={() => setMobileNavShown(!mobileNavShown)}
          aria-expanded={false}
        >
          {selectedMobileLink && <>{selectedMobileLink.field.value.text}</>}
        </button>
      )}
      {showNav() && (
        <div className={classNames(styles.navBox, !isTablet ? styles.navMobileBox : '')}>
          {!isTablet && mobileNavShown && (
            <button
              className={styles.navMobileHide}
              onClick={() => setMobileNavShown(false)}
              ref={btnRef}
              aria-expanded={true}
            >
              <span className="sr-only">{closeLabel}</span>
            </button>
          )}
          {navLinks &&
            navLinks.map((el) => (
              <Link
                key={el.id}
                field={el.field}
                className={classNames(
                  styles.link,
                  !isTablet ? styles.navMobileLink : '',
                  selectedMobileLink && selectedMobileLink.id === el.id ? styles.active : ''
                )}
                onClick={() => navSelected(el)}
                aria-current={selectedMobileLink && selectedMobileLink.id === el.id}
              />
            ))}
        </div>
      )}
    </>
  );
}
