export enum Specialisation {
  AntiStigmatism = "Anti-Stigmatism",
  YouthMentalWellness = "Youth Mental Wellness",
  OCD = "Obsessive Compulsive Disorder",
  OverallMentalWellbeing = "Overall Mental Wellbeing",
  Therapy = "Therapy",
  Anxiety = "Anxiety",
  PostPartum = "Post-Partum",
  Corporate = "Corporate",
}

export interface SpecialisationEnumOption {
  value: Specialisation;
  label: string;
  key?: string;
  disabled?: boolean;
}

export const specialisationEnumOptions: SpecialisationEnumOption[] =
  Object.keys(Specialisation).map((key) => {
    return {
      label: key,
      value: Specialisation[key as keyof typeof Specialisation],
    };
  });
