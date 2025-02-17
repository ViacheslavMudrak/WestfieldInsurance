// import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { SiteLink } from './generic';

export interface Category {
  title: string;
  link?: SiteLink;
  links: SiteLink[];
  id: string;
  stack?: boolean;
}
