import { PlainText, SiteLink } from './generic';

export interface FooterLocation {
  name: string;
  address_one?: string;
  address_two?: string;
  address_three?: string;
  id: string;
}

export type FooterContentType = FooterText | FooterLink;

export interface FooterText extends FooterContent {
  type: 'text';
  content: PlainText;
}

export interface FooterLink extends FooterContent {
  type: 'link';
  content: SiteLink;
}

export interface FooterContent {
  type: 'text' | 'link';
  id: string;
}
