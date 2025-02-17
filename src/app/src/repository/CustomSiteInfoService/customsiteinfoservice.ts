import { getCustomSiteInfoGraphQL } from './graphql';
import { QueryFunctionContext } from '@tanstack/react-query';
import { initPluginRequestClient } from 'lib/graphql/requestPluginClient';
import { QueryClient } from '@tanstack/react-query';
import { PageInfo } from '@sitecore-jss/sitecore-jss/graphql';
import { JssConfig } from 'scripts/config';

export type CustomSiteInfo = {
  /**
   * Site Name
   */
  name: string;
  /**
   * Other Properties
   */
  otherProperties?: Record<string, string>;
};

/**
 * The return response from GraphQL
 */
type GraphQLCustomSiteInfoResponse = {
  search: {
    pageInfo: PageInfo;
    results: GraphQLCustomSiteInfoResult[];
  };
};

/**
 * The result model from the GraphQL response
 */
type GraphQLCustomSiteInfoResult = {
  name: {
    value: string;
  };
  otherProperties?: {
    value: string;
  };
};

/**
 * Service that returns custom Site Info
 */
export class CustomSiteInfoService {
  private queryClient: QueryClient;

  constructor() {
    this.queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 600000,
        },
      },
    });
  }

  /**
   * Return the custom properties from every site
   * @returns Array of CustomSiteInfo
   */
  async getCustomSiteInfo(jssConfig?: JssConfig): Promise<CustomSiteInfo[]> {
    const results: CustomSiteInfo[] = [];
    const response = await this.queryClient.fetchQuery(
      ['customSiteInfoKey', jssConfig],
      this.fetchCustomSiteInfo$,
      {
        staleTime: 600000,
      }
    );
    const result = response?.search?.results?.reduce<CustomSiteInfo[]>((result, current) => {
      result.push({
        otherProperties: current.otherProperties?.value
          ? Object.fromEntries(new URLSearchParams(current.otherProperties.value))
          : undefined,
        name: current.name.value,
      });
      return result;
    }, []);

    results.push(...result);
    return results;
  }

  /**
   * fetch custom Site Info using GraphQL
   * @returns The GraphQL response for Custom Site Info
   */
  private async fetchCustomSiteInfo(jssConfig?: JssConfig): Promise<GraphQLCustomSiteInfoResponse> {
    const client = initPluginRequestClient(jssConfig?.graphQLEndpoint, jssConfig?.sitecoreApiKey);
    return client.request<GraphQLCustomSiteInfoResponse>(getCustomSiteInfoGraphQL, {
      jssConfig: jssConfig,
    });
  }

  /**
   *
   * @param param0 The unique key used for caching
   * @returns The method in function form neede by the QueryClient
   */
  private fetchCustomSiteInfo$ = ({
    queryKey,
  }: QueryFunctionContext<[string, JssConfig]>): Promise<GraphQLCustomSiteInfoResponse> => {
    return this.fetchCustomSiteInfo(queryKey[1]);
  };
}
