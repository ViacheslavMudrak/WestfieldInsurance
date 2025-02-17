import { ImageJson, LinkJson, StringJson } from '../shared/types';

export type InsightCard = {
  id: string;
  title: StringJson;
  link: LinkJson;
  copy: StringJson;
  image: ImageJson;
};
