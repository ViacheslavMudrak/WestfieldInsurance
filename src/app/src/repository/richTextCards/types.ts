import { ImageJson, LinkJson, StringJson } from '../shared/types';

export type RichTextCard = {
  id: string;
  title: StringJson;
  link: LinkJson;
  richTextCopy: StringJson;
  image: ImageJson;
};
