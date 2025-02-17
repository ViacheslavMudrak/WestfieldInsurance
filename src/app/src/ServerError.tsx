import Head from 'next/head';
import ErrorSimple from 'src/ui/Error/ErrorSimple';
import { exampleErrorProps } from './data/error';
import LayoutSimple from './ui/Layout/LayoutSimple';

/**
 * Rendered in case if we have 500 error
 */
const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>500: Server Error</title>
      <meta name="robots" content="noindex,nofollow,noarchive" />
    </Head>
    <LayoutSimple>
      <ErrorSimple
        {...exampleErrorProps({
          title: 'Internal Server Error',
          richTextCopy: (
            <p>
              There is a problem with the resource you are looking for, and it cannot be displayed.
            </p>
          ),
        })}
      />
    </LayoutSimple>
  </>
);

export default ServerError;
