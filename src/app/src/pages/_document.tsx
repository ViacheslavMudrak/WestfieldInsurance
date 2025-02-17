/* eslint-disable @next/next/no-page-custom-font */
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Head, Html, Main, NextScript } from 'next/document';
// import { useBrandContext } from 'src/context/brandContext';
import config from 'temp/config';
export default function Document(): JSX.Element {
  // const { brand } = useBrandContext();

  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* <link
          href={`https://fonts.googleapis.com/css2?family=${brand.Font}:ital,wght@0,300,0,400;0,700;1,400;1,700&display=swap`}
          rel="stylesheet"
        /> */}
      </Head>
      <body>
        {(() => {
          if (config.environment === 'prod') {
            return (
              <>
                <noscript>
                  <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-KZ4HRCJ"
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                  ></iframe>
                </noscript>
              </>
            );
          } else {
            return <></>;
          }
        })()}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
