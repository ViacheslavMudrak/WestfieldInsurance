import { CareerListing } from './types';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { CareerLink } from 'src/types/careerLink';

export function MapCareerListings(data: CareerListing[], isEditing: boolean): CareerLink[] {
  const itemLinks: CareerLink[] = [];
  if (!data) return itemLinks;

  data.forEach((careerListing) => {
    itemLinks.push({
      title: <Text field={careerListing.title.jsonValue} />,
      label:
        careerListing.label.jsonValue.value != '' || isEditing ? (
          <Text field={careerListing.label.jsonValue} />
        ) : (
          ''
        ),
      link: {
        field: careerListing.link.jsonValue,
        id: careerListing.id,
      },
      location: (
        <>
          <Text field={careerListing.city.jsonValue} />
          {(careerListing.stateOrProvince.jsonValue.value || isEditing) && <>, </>}
          <Text field={careerListing.stateOrProvince.jsonValue} />
        </>
      ),
    });
  });

  return itemLinks;
}
