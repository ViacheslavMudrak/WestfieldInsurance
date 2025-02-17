import { PageInfo } from '@sitecore-jss/sitecore-jss/graphql';
import { QueryClient, QueryFunctionContext } from '@tanstack/react-query';
import { getCustomSiteMapVideoGraphQL } from './graphql';
import { initRequestClient } from 'lib/graphql/requestClient';
import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Tag } from '../shared/types';

/**
 * The return object for an indexable Video
 */
export type VideoSiteMap = {
  /**
   * Title
   */
  title: string;
  /**
   * Keywords
   */
  videoCaption: string;
  /**
   * Description
   */
  link: LinkField;
  /**
   * Rich Text Copy
   */
  richTextCopy: string;
  /**
   * SxaTags
   */
  sxaTags: Tag[];
  /**
   * Image Thumbnail for the Video
   */
  videoThumbnail: string;
  /**
   * Description for the Video
   */
  videoDescription: string;
  /**
   * Exclude From Search
   */
  excludeFromSearch: boolean;
  /**
   * transcriptLink
   */
  transcriptLink: LinkField;
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
  videoCaption: {
    value: string;
  };
  link: {
    jsonValue: LinkField;
  };
  richTextCopy: {
    value: string;
  };
  sxaTags: {
    jsonValue: Tag[];
  };
  videoThumbnail: {
    src: string;
  };
  videoDescription: {
    value: string;
  };
  excludeFromSearch: {
    boolValue: boolean;
  };
  transcriptLink: {
    jsonValue: LinkField;
  };
};

/**
 * Service Class that returns indexable Video items
 */
export class VideoSiteMapService {
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
   * Return a list of Videos in the form of a sitemap
   * @returns Array of VideoSiteMapInfo
   */
  async getVideoSiteMap(siteRootId: string): Promise<VideoSiteMap[]> {
    const response = await this.queryClient.fetchQuery(
      ['customVideoSiteMapKey', siteRootId],
      this.fetchVideoSiteMapInfo$,
      {
        staleTime: 600000,
      }
    );
    return response;
  }

  /**
   * fetch Video items using GraphQL
   * @returns The GraphQL response for Video item
   */
  private async fetchVideoSiteMapInfo(siteRootId: string): Promise<VideoSiteMap[]> {
    const client = initRequestClient();
    const results: VideoSiteMap[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const response = await client.request<GraphQLResponse>(getCustomSiteMapVideoGraphQL, {
        siteRootId: siteRootId,
        pageSize: 20,
        after,
      });

      const result = response?.search?.results?.reduce<VideoSiteMap[]>((result, current) => {
        result.push({
          title: current.title?.value,
          videoCaption: current.videoCaption?.value,
          link: current.link?.jsonValue,
          richTextCopy: current.richTextCopy?.value,
          sxaTags: current.sxaTags?.jsonValue,
          videoThumbnail: current.videoThumbnail?.src,
          excludeFromSearch: current.excludeFromSearch?.boolValue,
          videoDescription: current.videoDescription?.value,
          transcriptLink: current.transcriptLink?.jsonValue,
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
  private fetchVideoSiteMapInfo$ = ({
    queryKey,
  }: QueryFunctionContext<[string, string]>): Promise<VideoSiteMap[]> => {
    return this.fetchVideoSiteMapInfo(queryKey[1]);
  };
}
