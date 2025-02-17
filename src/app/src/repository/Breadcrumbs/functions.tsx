import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { BreadcrumbBed } from './types';
import { Breadcrumb } from 'src/ui/Breadcrumbs/Breadcrumbs';
import { IsEditing } from 'components/Helpers/ContentUtil';

export function MapBreadcrumbs(currentPage: BreadcrumbBed, data: BreadcrumbBed[]): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = [];
  if (!data) return breadcrumbs;

  breadcrumbs.push({
    title: <Text field={currentPage.breadcrumbTitle.jsonValue} editable={IsEditing()} />,
    path: currentPage.url.path,
  });

  data.forEach((breadcrumb) => {
    breadcrumbs.push({
      title: <Text field={breadcrumb.breadcrumbTitle.jsonValue} editable={false} />,
      path: breadcrumb.url.path,
    });
  });

  return breadcrumbs.reverse();
}
