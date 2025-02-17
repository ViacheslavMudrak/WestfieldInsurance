import {
  ComponentRendering,
  RichText,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { IsEditing } from 'components/Helpers/ContentUtil';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import { GetNextBioLink } from 'src/repository/LeadershipBio/functions';
import { LeadershipBioResults } from 'src/repository/LeadershipBio/types';
import { ImageJson, StringJson } from 'src/repository/shared/types';
import LeadershipBio, { LeadershipBioProps } from 'src/ui/Leadership/LeadershipBio';

interface Fields {
  data: {
    contextItem: {
      id: string;
      title: StringJson;
      label: StringJson;
      richTextCopy: StringJson;
      shortBioCopy: StringJson;
      image: ImageJson;
      parent: { children: { results: LeadershipBioResults[] } };
    };
  };
}

type LeadershipBioDataProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields: Fields;
};

const LeadershipBioMarkup = ({ fields }: LeadershipBioDataProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const LeadershipBioDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">Leadership Biography Page</span>
  );
  if (fields.data?.contextItem) {
    const datasource = fields.data.contextItem;
    const LeadershipBioProps: LeadershipBioProps = {
      title: <Text field={datasource.label.jsonValue} />,
      personName: <Text field={datasource.title.jsonValue} />,
      biography: <RichText field={datasource.richTextCopy.jsonValue} />,
      image: <NextImageExtended field={datasource.image.jsonValue} />,
      nextLink: GetNextBioLink(datasource.id, datasource.parent.children.results, sitecoreContext),
      shortBio: <RichText field={datasource.shortBioCopy.jsonValue} />,
      isEditing: IsEditing(),
    };
    return <LeadershipBio {...LeadershipBioProps}></LeadershipBio>;
  }

  return <LeadershipBioDefaultComponent />;
};

export const Default = (props: LeadershipBioDataProps): JSX.Element => {
  return LeadershipBioMarkup(props);
};
