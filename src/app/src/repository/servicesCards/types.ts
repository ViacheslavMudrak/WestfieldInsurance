import { ImageJson, LinkJson, StringJson } from '../shared/types';

export type ServicesCardResult = {
  id: string;
  name: string;
  title: StringJson;
  image: ImageJson;
  copy: StringJson;
  link: LinkJson;
};
