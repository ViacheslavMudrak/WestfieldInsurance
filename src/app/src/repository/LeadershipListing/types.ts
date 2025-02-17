import { ImageJson, StringJson } from '../shared/types';

export type LeadershipListingData = {
  search: {
    results: Leader[];
  };
};

export type Leader = {
  sortorder: {
    value: string;
  };
  url: {
    path: string;
  };
  title: StringJson;
  image: ImageJson;
  label: StringJson;
};
