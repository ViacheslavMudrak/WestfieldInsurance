import {
  GetStaticComponentProps,
  ComponentRendering,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { fetchHeaderData$, headerItemKey } from 'src/repository/header/fetch';
import { useI18n } from 'next-localization';
import Header, { HeaderProps } from 'src/ui/Header/Header';
import { MapMainNavigation, MapUtilityNavigation } from 'src/repository/header/functions';
import NextImageExtended from '../Helpers/NextImageExtended';

interface Fields {
  SearchEngine: {
    fields: {
      AccessToken: Field<string>;
      OrganizationId: Field<string>;
    };
  };
}

type HeaderPropsBed = {
  rendering: ComponentRendering;
  fields: Fields;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 600000,
    },
  },
});

const HeaderMarkup = (props: HeaderPropsBed): JSX.Element => {
  const { locale } = useI18n();
  const lang = locale();

  const headerDataQuery = useQuery({
    queryKey: [headerItemKey, props.rendering.dataSource, lang],
    queryFn: fetchHeaderData$,
    enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const HeaderDefaultComponent = (): JSX.Element => <span className="is-empty-hint">Header</span>;

  if (headerDataQuery.data?.header) {
    const headerProps: HeaderProps = {
      accessToken: props.fields.SearchEngine?.fields?.AccessToken?.value,
      organizationId: props.fields.SearchEngine?.fields?.OrganizationId?.value,
      links: MapUtilityNavigation(
        headerDataQuery.data?.header.utilityLinks.targetItem.links.results,
        false
      ),
      loginLinks: MapUtilityNavigation(
        headerDataQuery.data?.header.utilityLinks.targetItem.links.results,
        true
      ),
      navMenu: MapMainNavigation(headerDataQuery.data.header.mainNavigationItems.results),
      logo: <NextImageExtended field={headerDataQuery.data.header.image.jsonValue} />,
    };

    return <Header {...headerProps} />;
  }

  return <HeaderDefaultComponent />;
};

// underscore layoutdata so linter unused vars is disabled
export const getStaticProps: GetStaticComponentProps = async (rendering, _layoutData, context) => {
  //get header data info from cache or gql. store in cache
  await queryClient.fetchQuery(
    [headerItemKey, rendering.dataSource, context.locale],
    fetchHeaderData$,
    { cacheTime: 600000 }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HeaderMarkup;
