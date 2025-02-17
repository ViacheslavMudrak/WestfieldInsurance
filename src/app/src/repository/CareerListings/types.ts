import { LinkJson, StringJson } from '../shared/types';

export type CareerListing = {
  id: string;
  title: StringJson;
  link: LinkJson;
  label: StringJson;
  city: StringJson;
  stateOrProvince: StringJson;
};
