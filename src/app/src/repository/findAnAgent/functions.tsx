import { InsuranceType } from './types';
import { SelectInputOption } from 'src/types/generic';

export function MapInsuranceOptions(data: InsuranceType[]): SelectInputOption[] {
  const insuranceTypes: SelectInputOption[] = [];
  if (!data) return insuranceTypes;

  data.forEach((insuranceType) => {
    insuranceTypes.push({
      text: insuranceType.insuranceType.jsonValue.value,
      value: insuranceType.insuranceValue.jsonValue.value,
    });
  });

  return insuranceTypes;
}
