import Share, { ShareProps } from 'src/ui/Share/Share';
import { Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { getCanonicalUrl } from 'src/LayoutUtils';
import { StringJson } from 'src/repository/shared/types';
import { MapShareIcons } from 'src/repository/ShareArticle/functions';
import { ShareIconBed } from 'src/repository/ShareArticle/types';
import { IsEditing } from 'components/Helpers/ContentUtil';

interface Fields {
  data: {
    item: {
      title: StringJson;
      label: StringJson;
      shareIcons: { results: ShareIconBed[] };
    };
  };
}

export type ShareArticleProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ShareArticleMarkup = ({ fields }: ShareArticleProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const itemPath = sitecoreContext.itemPath;
  if (fields.data.item) {
    const shareArticleProps: ShareProps = {
      title: <Text field={fields.data.item.title.jsonValue} editable={IsEditing()} />,
      url: getCanonicalUrl(sitecoreContext.site?.name, itemPath),
      items: MapShareIcons(fields.data.item.shareIcons.results),
    };
    return <Share {...shareArticleProps} />;
  }
  return <></>;
};

export const Default = (props: ShareArticleProps): JSX.Element => {
  return ShareArticleMarkup(props);
};
