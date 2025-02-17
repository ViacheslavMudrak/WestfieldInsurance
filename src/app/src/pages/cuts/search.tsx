import { DUMMY_BREADCRUMBS } from 'src/data/breadcrumbs';
import Breadcrumbs from 'src/ui/Breadcrumbs/Breadcrumbs';
import LayoutStatic from 'src/ui/Layout/LayoutStatic';
import SearchResults from 'src/ui/SearchResults/SearchResults';

export default function CareersLandingPage(): JSX.Element {
  const accessToken = `xx6e955fb1-0830-44c9-9099-b079b79c7743`;
  const orgId = `westfieldinsurancenonproduction144xzimyj`;
  const facets = [
    {
      name: 'aboutus',
      displayName: 'About Us',
    },
    {
      name: 'businessinsurance',
      displayName: 'Business Insurance',
    },
  ];
  return (
    <LayoutStatic>
      <Breadcrumbs links={DUMMY_BREADCRUMBS} />
      <SearchResults
        organizationId={orgId}
        accessToken={accessToken}
        facets={facets}
        includeDateRangeFacet={true}
      />
    </LayoutStatic>
  );
}
