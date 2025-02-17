import { QueryKey, QueryClient } from 'react-query';
import { ImageJson, LinkJson, StringJson } from '../shared/types';

export type HeaderItem = {
  header: {
    name: string;
    image: ImageJson;
    utilityLinks: {
      targetItem: {
        hasChildren: boolean;
        links: {
          results: UtilityLink[];
        };
      };
    };
    mainNavigationItems: {
      results: MainNavigationItem[];
    };
  };
};

export type MainNavigationItem = {
  id: string;
  title: {
    value: string;
  };
  link: LinkJson;
  subNavs: {
    results: SubNavigationItem[];
  };
  featuredHeaderCard: {
    targetItem: {
      title: StringJson;
      image: ImageJson;
      copy: StringJson;
      link: LinkJson;
    };
  };
};

export type SubNavigationItem = {
  id: string;
  title: {
    value: string;
  };
  stack: {
    value: string;
  };
  link: LinkJson;
  links: {
    results: [
      {
        id: string;
        link: LinkJson;
      }
    ];
  };
};

export type UtilityLink = {
  isLogin: {
    jsonValue: {
      value: boolean;
    };
  };
  link: LinkJson;
};

export type QueryParameter = {
  headerItemId: string;
  language?: string;
};

export const CacheKeys = {
  headerItem(headerItemId: string): QueryKey {
    return ['headerItem', headerItemId];
  },
};

export type PrefetchHeaderDataResponse = {
  queryClient: QueryClient;
  data: HeaderItem;
};
