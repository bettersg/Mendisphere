export enum CapitalGoal {
  max2K = "$0-$2,000",
  max5K = "$2,001-$5,000",
  max10K = "$5,001-$10,000",
  max20K = "$10,001-$20,000",
  max50K = "$20,001-$50,000",
  max100K = "$50,001-$100,000",
  min100K = ">$100,000",
}

export interface CaptialGoalEnumOption {
  value: CapitalGoal;
  label: string;
  key?: string;
  disabled?: boolean;
}

export const capitalGoalEnumOptions: CaptialGoalEnumOption[] = Object.keys(
  CapitalGoal
).map((key) => {
  return {
    label: key,
    value: CapitalGoal[key as keyof typeof CapitalGoal],
  };
});
