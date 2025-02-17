import { PageInfo } from '@sitecore-jss/sitecore-jss/graphql';
import { QueryFunctionContext } from '@tanstack/react-query';
import { getResourceDetailListingGraphQL } from './graphql';
import { initRequestClient } from 'lib/graphql/requestClient';
import { resourceItemLinkResolver } from 'lib/resource-item-link-resolver';

/**
 * The return object for an indexable Video
 */
export type ResourceListingResult = {
  /**
   * Title
   */
  title: string;
  /**
   * Url
   */
  url: string;
};

/**
 * The return response from GraphQL
 */
type GraphQLResponse = {
  search: {
    pageInfo: PageInfo;
    results: GraphQLResult[];
  };
};

/**
 * The result model from the GraphQL response
 */
type GraphQLResult = {
  title: {
    value: string;
  };
  url: {
    url: string;
  };
};
export const resourceListingKey = 'resourceItemKey';
/*
 * To ensure our queryKey is distinct for all dynamic inputs we will wrap our fetch method
 * and bind it to the dynamic inputs passed to the queryKey
 */

export async function fetchResourceListingInfo(
  siteRootId: string,
  lang: string
): Promise<ResourceListingResult[]> {
  const client = initRequestClient();
  const results: ResourceListingResult[] = [];
  let hasNext = true;
  let after = '';
  const linkResolver = new resourceItemLinkResolver();
  while (hasNext) {
    const response = await client.request<GraphQLResponse>(getResourceDetailListingGraphQL, {
      siteRootId: siteRootId,
      pageSize: 20,
      after,
    });

    const result = response?.search?.results?.reduce<ResourceListingResult[]>((result, current) => {
      result.push({
        title: current.title?.value,
        url: linkResolver.isResourceItem(getPathName(current.url?.url))
          ? linkResolver.getResourcePath(getPathName(current.url?.url), lang)
          : linkResolver.getPathApplyingLanguageRules(getPathName(current.url?.url), lang),
      });
      return result;
    }, []);
    results.push(...result);
    hasNext = response.search.pageInfo.hasNext;
    after = response.search.pageInfo.endCursor;
  }
  return results;
}

function getPathName(url: string): string {
  const uri = new URL(url);
  return uri.pathname;
}

export function fetchResourceListingInfo$({
  queryKey,
}: QueryFunctionContext<[string, string, string]>): Promise<ResourceListingResult[]> {
  if (queryKey[0] !== resourceListingKey) {
    throw 'Aborting! Expected query key ' + resourceListingKey;
  }
  return fetchResourceListingInfo(queryKey[1], queryKey[2]);
}
