import { SiteLink } from './generic';

export interface CareerLink {
  link: SiteLink;
  title: JSX.Element | string;
  label: JSX.Element | string;
  location: JSX.Element | string;
}
