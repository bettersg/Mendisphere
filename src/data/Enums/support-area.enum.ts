export enum SupportArea {
  PartnershipOpportunities = "Partnership Opportunities",
  FundingSupport = "Funding Support",
  Volunteers = "Volunteers",
  NotSet = "",
}

export interface SupportAreaEnumOption {
  value: SupportArea;
  label: string;
  key?: string;
  disabled?: boolean;
}

export const supportAreaEnumOptions: SupportAreaEnumOption[] = Object.keys(
  SupportArea
).map((key) => {
  return {
    label: key,
    value: SupportArea[key as keyof typeof SupportArea],
  };
});
