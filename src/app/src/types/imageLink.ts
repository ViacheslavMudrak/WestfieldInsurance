import { SiteLink } from './generic';

export interface ImageLink {
  title: JSX.Element | string;
  content: JSX.Element | string;
  link?: SiteLink;
  image: JSX.Element;
}
