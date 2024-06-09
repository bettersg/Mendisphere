import { IPCStatus, IPCStatusViewMap } from "../../data/enums/ipc-status.enum";
import { Specialisation } from "../../data/enums/specialisation.enum";
import { Service } from "../../data/enums/service.enum";
import { SupportArea } from "../../data/enums/support-area.enum";

export const serviceOptions = [
  {
    label: Service.Youth,
    value: Service.Youth,
  },
  {
    label: Service.Workshops,
    value: Service.Workshops,
  },
  {
    label: Service.OCD,
    value: Service.OCD,
  },
  {
    label: Service.SupportGroup,
    value: Service.SupportGroup,
  },
  {
    label: Service.OverallMentalWellbeing,
    value: Service.OverallMentalWellbeing,
  },
  {
    label: Service.TrainingProvider,
    value: Service.TrainingProvider,
  },
  {
    label: Service.Counselling,
    value: Service.Counselling,
  },
  {
    label: Service.SpeakingEngagements,
    value: Service.SpeakingEngagements,
  },
  {
    label: Service.SpeakingEngagements,
    value: Service.SpeakingEngagements,
  },
  {
    label: Service.CorporateTraining,
    value: Service.CorporateTraining,
  },
];

export const ipcOptions = [
  {
    label: IPCStatusViewMap.get(IPCStatus.Approved) ?? "",
    value: IPCStatus.Approved,
  },
  {
    label: IPCStatusViewMap.get(IPCStatus.NotApproved) ?? "",
    value: IPCStatus.NotApproved,
  },
  {
    label: IPCStatusViewMap.get(IPCStatus.Pending) ?? "",
    value: IPCStatus.Pending,
  },
];

export const supportAreaOptions = [
  {
    label: SupportArea.FundingSupport,
    value: SupportArea.FundingSupport,
  },
  {
    label: SupportArea.PartnershipOpportunities,
    value: SupportArea.PartnershipOpportunities,
  },
];

export const specialisationsOptions = [
  {
    label: Specialisation.AntiStigmatism,
    value: Specialisation.AntiStigmatism,
  },
  {
    label: Specialisation.YouthMentalWellness,
    value: Specialisation.YouthMentalWellness,
  },
  {
    label: Specialisation.OCD,
    value: Specialisation.OCD,
  },
  {
    label: Specialisation.OverallMentalWellbeing,
    value: Specialisation.OverallMentalWellbeing,
  },
];
