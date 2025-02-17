import { DUMMY_COMPARISON_DATA, exampleComparisonMatrixProps } from 'src/data/comparisonMatrix';
import ComparisonMatrix from 'src/ui/ComparisonMatrix/ComparisonMatrix';
import LayoutStatic from 'src/ui/Layout/LayoutStatic';

export default function ProductListingPage(): JSX.Element {
  return (
    <LayoutStatic>
      <ComparisonMatrix {...exampleComparisonMatrixProps({ data: DUMMY_COMPARISON_DATA })} />
    </LayoutStatic>
  );
}
