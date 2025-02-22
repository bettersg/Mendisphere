export enum OrgSize {
  max5 = "1-5",
  max10 = "6-10",
  max20 = "11-20",
  max50 = "21-50",
  max100 = "51-100",
  min100 = ">100",
}

export interface OrgSizeEnumOption {
  value: OrgSize;
  label: string;
  key?: string;
  disabled?: boolean;
}

export const orgSizeEnumOptions: OrgSizeEnumOption[] = Object.keys(OrgSize).map(
  (key) => {
    return {
      label: key,
      value: OrgSize[key as keyof typeof OrgSize],
    };
  }
);
