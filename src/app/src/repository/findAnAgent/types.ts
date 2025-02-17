import { LinkJson, StringJson } from '../shared/types';

export type FindAnAgentForm = {
  title: StringJson;
  link: LinkJson;
  insuranceTypes: {
    targetItem: {
      children: {
        results: InsuranceType[];
      };
    };
  };
};

export type InsuranceType = {
  insuranceType: StringJson;
  insuranceValue: StringJson;
};
