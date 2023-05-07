import { IPCStatus } from "../../../data/enums/ipc-status.enum";
import { Service } from "../../../data/enums/service.enum";
import { Specialisation } from "../../../data/enums/specialisation.enum";
import { SupportArea } from "../../../data/enums/support-area.enum";
import { VerificationStatus } from "../../../data/enums/verification-status.enum";
import { IOrganisation } from "../../../data/model/organisation";

export const testOrg1: IOrganisation = {
  name: "Over The Rainbow (OTR)",
  ipcApproved: IPCStatus.NotApproved,
  verified: VerificationStatus.NotVerified,
  mainSpecialisation: Specialisation.AntiStigmatism,
  mainSupportArea: SupportArea.PartnershipOpportunities,
  services: [Service.Youth, Service.Workshops, Service.Counselling],
  description:
    "Advocacy group that hopes to empower youth with practical, hands on and holistic self-care strategies.",
  cardImageUrl: "https://picsum.photos/278/425",
};

export const testOrg2: IOrganisation = {
  name: "OCDNetwork",
  ipcApproved: IPCStatus.Pending,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.OCD,
  mainSupportArea: SupportArea.FundingSupport,
  services: [Service.Workshops, Service.Counselling],
  description:
    "Non-profit society providing support services, cohesion activities and community for those struggling with OCD.",
  cardImageUrl: "https://picsum.photos/278/425",
};

export const testOrg3: IOrganisation = {
  name: "Rebound With Resilience",
  ipcApproved: IPCStatus.Approved,
  verified: VerificationStatus.NotVerified,
  mainSpecialisation: Specialisation.OverallMentalWellbeing,
  mainSupportArea: SupportArea.PartnershipOpportunities,
  services: [Service.Workshops, Service.SpeakingEngagements],
  description:
    "Training provider and podcast commited to cultivating resilience and positive mental wellness.",
  cardImageUrl: "https://picsum.photos/278/425",
};

export const testOrg4: IOrganisation = {
  name: "Resilience Collective (RC)",
  ipcApproved: IPCStatus.NotApproved,
  verified: VerificationStatus.Pending,
  mainSpecialisation: Specialisation.AntiStigmatism,
  mainSupportArea: SupportArea.PartnershipOpportunities,
  services: [Service.Workshops, Service.SpeakingEngagements],
  description:
    "By harnessing the voices of peers with first-hand perspectives of mental health recovery, RC aims to drive anti-stigmatism and promote help-seeking among those at risk.",
  cardImageUrl: "https://picsum.photos/278/425",
};

export const testOrgs: IOrganisation[] = [
  testOrg1,
  testOrg2,
  testOrg3,
  testOrg4,
];
