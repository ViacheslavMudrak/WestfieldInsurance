import classNames from 'classnames';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { exampleAlertBannerProps } from 'src/data/alertBanner';
import { DUMMY_CATEGORIES_TWO } from 'src/data/categories';
import {
  DUMMY_FOOTER_CONTACT,
  DUMMY_FOOTER_LINKS,
  DUMMY_FOOTER_LOCATIONS,
  DUMMY_FOOTER_LOGO,
  DUMMY_FOOTER_SOCIAL,
} from 'src/data/footer';
import { DUMMY_HEADER_LOGO, DUMMY_LOGIN_LINKS, DUMMY_TOP_LINKS } from 'src/data/header';
import { DUMMY_MENU } from 'src/data/menu';
import AlertBanner from '../AlertBanner/AlertBanner';
import CutsListing from '../Cuts/CutsListing';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

interface LayoutProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  banner?: React.ReactNode;
}

export default function LayoutStatic({
  children,
  header,
  footer,
  ...rest
}: LayoutProps): JSX.Element {
  const { pathname } = useRouter();
  const { className } = rest;

  return (
    <div className={classNames('site-container', className)} {...rest}>
      <style jsx global>{`
        html,
        body {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      {header ? (
        header
      ) : (
        <>
          <Header
            logo={DUMMY_HEADER_LOGO}
            links={DUMMY_TOP_LINKS}
            loginLinks={DUMMY_LOGIN_LINKS}
            navMenu={DUMMY_MENU}
          />
        </>
      )}
      <main id="maincontent" className="site-container" tabIndex={-1}>
        {children}
      </main>
      {footer ? (
        footer
      ) : (
        <>
          <Footer
            logo={DUMMY_FOOTER_LOGO}
            locationData={DUMMY_FOOTER_LOCATIONS}
            contactData={DUMMY_FOOTER_CONTACT}
            socialData={DUMMY_FOOTER_SOCIAL}
            navigation={DUMMY_CATEGORIES_TWO}
            links={DUMMY_FOOTER_LINKS}
          />
          <AlertBanner {...exampleAlertBannerProps()} />
        </>
      )}
      {pathname.startsWith('/cuts') && <CutsListing />}
    </div>
  );
}
