import { QueryFunctionContext } from '@tanstack/react-query';
import { initRequestClient } from 'lib/graphql/requestClient';
import { FooterItem } from './types';
import { getFooterGQL } from './graphql';

/*
 * A Fetch Method implements how to get the data.
 * Here we will query against Sitecore's GraphQL endpoint.
 */
function fetchFooterData(
  footerItemId: string,
  lang: string,
  findAnAgentFormId: string
): Promise<FooterItem> {
  const client = initRequestClient();

  return client.request<FooterItem>(getFooterGQL, {
    footerItemId: footerItemId,
    lang: lang,
    findAnAgentFormId: findAnAgentFormId,
  });
}

export const footerItemKey = 'footerItemKey';
/*
 * To ensure our queryKey is distinct for all dynamic inputs we will wrap our fetch method
 * and bind it to the dynamic inputs passed to the queryKey
 */
export function fetchFooterData$({
  queryKey,
}: QueryFunctionContext<[string, string, string, string]>): Promise<FooterItem> {
  if (queryKey[0] !== footerItemKey) {
    throw 'Aborting! Expected query key ' + footerItemKey;
  }
  return fetchFooterData(queryKey[1], queryKey[2], queryKey[3]);
}
