import classNames from 'classnames';
import ChevronRight from 'src/assets/icons/right-chevron.svg';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './breadcrumbs.module.scss';
import { useEffect, useState } from 'react';

export interface BreadcrumbsProps {
  links: Breadcrumb[];
  backLabel?: string;
}

export type Breadcrumb = {
  title: JSX.Element | string;
  path: string;
};

export default function Breadcrumbs({ links, backLabel }: BreadcrumbsProps): JSX.Element {
  const backCrumb = links.at(-2);
  const backPath = backCrumb && backCrumb.path;

  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
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
    <Container>
      <Row>
        <Col>
          <nav aria-label="breadcrumb">
            <ol className={classNames(styles.breadcrumbs, zoomed ? styles.zoomed : '')}>
              {links.map((link, index) => {
                return (
                  <li key={index} className={styles.crumb}>
                    {index === links.length - 1 ? (
                      <div className={styles.last} aria-current="page">
                        {link.title}
                      </div>
                    ) : (
                      <>
                        <a href={link.path} className={styles.link}>
                          {link.title}
                        </a>
                        <span className={styles.slash}>/</span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
            <div className={styles.backLinkWrapper}>
              <a type="button" href={backPath} className={styles.backLink}>
                <ChevronRight className={classNames(styles.arrow, styles.mobileChevron)} />
                <span className={styles.navItemBack}>{backLabel}</span>
              </a>
            </div>
          </nav>
        </Col>
      </Row>
    </Container>
  );
}
