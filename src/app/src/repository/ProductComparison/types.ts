import { StringJson } from '../shared/types';

export type ProductCategories = {
  selectFeature: {
    targetItem: {
      title: StringJson;
    };
  };
  isFeature: { boolValue: boolean };
};

export type ProductsToCompare = {
  title: StringJson;
  children: { results: ProductCategories[] };
};
