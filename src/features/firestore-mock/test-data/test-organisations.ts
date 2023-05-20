import { IPCStatus } from "../../../data/enums/ipc-status.enum";
import { Service } from "../../../data/enums/service.enum";
import { Specialisation } from "../../../data/enums/specialisation.enum";
import { SupportArea } from "../../../data/enums/support-area.enum";
import { VerificationStatus } from "../../../data/enums/verification-status.enum";
import { IOrganisation } from "../../../data/model/organisation";
import { IProfileContent } from "../../../data/model/organisationProfile/profileContent";
import { IOrganisationSummary } from "../../../data/model/organisationSummary";
import { faker } from "@faker-js/faker";
import { IPeopleSpotlight } from "../../organisation-profile/components/profile";
import { SocialType } from "../../../data/enums/social-type.enum";

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

export const testOrg1Summary: IOrganisationSummary = {
  videoUrl: "https://youtu.be/oznr-1-poSU",
  websiteUrl: faker.internet.url(),
  donationUrl: faker.internet.url(),
};

export const testOrg1OurStory: IProfileContent[] = [
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
];

export const testOrg1PeopleSpotlight: IPeopleSpotlight[] = [
  {
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    photoUrl: "https://picsum.photos/100/100",
    socials: [
      {
        socialType: SocialType.Facebook,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.LinkedIn,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.Youtube,
        url: faker.internet.url(),
      },
    ],
    learnMore: {
      question: faker.lorem.sentence(),
      answer: faker.lorem.lines({
        min: 1,
        max: 3,
      }),
    },
  },
  {
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    photoUrl: "https://picsum.photos/100/100",
    socials: [
      {
        socialType: SocialType.LinkedIn,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.Youtube,
        url: faker.internet.url(),
      },
    ],
    learnMore: {
      question: faker.lorem.sentence(),
      answer: faker.lorem.lines({
        min: 1,
        max: 3,
      }),
    },
  },
];

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

export const testOrg2Summary: IOrganisationSummary = {
  videoUrl: "https://youtu.be/oznr-1-poSU",
  websiteUrl: faker.internet.url(),
  donationUrl: faker.internet.url(),
};

export const testOrg2OurStory: IProfileContent[] = [
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
];

export const testOrg2PeopleSpotlight: IPeopleSpotlight[] = [
  {
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    photoUrl: "https://picsum.photos/100/100",
    socials: [
      {
        socialType: SocialType.Facebook,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.LinkedIn,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.Youtube,
        url: faker.internet.url(),
      },
    ],
    learnMore: {
      question: faker.lorem.sentence(),
      answer: faker.lorem.lines({
        min: 1,
        max: 3,
      }),
    },
  },
  {
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    photoUrl: "https://picsum.photos/100/100",
    socials: [
      {
        socialType: SocialType.LinkedIn,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.Youtube,
        url: faker.internet.url(),
      },
    ],
    learnMore: {
      question: faker.lorem.sentence(),
      answer: faker.lorem.lines({
        min: 1,
        max: 3,
      }),
    },
  },
];

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

export const testOrg3Summary: IOrganisationSummary = {
  videoUrl: "https://youtu.be/oznr-1-poSU",
  websiteUrl: faker.internet.url(),
  donationUrl: faker.internet.url(),
};

export const testOrg3OurStory: IProfileContent[] = [
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
];

export const testOrg3PeopleSpotlight: IPeopleSpotlight[] = [
  {
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    photoUrl: "https://picsum.photos/100/100",
    socials: [
      {
        socialType: SocialType.Facebook,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.LinkedIn,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.Youtube,
        url: faker.internet.url(),
      },
    ],
    learnMore: {
      question: faker.lorem.sentence(),
      answer: faker.lorem.lines({
        min: 1,
        max: 3,
      }),
    },
  },
  {
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    photoUrl: "https://picsum.photos/100/100",
    socials: [
      {
        socialType: SocialType.LinkedIn,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.Youtube,
        url: faker.internet.url(),
      },
    ],
    learnMore: {
      question: faker.lorem.sentence(),
      answer: faker.lorem.lines({
        min: 1,
        max: 3,
      }),
    },
  },
];

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

export const testOrg4Summary: IOrganisationSummary = {
  videoUrl: "https://youtu.be/oznr-1-poSU",
  websiteUrl: faker.internet.url(),
  donationUrl: faker.internet.url(),
};

export const testOrg4OurStory: IProfileContent[] = [
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
  {
    header: faker.lorem.words(),
    section: [
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
      {
        subHeader: faker.lorem.words(),
        text: faker.lorem.paragraph(),
      },
    ],
    imageUrl: "https://picsum.photos/300/450",
  },
];

export const testOrg4PeopleSpotlight: IPeopleSpotlight[] = [
  {
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    photoUrl: "https://picsum.photos/100/100",
    socials: [
      {
        socialType: SocialType.Facebook,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.LinkedIn,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.Youtube,
        url: faker.internet.url(),
      },
    ],
    learnMore: {
      question: faker.lorem.sentence(),
      answer: faker.lorem.lines({
        min: 1,
        max: 3,
      }),
    },
  },
  {
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    photoUrl: "https://picsum.photos/100/100",
    socials: [
      {
        socialType: SocialType.LinkedIn,
        url: faker.internet.url(),
      },
      {
        socialType: SocialType.Youtube,
        url: faker.internet.url(),
      },
    ],
    learnMore: {
      question: faker.lorem.sentence(),
      answer: faker.lorem.lines({
        min: 1,
        max: 3,
      }),
    },
  },
];

type testData = {
  org: IOrganisation;
  summary: IOrganisationSummary;
  ourStory: IProfileContent[];
  peopleSpotlight: IPeopleSpotlight[];
};

export const testOrgs: testData[] = [
  {
    org: testOrg1,
    summary: testOrg1Summary,
    ourStory: testOrg1OurStory,
    peopleSpotlight: testOrg1PeopleSpotlight,
  },
  {
    org: testOrg2,
    summary: testOrg2Summary,
    ourStory: testOrg2OurStory,
    peopleSpotlight: testOrg2PeopleSpotlight,
  },
  {
    org: testOrg3,
    summary: testOrg3Summary,
    ourStory: testOrg3OurStory,
    peopleSpotlight: testOrg3PeopleSpotlight,
  },
  {
    org: testOrg4,
    summary: testOrg4Summary,
    ourStory: testOrg4OurStory,
    peopleSpotlight: testOrg4PeopleSpotlight,
  },
];
