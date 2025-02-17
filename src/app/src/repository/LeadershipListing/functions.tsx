import { Leader } from './types';
import { LeadershipBioProps } from 'src/ui/Leadership/LeadershipBio';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import { repositoryConstants } from '../constants';
import Button from 'src/ui/Button/Button';

export function MapLeadershipListing(data: Leader[]): LeadershipBioProps[] {
  const persons: LeadershipBioProps[] = [];
  if (!data) return persons;

  const sortedData = data.sort((a, b) =>
    parseInt(a.sortorder?.value) > parseInt(b.sortorder?.value) ? 1 : -1
  );

  sortedData.forEach((person) => {
    const siteLink: LeadershipBioProps = {
      image: <NextImageExtended field={person.image.jsonValue} />,
      personName: person.title.jsonValue.value,
      title: person.label.jsonValue.value,
      bioLink: (
        <Button variant="outline" href={person.url.path}>
          {repositoryConstants.strings.viewBio}
        </Button>
      ),
    };

    persons.push(siteLink);
  });

  return persons;
}
