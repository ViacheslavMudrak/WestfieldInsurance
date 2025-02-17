import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { NavFeaturedCardProps } from 'src/ui/Navigation/NavFeaturedCard';
import { Category } from './category';

export interface Menu {
  name: string;
  link?: LinkField;
  items: Category[];
  id: string;
  card?: NavFeaturedCardProps;
}
