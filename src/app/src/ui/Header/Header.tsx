import classNames from 'classnames';
import Link from 'next/link';
import { SiteLink } from 'src/types/generic';
import { Menu } from 'src/types/menu';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import Navigation from '../Navigation/Navigation';
import HeaderLogin from './HeaderLogin';
import HeaderSearch from './HeaderSearch';
import HeaderTopLinks from './HeaderTopLinks';
import styles from './header.module.scss';

export interface HeaderProps {
  logo: JSX.Element;
  links: SiteLink[];
  loginLinks: SiteLink[];
  navMenu: Menu[];
  accessToken?: string;
  organizationId?: string;
}

export default function Header(props: HeaderProps): JSX.Element {
  const { logo, links, loginLinks, navMenu } = props;

  return (
    <header className={styles.header}>
      <a className="sr-only focusable" href="#maincontent">
        Skip to Main Content
      </a>

      <div className={styles.top}>
        <Container className={styles.fullTabletWidthElement}>
          <Row className={styles.fullTabletWidthElement}>
            <Col className={styles.topLinks}>
              <HeaderTopLinks links={links} />
              <HeaderLogin links={loginLinks} />
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.bottom}>
        <Container className={classNames(styles.fullHeightElement, styles.fullTabletWidthElement)}>
          <Row className={classNames(styles.fullHeightElement, styles.fullTabletWidthElement)}>
            <Col className={styles.bottomLinks}>
              <Link className={styles.darkLogo} href="/" aria-label="Link to homepage">
                {logo}
              </Link>
              <HeaderLogin links={loginLinks} className={styles.mobileLoginBtn} />
              <Navigation
                links={links}
                menu={navMenu}
                accessToken={props.accessToken}
                organizationId={props.organizationId}
              />
              {props.accessToken && props.organizationId && (
                <HeaderSearch
                  accessToken={props.accessToken}
                  organizationId={props.organizationId}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </header>
  );
}
