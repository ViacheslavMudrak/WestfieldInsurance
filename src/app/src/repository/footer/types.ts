import { QueryKey, QueryClient } from 'react-query';
import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ImageJson, StringJson } from '../shared/types';
import { FindAnAgentForm } from '../findAnAgent/types';

export type ResultsFieldLink = {
  linkField: LinkField;
  id: string;
  name: string;
  image?: ImageJson;
};

export type SocialMediaContent = {
  link: LinkField;
  id: string;
  name: string;
  image?: ImageJson;
};

export type FooterRelevantText = {
  title: { value: string };
  id: string;
  name: string;
};

export type MultiListTargetItems = {
  children: {
    results: ResultsFieldLink[];
    id: string;
    name: string;
  };
  id: string;
  name: string;
};

export type FooterItem = {
  findAnAgentForm: FindAnAgentForm;
  item: {
    id: string;
    name: string;
    image: ImageJson;
    email: {
      anchor: string;
      queryString: string;
      target: string;
      text: string;
      url: string;
    };
    phoneNo: {
      anchor: string;
      queryString: string;
      target: string;
      text: string;
      url: string;
    };
    legalDisclaimer: StringJson;
    footerNavigationGroups: {
      targetItems: MultiListTargetItems[];
    };
    footerRelevantLinks: {
      targetItems: ResultsFieldLink[];
    };
    footerSocialMediaLinks: {
      targetItems: SocialMediaContent[];
    };
    footerRelevantTexts: {
      targetItems: FooterRelevantText[];
    };
    addresses: {
      targetItems: [
        {
          id: string;
          name: string;
          addressTitle: { value: string };
          addressLine1: { value: string };
          addressLine2: { value: string };
          city: { value: string };
          stateOrProvince: { value: string };
          country: { value: string };
          postalCode: { value: string };
          mapsLink: {
            anchor: string;
            queryString: string;
            target: string;
            text: string;
            url: string;
          };
        }
      ];
    };
  };
};

export type FooterAddressItemResultsList = [
  {
    id: string;
    name: string;
    addressTitle: { value: string };
    addressLine1: { value: string };
    addressLine2: { value: string };
    city: { value: string };
    stateOrProvince: { value: string };
    country: { value: string };
    postalCode: { value: string };
    mapsLink: {
      anchor: string;
      queryString: string;
      target: string;
      text: string;
      url: string;
    };
  }
];

export type QueryParameter = {
  footerItemId: string;
  language?: string;
};

// export const CacheKeys = {
//   headerItem(_params: QueryParameter): QueryKey {
//     return ['headerItem', _params.headerItemId, _params.language];
//   },
// };

export const CacheKeys = {
  footerItem(footerItemId: string): QueryKey {
    return ['footerItem', footerItemId];
  },
};

export type PrefetchFooterDataResponse = {
  queryClient: QueryClient;
  data: FooterItem;
};
