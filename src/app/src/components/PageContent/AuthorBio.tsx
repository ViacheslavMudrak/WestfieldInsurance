import { IsEditing } from 'components/Helpers/ContentUtil';
import { MapAuthorList } from 'src/repository/AuthorBio/functions';
import { Author } from 'src/repository/shared/types';
import AuthorBio, { AuthorBioList } from 'src/ui/AuthorBio/AuthorBio';

interface Fields {
  Authors: Author[];
}

type AuthorBioPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
};

const AuthorBioMarkup = ({ fields }: AuthorBioPropsBed): JSX.Element => {
  if (fields) {
    const authorBioList: AuthorBioList = {
      authors: MapAuthorList(fields.Authors),
      isEditing: IsEditing(),
    };
    return <AuthorBio {...authorBioList} />;
  }

  return <></>;
};

export const Default = (props: AuthorBioPropsBed): JSX.Element => {
  return AuthorBioMarkup(props);
};
