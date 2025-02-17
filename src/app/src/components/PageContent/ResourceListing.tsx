import AnchorComponent from './AnchorComponent';
import ResourceListing, { ResourceListingProps } from 'src/ui/ResourceListing/ResourceListing';
import {
  resourceListingKey,
  fetchResourceListingInfo$,
} from 'src/repository/ResourceListing/resourceListingService';
import { GetItemId, GetLanguage, GetSiteName } from 'components/Helpers/ContentUtil';
import { MapResourceListing } from 'src/repository/ResourceListing/functions';
import React from 'react';
import { ComponentRendering, GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';

type ResourceListingPropsBed = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

const ResourceListingDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Resource Listing</span>
);

const ResourceListingMarkup = ({ params }: ResourceListingPropsBed): JSX.Element => {
  const resourceListingQuery = useQuery({
    queryKey: [resourceListingKey, GetItemId(GetSiteName(), 'SiteRootItemId'), GetLanguage()],
    queryFn: fetchResourceListingInfo$,
    enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  if (resourceListingQuery.data && resourceListingQuery.data.length > 0) {
    const resourceListingProps: ResourceListingProps = {
      cards: MapResourceListing(resourceListingQuery.data),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <ResourceListing {...resourceListingProps} />
      </AnchorComponent>
    );
  }

  return <ResourceListingDefaultComponent />;
};

export const getStaticProps: GetStaticComponentProps = async (_rendering, _layoutData) => {
  //get header data info from cache or gql. store in cache
  await queryClient.fetchQuery(
    [
      resourceListingKey,
      GetItemId(_layoutData.sitecore.context.site?.name, 'SiteRootItemId'),
      _layoutData.sitecore.context.language,
    ],
    fetchResourceListingInfo$,
    {
      cacheTime: 0,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const Default = (props: ResourceListingPropsBed): JSX.Element => {
  return ResourceListingMarkup(props);
};
