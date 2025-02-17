import { Roboto } from 'next/font/google';
import Link from 'next/link';
import WestFieldLogoDark from 'src/assets/icons/westfield-logo-dark.svg';
import WestfieldLogoLight from 'src/assets/icons/westfield-logo-light.svg';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './layout-simple.module.scss';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

interface LayoutProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export default function LayoutSimple({ children }: LayoutProps): JSX.Element {
  return (
    <div className="site-container">
      <style jsx global>{`
        html,
        body {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <header className={styles.header}>
        <Container>
          <Row>
            <Col>
              <Link className={styles.headerLogo} href="/" aria-label="Link to homepage">
                <WestFieldLogoDark />
              </Link>
            </Col>
          </Row>
        </Container>
      </header>
      <main id="maincontent" className="site-container" tabIndex={-1}>
        {children}
      </main>
      <footer className={styles.footer}>
        <Container>
          <Row>
            <Col>
              <div className={styles.footerLogo}>
                <WestfieldLogoLight />
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
