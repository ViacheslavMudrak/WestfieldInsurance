import { QueryFunctionContext } from '@tanstack/react-query';
import { initRequestClient } from 'lib/graphql/requestClient';
import { HeaderItem } from './types';

import { getHeaderGQL } from './graphql';

/*
 * A Fetch Method implements how to get the data.
 * Here we will query against Sitecore's GraphQL endpoint.
 */
function fetchHeaderData(headerItemId: string, lang: string): Promise<HeaderItem> {
  const client = initRequestClient();

  return client.request<HeaderItem>(getHeaderGQL, {
    headerItemId: headerItemId,
    lang: lang,
  });
}

export const headerItemKey = 'headerItemKey';
/*
 * To ensure our queryKey is distinct for all dynamic inputs we will wrap our fetch method
 * and bind it to the dynamic inputs passed to the queryKey
 */
export function fetchHeaderData$({
  queryKey,
}: QueryFunctionContext<[string, string, string]>): Promise<HeaderItem> {
  if (queryKey[0] !== headerItemKey) {
    throw 'Aborting! Expected query key ' + headerItemKey;
  }
  return fetchHeaderData(queryKey[1], queryKey[2]);
}
