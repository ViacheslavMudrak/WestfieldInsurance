import Head from 'next/head';
import Error from 'src/ui/Error/Error';
import { exampleErrorProps } from './data/error';
import LayoutStatic from './ui/Layout/LayoutStatic';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: NotFound</title>
    </Head>
    <LayoutStatic>
      <Error {...exampleErrorProps({})} />
    </LayoutStatic>
  </>
);

export default NotFound;
