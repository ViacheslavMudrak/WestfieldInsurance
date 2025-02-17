import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import AnchorComponent from './AnchorComponent';
import { GetComparisonData } from 'src/repository/ProductComparison/functions';
import ComparixonMatrix, { ComparisonMatrixProps } from 'src/ui/ComparisonMatrix/ComparisonMatrix';
import { fetchCsvAndParse } from 'components/Helpers/GetCsvData';
import { useEffect, useState } from 'react';
import { GetDictionaryPhrase, HasStyle, IsEditing } from 'components/Helpers/ContentUtil';

interface Fields {
  Title: Field<string>;
  Label: Field<string>;
  ComparisonCsv: FileJson;
}

interface FileJson {
  value: {
    src: string;
    name: string;
    displayName: string;
    title: string;
    keywords: string;
    description: string;
    extension: string;
    mimeType: string;
    size: string;
  };
}

export type ProductComparisonDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ProductComparisonMarkup = ({ fields, params }: ProductComparisonDataProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [csvData, setCsvData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = useState<any[]>([]);

  const yesLabel = GetDictionaryPhrase('yes');
  const noLabel = GetDictionaryPhrase('no');

  useEffect(() => {
    const getMedia = async (url) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await fetchCsvAndParse(url)) as unknown as any[];
      setCsvData(data);
    };
    if (fields.ComparisonCsv.value && fields.ComparisonCsv.value.src) {
      getMedia(fields.ComparisonCsv.value.src);
    }
  }, []);

  const ProductsCardsDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">Choose ComparisonCsv file within Explorer</span>
  );

  useEffect(() => {
    setTableData(GetComparisonData(csvData));
  }, [csvData]);

  if (fields && tableData && tableData.length > 0) {
    const ProductsCardsProps: ComparisonMatrixProps = {
      title: <Text field={fields.Title} />,
      label: <Text field={fields.Label} />,
      data: tableData,
      isEditing: IsEditing(),
      hideAccentColor: !HasStyle(
        params && params.Styles ? params.Styles : '',
        'accent-comparison-matrix'
      ),
      yesLabel: yesLabel,
      noLabel: noLabel,
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <ComparixonMatrix {...ProductsCardsProps} />
      </AnchorComponent>
    );
  }

  return IsEditing() ? <ProductsCardsDefaultComponent /> : <></>;
};

export const Default = (props: ProductComparisonDataProps): JSX.Element => {
  return ProductComparisonMarkup(props);
};
