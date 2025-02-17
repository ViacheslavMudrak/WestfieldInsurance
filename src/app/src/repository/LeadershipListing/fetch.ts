import { QueryFunctionContext } from '@tanstack/react-query';
import { initRequestClient } from 'lib/graphql/requestClient';
import { LeadershipListingData } from './types';

import { getLeadershipListingGQL } from './graphql';

/*
 * A Fetch Method implements how to get the data.
 * Here we will query against Sitecore's GraphQL endpoint.
 */
function fetchLeadershipListing(siteItemId: string, lang: string): Promise<LeadershipListingData> {
  const client = initRequestClient();

  return client.request<LeadershipListingData>(getLeadershipListingGQL, {
    siteItemId: siteItemId,
    lang: lang,
  });
}

export const leadershipListingKey = 'leadershipListingKey';
/*
 * To ensure our queryKey is distinct for all dynamic inputs we will wrap our fetch method
 * and bind it to the dynamic inputs passed to the queryKey
 */
export function fetchLeadershipListing$({
  queryKey,
}: QueryFunctionContext<[string, string, string]>): Promise<LeadershipListingData> {
  if (queryKey[0] !== leadershipListingKey) {
    throw 'Aborting! Expected query key ' + leadershipListingKey;
  }
  return fetchLeadershipListing(queryKey[1], queryKey[2]);
}
