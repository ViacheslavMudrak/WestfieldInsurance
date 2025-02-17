import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export type VideoResult = {
  title: Field<string>;
  link: LinkField;
};
