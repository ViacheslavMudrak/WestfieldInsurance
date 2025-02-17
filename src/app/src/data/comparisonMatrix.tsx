import { ComparisonMatrixProps } from 'src/ui/ComparisonMatrix/ComparisonMatrix';

export const exampleComparisonMatrixProps = (
  props: ComparisonMatrixProps
): ComparisonMatrixProps => {
  const { label, title, data, hideAccentColor } = props;

  return {
    title: title ? <div>{title}</div> : <div>Compare the matrix</div>,
    label: label ? <span>{label}</span> : <span>Compare Text</span>,
    data: data ? data : DUMMY_COMPARISON_DATA,
    hideAccentColor: hideAccentColor ? hideAccentColor : false,
  };
};

export interface ComparisonCategory {
  [key: string]: ComparisonProduct[];
}

export interface ComparisonProduct {
  [key: string]: boolean;
}

export const DUMMY_COMPARISON_DATA: ComparisonCategory[] = [
  {
    categoryA: [
      {
        Product1: true,
      },
      {
        Product2: false,
      },
      {
        Product3: false,
      },
    ],
  },
  {
    categoryB: [
      {
        Product1: true,
      },
      {
        Product2: false,
      },
      {
        Product3: false,
      },
    ],
  },
  {
    categoryC: [
      {
        Product1: false,
      },
      {
        Product2: true,
      },
      {
        Product3: false,
      },
    ],
  },
  {
    categoryD: [
      {
        Product1: false,
      },
      {
        Product2: true,
      },
      {
        Product3: false,
      },
    ],
  },
];
