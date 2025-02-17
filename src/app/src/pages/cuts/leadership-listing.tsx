import LayoutStatic from 'src/ui/Layout/LayoutStatic';
import { exampleLeadershipListingProps } from 'src/data/leadership';
import LeadershipListing from 'src/ui/Leadership/LeadershipListing';

export default function LeadershipListingPage(): JSX.Element {
  return (
    <LayoutStatic>
      <LeadershipListing {...exampleLeadershipListingProps()} />
    </LayoutStatic>
  );
}
