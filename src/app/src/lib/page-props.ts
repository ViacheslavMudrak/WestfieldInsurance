import {
  DictionaryPhrases,
  ComponentPropsCollection,
  LayoutServiceData,
  SiteInfo,
  HTMLLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { DehydratedState } from '@tanstack/react-query';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  site: SiteInfo;
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
  dehydratedState?: DehydratedState;
};
