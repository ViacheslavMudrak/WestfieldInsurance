import { GraphQLClient } from 'graphql-request';
import { IncomingMessage, ServerResponse } from 'http';

let requestClient: GraphQLClient;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

function createRequestClient(endPoint: string, apiKey: string) {
  const graphQLClient = new GraphQLClient(endPoint, {
    headers: {
      sc_apikey: apiKey,
    },
  });
  return graphQLClient;
}

// export function initRequestClient(context?: ResolverContext) {
export function initPluginRequestClient(endPoint?: string, apiKey?: string) {
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  const _client = requestClient ?? createRequestClient(endPoint || '', apiKey || ''); // context

  // For SSG and SSR always create a new Client
  if (typeof window === 'undefined') return _client;

  // Create the client once in the client
  if (!requestClient) requestClient = _client;

  return _client;
}
