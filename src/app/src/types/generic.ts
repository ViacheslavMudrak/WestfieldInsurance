import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export enum ComponentTheme {
  Light = 'light',
  Dark = 'dark',
  Accent = 'accent',
  Gray = 'gray',
}

export enum AdditionalPaddingStyles {
  PaddingTopBottom = 'paddingTopBottom',
  PaddingTop = 'paddingTop',
  PaddingBottom = 'paddingBottom',
  NoPadding = 'noPadding',
}

export type ButtonVariants = 'primary' | 'secondary' | 'outline' | 'blank' | 'outlineWhite';

export interface SiteLink {
  field: LinkField;
  id: string;
}

export interface PlainText {
  text: string;
  id: string;
}

export interface SelectInputOption {
  text: string;
  value: string;
}

export interface ElementDocumentPosition {
  top: number;
  left: number;
}
