import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export type ImageJson = {
  jsonValue: ImageField;
};

export type StringJson = {
  jsonValue: Field<string>;
};

export type LinkJson = {
  jsonValue: LinkField;
};

export type UrlJson = {
  path: string;
  siteName: string;
};

export type Author = {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Title: Field<string>;
    Label: Field<string>;
    Image: ImageField;
    ImageCaption: Field<string>;
    ShortBioCopy: Field<string>;
  };
};

export type Tag = {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Title: Field<string>;
  };
};
