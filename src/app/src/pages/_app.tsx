import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import { useState } from 'react';
import '../sass/main.scss';
import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query';

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  const [queryClient] = useState(() => new QueryClient());

  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <Component {...rest} />
        </Hydrate>
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default App;
