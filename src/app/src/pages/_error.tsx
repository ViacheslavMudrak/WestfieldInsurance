import { NextPage } from 'next';
import Head from 'next/head';
import styles from './error.module.css';

interface ErrorPageProps {
  statusCode?: number | null | undefined;
}

/**
 * Rendered for 500 errors on both server and client. Used only in Production mode.
 * @link https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing
 */
const ErrorPage: NextPage<ErrorPageProps> = () => (
  <>
    <Head>
      <title>Error</title>
    </Head>
    <body className={styles.error}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <h1 className={(styles.error_title, styles.error)}>Houston, we have a 500 problem!</h1>
          <p className={styles.error}>
            It seems this page is lost in the vast expanse of cyberspace.
          </p>
          <a className={styles.error} href="/">
            Take me back home
          </a>
        </div>
      </div>
    </body>
  </>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
