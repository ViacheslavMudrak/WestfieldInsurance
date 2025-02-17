import { SiteLink } from './generic';

export interface ProductCard {
  link: SiteLink;
  icon: JSX.Element;
  content: JSX.Element | string;
}
