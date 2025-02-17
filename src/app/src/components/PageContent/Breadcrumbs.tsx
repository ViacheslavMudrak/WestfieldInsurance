import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { StringJson, UrlJson } from 'src/repository/shared/types';
import Breadcrumbs, { BreadcrumbsProps } from 'src/ui/Breadcrumbs/Breadcrumbs';
import { BreadcrumbBed } from 'src/repository/Breadcrumbs/types';
import { MapBreadcrumbs } from 'src/repository/Breadcrumbs/functions';
import { GetDictionaryPhrase } from 'components/Helpers/ContentUtil';

interface Fields {
  data: {
    breadcrumbs: {
      breadcrumbTitle: StringJson;
      url: UrlJson;
      ancestors: BreadcrumbBed[];
    };
  };
}

type BreadcrumbsPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
  rendering: ComponentRendering;
};

const BreadcrumbsMarkup = ({ fields }: BreadcrumbsPropsBed): JSX.Element => {
  const breadcrumbs = fields.data.breadcrumbs?.ancestors;
  const backLabel = GetDictionaryPhrase('back');

  if (breadcrumbs.length) {
    const currentPage: BreadcrumbBed = {
      breadcrumbTitle: fields.data.breadcrumbs.breadcrumbTitle,
      url: fields.data.breadcrumbs.url,
    };

    const breadcrumbsProps: BreadcrumbsProps = {
      links: MapBreadcrumbs(currentPage, breadcrumbs),
      backLabel: backLabel,
    };

    return <Breadcrumbs {...breadcrumbsProps} />;
  }

  return <></>;
};

export const Default = (props: BreadcrumbsPropsBed): JSX.Element => {
  return BreadcrumbsMarkup(props);
};
