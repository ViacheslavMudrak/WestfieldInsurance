import { ComparisonCategory } from 'src/data/comparisonMatrix';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GetComparisonData(products: any[] | undefined): ComparisonCategory[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = [] as any[];

  products?.forEach((item) => {
    // Skip if 'Categories' is empty
    if (!item.Categories) return;

    // Create a new object with the category as the key
    const categoryObj = {};
    categoryObj[item.Categories] = [];

    // Iterate through each key in the object except 'Categories'
    for (const key in item) {
      if (key !== 'Categories') {
        const productObj = {};
        productObj[key] = item[key] === 'Yes';
        categoryObj[item.Categories].push(productObj);
      }
    }

    result.push(categoryObj);
  });

  return result;
}
