import Script from 'next/script';
import React from 'react';
import config from 'temp/config';

const Scripts = (): JSX.Element => {
  if (config.environment === 'prod') {
    return (
      <>
        <Script src="/gtm.js" strategy="lazyOnload" />
      </>
    );
  } else {
    return <></>;
  }
};

export default Scripts;
