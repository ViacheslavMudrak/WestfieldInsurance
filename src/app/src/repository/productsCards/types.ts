import { ImageJson, LinkJson, StringJson } from '../shared/types';

export type ProductsCardResult = {
  id: string;
  name: string;
  title: StringJson;
  image: ImageJson;
  copy: StringJson;
  link: LinkJson;
};
