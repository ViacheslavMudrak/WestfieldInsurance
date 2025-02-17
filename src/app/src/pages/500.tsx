import {
  ErrorPages,
  GraphQLErrorPagesService,
  SitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { siteResolver } from 'lib/site-resolver';
import { GetStaticProps } from 'next';
import Layout from 'src/Layout';
import ServerError from 'src/ServerError';
import { componentBuilder } from 'temp/componentBuilder';
import config from 'temp/config';

const Custom500 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return <ServerError />;
  }

  return (
    <SitecoreContext
      componentFactory={componentBuilder.getComponentFactory()}
      layoutData={props.layoutData}
    >
      <Layout layoutData={props.layoutData} headLinks={props.headLinks} />
    </SitecoreContext>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const site = siteResolver.getByName(config.jssAppName);
  const errorPagesService = new GraphQLErrorPagesService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: site.name,
    language: context.locale || context.defaultLocale || config.defaultLanguage,
  });
  let resultErrorPages: ErrorPages | null = null;

  if (!process.env.DISABLE_SSG_FETCH) {
    try {
      resultErrorPages = await errorPagesService.fetchErrorPages();
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  return {
    props: {
      headLinks: [],
      layoutData: resultErrorPages?.serverErrorPage?.rendered || null,
    },
  };
};

export default Custom500;
