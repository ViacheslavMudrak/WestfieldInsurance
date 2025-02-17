import { PageInfo } from '@sitecore-jss/sitecore-jss/graphql';
import { QueryClient, QueryFunctionContext } from '@tanstack/react-query';
import { getCustomSiteMapPDFGraphQL } from './graphql';
import { initRequestClient } from 'lib/graphql/requestClient';

/**
 * The return object for an indexable PDF
 */
export type PDFSiteMap = {
  /**
   * Title
   */
  title: string;
  /**
   * Keywords
   */
  keywords: string;
  /**
   * Description
   */
  description: string;
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
  keywords: {
    value: string;
  };
  description: {
    value: string;
  };
  url: {
    url: string;
  };
};

/**
 * Service Class that returns indexable PDF items
 */
export class PDFSiteMapService {
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
   * Return a list of PDFs in the form of a sitemap
   * @returns Array of PDFSiteMapInfo
   */
  async getPDFSiteMap(pdfFolderItemId: string): Promise<PDFSiteMap[]> {
    //const results: PDFSiteMap[] = [];
    const response = await this.queryClient.fetchQuery(
      ['customPDFSiteMapKey', pdfFolderItemId],
      this.fetchPDFSiteMapInfo$,
      {
        staleTime: 600000,
      }
    );
    return response;
  }

  /**
   * fetch PDF items using GraphQL
   * @returns The GraphQL response for PDF item
   */
  private async fetchPDFSiteMapInfo(pdfFolderItemId: string): Promise<PDFSiteMap[]> {
    const client = initRequestClient();
    const results: PDFSiteMap[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const response = await client.request<GraphQLResponse>(getCustomSiteMapPDFGraphQL, {
        pdfFolderItemId: pdfFolderItemId,
        pageSize: 20,
        after,
      });
      const result = response?.search?.results?.reduce<PDFSiteMap[]>((result, current) => {
        result.push({
          title: current.title?.value,
          keywords: current.keywords?.value,
          description: current.description?.value,
          url: current.url?.url,
        });
        return result;
      }, []);

      results.push(...result);
      hasNext = response.search.pageInfo.hasNext;
      after = response.search.pageInfo.endCursor;
    }
    return results;
  }

  /**
   *
   * @param param0 The unique key used for caching
   * @returns The method in function form needed by the QueryClient
   */
  private fetchPDFSiteMapInfo$ = ({
    queryKey,
  }: QueryFunctionContext<[string, string]>): Promise<PDFSiteMap[]> => {
    return this.fetchPDFSiteMapInfo(queryKey[1]);
  };
}
