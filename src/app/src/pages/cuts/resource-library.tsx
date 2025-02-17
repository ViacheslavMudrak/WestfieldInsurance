import LayoutStatic from 'src/ui/Layout/LayoutStatic';
import SearchResultsGrid from 'src/ui/SearchResults/SearchResultsGrid';

export default function ResourceLibraryPage(): JSX.Element {
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
      <SearchResultsGrid
        organizationId={orgId}
        accessToken={accessToken}
        facets={facets}
        includeAlphaSortFacet={true}
        includeDateRangeFacet={true}
      />
    </LayoutStatic>
  );
}
