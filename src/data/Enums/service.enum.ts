export enum Service {
  Youth = "Youth",
  Workshops = "Workshops",
  OCD = "OCD",
  SupportGroup = "Support Group",
  OverallMentalWellbeing = "Overall Mental Wellbeing",
  TrainingProvider = "Training Provider",
  Counselling = "Counselling",
  SpeakingEngagements = "Speaking Engagements",
  CorporateTraining = "Corporate Training",
  TextBasedChatPlatform = "Text-based Chat Platform",
  PeerSupportCircles= "Peer Support Circles"
}

export interface ServiceEnumOption {
  value: Service;
  label: string;
  key?: string;
  disabled?: boolean;
}

export const serviceEnumOptions: ServiceEnumOption[] = Object.keys(Service).map(
  (key) => {
    return {
      label: key,
      value: Service[key as keyof typeof Service],
    };
  }
);
