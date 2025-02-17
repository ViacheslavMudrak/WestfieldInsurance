import LayoutStatic from 'src/ui/Layout/LayoutStatic';
import LeadershipBio from 'src/ui/Leadership/LeadershipBio';
import { exampleLeadershipBioProps } from 'src/data/leadership';

export default function LeadershipBioPage(): JSX.Element {
  return (
    <LayoutStatic>
      <LeadershipBio {...exampleLeadershipBioProps()} />
    </LayoutStatic>
  );
}
