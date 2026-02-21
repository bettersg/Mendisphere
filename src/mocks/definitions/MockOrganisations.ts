import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import { Service } from "../../data/Enums/service.enum";
import { Specialisation } from "../../data/Enums/specialisation.enum";
import { SupportArea } from "../../data/Enums/support-area.enum";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { IOrganisation } from "../../data/Model/Organisation";
import { IProfileContent } from "../../data/Model/OrganisationProfile/ProfileContent";
import { IOrganisationSummary } from "../../data/Model/OrganisationSummary";
import { faker } from "@faker-js/faker";
import { SocialType } from "../../data/Enums/social-type.enum";
import { IPeopleSpotlight } from "../../data/Model/OrganisationProfile/OrganisationProfilePeopleSpotlight";

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
  videoUrl: "https://www.youtube.com/embed/oznr-1-poSU?si=ejpWQEbFXUFHD4xD",
  websiteUrl: faker.internet.url(),
  donationUrl: faker.internet.url(),
  mission:
    "Advocacy group that hopes to empower youth with practical, hands on and holistic self-care strategies.",
  email: faker.internet.email(),
  socials: [
    {
      socialType: SocialType.Youtube,
      url: "https://www.youtube.com/",
    },
  ],
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
  videoUrl: "https://www.youtube.com/embed/oznr-1-poSU?si=ejpWQEbFXUFHD4xD",
  websiteUrl: faker.internet.url(),
  donationUrl: faker.internet.url(),
  mission:
    "Non-profit society providing support services, cohesion activities and community for those struggling with OCD.",
  email: faker.internet.email(),
  socials: [
    {
      socialType: SocialType.Youtube,
      url: "https://www.youtube.com/",
    },
    {
      socialType: SocialType.Facebook,
      url: "https://www.facebook.com/",
    },
    {
      socialType: SocialType.LinkedIn,
      url: "https://www.linkedin.com/",
    },
    {
      socialType: SocialType.Instagram,
      url: "https://www.instagram.com/",
    },
    {
      socialType: SocialType.TikTok,
      url: "https://www.tiktok.com/",
    },
  ],
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
  videoUrl: "https://www.youtube.com/embed/oznr-1-poSU?si=ejpWQEbFXUFHD4xD",
  websiteUrl: faker.internet.url(),
  donationUrl: faker.internet.url(),
  mission:
    "Training provider and podcast commited to cultivating resilience and positive mental wellness.",
  email: faker.internet.email(),
  socials: [
    {
      socialType: SocialType.Youtube,
      url: "https://www.youtube.com/",
    },
    {
      socialType: SocialType.Facebook,
      url: "https://www.facebook.com/",
    },
    {
      socialType: SocialType.LinkedIn,
      url: "https://www.linkedin.com/",
    },
    {
      socialType: SocialType.Instagram,
      url: "https://www.instagram.com/",
    },
    {
      socialType: SocialType.TikTok,
      url: "https://www.tiktok.com/",
    },
  ],
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
  videoUrl: "https://www.youtube.com/embed/oznr-1-poSU",
  websiteUrl: faker.internet.url(),
  donationUrl: faker.internet.url(),
  mission:
    "We support the recovery journeys of persons with mental health challenges and encourage help seeking among those at risk.",
  email: faker.internet.email(),
  socials: [
    {
      socialType: SocialType.Youtube,
      url: "https://www.youtube.com/",
    },
    {
      socialType: SocialType.Facebook,
      url: "https://www.facebook.com/",
    },
    {
      socialType: SocialType.LinkedIn,
      url: "https://www.linkedin.com/",
    },
    {
      socialType: SocialType.Instagram,
      url: "https://www.instagram.com/",
    },
    {
      socialType: SocialType.TikTok,
      url: "https://www.tiktok.com/",
    },
  ],
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

// Helper to generate reusable OurStory content
function generateOurStory(): IProfileContent[] {
  return [
    {
      header: faker.lorem.words(),
      section: [
        { subHeader: faker.lorem.words(), text: faker.lorem.paragraph() },
      ],
      imageUrl: "https://picsum.photos/300/450",
    },
    {
      header: faker.lorem.words(),
      section: [
        { subHeader: faker.lorem.words(), text: faker.lorem.paragraph() },
        { subHeader: faker.lorem.words(), text: faker.lorem.paragraph() },
        { subHeader: faker.lorem.words(), text: faker.lorem.paragraph() },
      ],
      imageUrl: "https://picsum.photos/300/450",
    },
    {
      header: faker.lorem.words(),
      section: [
        { subHeader: faker.lorem.words(), text: faker.lorem.paragraph() },
        { subHeader: faker.lorem.words(), text: faker.lorem.paragraph() },
      ],
      imageUrl: "https://picsum.photos/300/450",
    },
  ];
}

// Helper to generate reusable PeopleSpotlight content
function generatePeopleSpotlight(): IPeopleSpotlight[] {
  return [
    {
      name: faker.person.fullName(),
      jobTitle: faker.person.jobTitle(),
      description: faker.person.jobDescriptor(),
      photoUrl: "https://picsum.photos/100/100",
      socials: [
        { socialType: SocialType.Facebook, url: faker.internet.url() },
        { socialType: SocialType.LinkedIn, url: faker.internet.url() },
        { socialType: SocialType.Youtube, url: faker.internet.url() },
      ],
      learnMore: {
        question: faker.lorem.sentence(),
        answer: faker.lorem.lines({ min: 1, max: 3 }),
      },
    },
    {
      name: faker.person.fullName(),
      jobTitle: faker.person.jobTitle(),
      description: faker.person.jobDescriptor(),
      photoUrl: "https://picsum.photos/100/100",
      socials: [
        { socialType: SocialType.LinkedIn, url: faker.internet.url() },
        { socialType: SocialType.Youtube, url: faker.internet.url() },
      ],
      learnMore: {
        question: faker.lorem.sentence(),
        answer: faker.lorem.lines({ min: 1, max: 3 }),
      },
    },
  ];
}

// Helper to generate a summary
function generateSummary(mission?: string): IOrganisationSummary {
  return {
    videoUrl: "https://www.youtube.com/embed/oznr-1-poSU?si=ejpWQEbFXUFHD4xD",
    websiteUrl: faker.internet.url(),
    donationUrl: faker.internet.url(),
    mission: mission ?? "",
    email: faker.internet.email(),
    socials: [
      { socialType: SocialType.Youtube, url: "https://www.youtube.com/" },
      { socialType: SocialType.Facebook, url: "https://www.facebook.com/" },
      { socialType: SocialType.LinkedIn, url: "https://www.linkedin.com/" },
      { socialType: SocialType.Instagram, url: "https://www.instagram.com/" },
      { socialType: SocialType.TikTok, url: "https://www.tiktok.com/" },
    ],
  };
}

export const testOrg5: IOrganisation = {
  name: "MindWell Foundation",
  ipcApproved: IPCStatus.Approved,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.YouthMentalWellness,
  mainSupportArea: SupportArea.FundingSupport,
  services: [Service.Youth, Service.Counselling, Service.PeerSupportCircles],
  description:
    "Empowering young people with mental wellness resources through peer support and professional counselling services.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg5Summary = generateSummary(testOrg5.description);
export const testOrg5OurStory = generateOurStory();
export const testOrg5PeopleSpotlight = generatePeopleSpotlight();

export const testOrg6: IOrganisation = {
  name: "Calm Horizons",
  ipcApproved: IPCStatus.Pending,
  verified: VerificationStatus.NotVerified,
  mainSpecialisation: Specialisation.Anxiety,
  mainSupportArea: SupportArea.Volunteers,
  services: [Service.SupportGroup, Service.TextBasedChatPlatform],
  description:
    "Providing accessible anxiety support through text-based chat platforms and community support groups.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg6Summary = generateSummary(testOrg6.description);
export const testOrg6OurStory = generateOurStory();
export const testOrg6PeopleSpotlight = generatePeopleSpotlight();

export const testOrg7: IOrganisation = {
  name: "New Mothers Network",
  ipcApproved: IPCStatus.Approved,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.PostPartum,
  mainSupportArea: SupportArea.FundingSupport,
  services: [Service.SupportGroup, Service.Counselling, Service.PeerSupportCircles],
  description:
    "Dedicated to supporting new mothers experiencing postpartum depression through peer circles and professional counselling.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg7Summary = generateSummary(testOrg7.description);
export const testOrg7OurStory = generateOurStory();
export const testOrg7PeopleSpotlight = generatePeopleSpotlight();

export const testOrg8: IOrganisation = {
  name: "WorkLife Balance SG",
  ipcApproved: IPCStatus.NotApproved,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.Corporate,
  mainSupportArea: SupportArea.PartnershipOpportunities,
  services: [Service.CorporateTraining, Service.Workshops, Service.SpeakingEngagements],
  description:
    "Helping organisations build mentally healthy workplaces through corporate wellness programmes and training.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg8Summary = generateSummary(testOrg8.description);
export const testOrg8OurStory = generateOurStory();
export const testOrg8PeopleSpotlight = generatePeopleSpotlight();

export const testOrg9: IOrganisation = {
  name: "Therapy Access Initiative",
  ipcApproved: IPCStatus.Approved,
  verified: VerificationStatus.Pending,
  mainSpecialisation: Specialisation.Therapy,
  mainSupportArea: SupportArea.FundingSupport,
  services: [Service.Counselling, Service.TrainingProvider],
  description:
    "Making therapy accessible to underserved communities through subsidised counselling and therapist training programmes.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg9Summary = generateSummary(testOrg9.description);
export const testOrg9OurStory = generateOurStory();
export const testOrg9PeopleSpotlight = generatePeopleSpotlight();

export const testOrg10: IOrganisation = {
  name: "OCD Warriors Singapore",
  ipcApproved: IPCStatus.Pending,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.OCD,
  mainSupportArea: SupportArea.Volunteers,
  services: [Service.OCD, Service.SupportGroup, Service.Workshops],
  description:
    "Peer-led community offering specialised OCD support groups, workshops and volunteer-driven outreach programmes.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg10Summary = generateSummary(testOrg10.description);
export const testOrg10OurStory = generateOurStory();
export const testOrg10PeopleSpotlight = generatePeopleSpotlight();

export const testOrg11: IOrganisation = {
  name: "StigmaFree SG",
  ipcApproved: IPCStatus.Approved,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.AntiStigmatism,
  mainSupportArea: SupportArea.PartnershipOpportunities,
  services: [Service.SpeakingEngagements, Service.Workshops, Service.Youth],
  description:
    "Leading the conversation on mental health stigma reduction through public education campaigns and youth engagement.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg11Summary = generateSummary(testOrg11.description);
export const testOrg11OurStory = generateOurStory();
export const testOrg11PeopleSpotlight = generatePeopleSpotlight();

export const testOrg12: IOrganisation = {
  name: "HeadStrong Youth",
  ipcApproved: IPCStatus.NotApproved,
  verified: VerificationStatus.NotVerified,
  mainSpecialisation: Specialisation.YouthMentalWellness,
  mainSupportArea: SupportArea.Volunteers,
  services: [Service.Youth, Service.PeerSupportCircles, Service.TextBasedChatPlatform],
  description:
    "Youth-led mental wellness initiative providing peer support circles and anonymous chat-based counselling for teens.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg12Summary = generateSummary(testOrg12.description);
export const testOrg12OurStory = generateOurStory();
export const testOrg12PeopleSpotlight = generatePeopleSpotlight();

export const testOrg13: IOrganisation = {
  name: "Mindful Workspaces",
  ipcApproved: IPCStatus.Approved,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.Corporate,
  mainSupportArea: SupportArea.FundingSupport,
  services: [Service.CorporateTraining, Service.TrainingProvider, Service.Workshops],
  description:
    "Partnering with businesses to create mindful workplace cultures through evidence-based corporate wellness training.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg13Summary = generateSummary(testOrg13.description);
export const testOrg13OurStory = generateOurStory();
export const testOrg13PeopleSpotlight = generatePeopleSpotlight();

export const testOrg14: IOrganisation = {
  name: "Serenity Centre",
  ipcApproved: IPCStatus.Pending,
  verified: VerificationStatus.Pending,
  mainSpecialisation: Specialisation.OverallMentalWellbeing,
  mainSupportArea: SupportArea.PartnershipOpportunities,
  services: [Service.Counselling, Service.OverallMentalWellbeing, Service.SupportGroup],
  description:
    "Community wellness centre offering holistic mental health support including counselling, meditation and support groups.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg14Summary = generateSummary(testOrg14.description);
export const testOrg14OurStory = generateOurStory();
export const testOrg14PeopleSpotlight = generatePeopleSpotlight();

export const testOrg15: IOrganisation = {
  name: "Brave Hearts Alliance",
  ipcApproved: IPCStatus.NotApproved,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.Anxiety,
  mainSupportArea: SupportArea.FundingSupport,
  services: [Service.SupportGroup, Service.Counselling, Service.SpeakingEngagements],
  description:
    "Supporting individuals living with anxiety disorders through evidence-based group therapy and professional counselling.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg15Summary = generateSummary(testOrg15.description);
export const testOrg15OurStory = generateOurStory();
export const testOrg15PeopleSpotlight = generatePeopleSpotlight();

export const testOrg16: IOrganisation = {
  name: "PostPartum SG",
  ipcApproved: IPCStatus.Approved,
  verified: VerificationStatus.NotVerified,
  mainSpecialisation: Specialisation.PostPartum,
  mainSupportArea: SupportArea.Volunteers,
  services: [Service.PeerSupportCircles, Service.TextBasedChatPlatform, Service.Counselling],
  description:
    "Volunteer-driven organisation providing 24/7 text-based support and peer circles for mothers with postpartum challenges.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg16Summary = generateSummary(testOrg16.description);
export const testOrg16OurStory = generateOurStory();
export const testOrg16PeopleSpotlight = generatePeopleSpotlight();

export const testOrg17: IOrganisation = {
  name: "The Listening Room",
  ipcApproved: IPCStatus.Pending,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.Therapy,
  mainSupportArea: SupportArea.PartnershipOpportunities,
  services: [Service.Counselling, Service.TrainingProvider, Service.SpeakingEngagements],
  description:
    "Connecting individuals with affordable therapy through a network of trained counsellors and mental health professionals.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg17Summary = generateSummary(testOrg17.description);
export const testOrg17OurStory = generateOurStory();
export const testOrg17PeopleSpotlight = generatePeopleSpotlight();

export const testOrg18: IOrganisation = {
  name: "Mind Matters Collective",
  ipcApproved: IPCStatus.Approved,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.OverallMentalWellbeing,
  mainSupportArea: SupportArea.FundingSupport,
  services: [Service.OverallMentalWellbeing, Service.Workshops, Service.PeerSupportCircles],
  description:
    "Holistic mental wellness programmes combining workshops, peer support and community outreach for overall wellbeing.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg18Summary = generateSummary(testOrg18.description);
export const testOrg18OurStory = generateOurStory();
export const testOrg18PeopleSpotlight = generatePeopleSpotlight();

export const testOrg19: IOrganisation = {
  name: "Safe Space Network",
  ipcApproved: IPCStatus.NotApproved,
  verified: VerificationStatus.Pending,
  mainSpecialisation: Specialisation.AntiStigmatism,
  mainSupportArea: SupportArea.Volunteers,
  services: [Service.Youth, Service.SpeakingEngagements, Service.TextBasedChatPlatform],
  description:
    "Creating safe spaces for open mental health conversations through youth ambassadors and anonymous support platforms.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg19Summary = generateSummary(testOrg19.description);
export const testOrg19OurStory = generateOurStory();
export const testOrg19PeopleSpotlight = generatePeopleSpotlight();

export const testOrg20: IOrganisation = {
  name: "Clarity Minds",
  ipcApproved: IPCStatus.Approved,
  verified: VerificationStatus.Verified,
  mainSpecialisation: Specialisation.YouthMentalWellness,
  mainSupportArea: SupportArea.PartnershipOpportunities,
  services: [Service.Youth, Service.Workshops, Service.CorporateTraining],
  description:
    "Bridging youth mental wellness and corporate responsibility through school programmes and workplace partnerships.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg20Summary = generateSummary(testOrg20.description);
export const testOrg20OurStory = generateOurStory();
export const testOrg20PeopleSpotlight = generatePeopleSpotlight();

export const testOrg21: IOrganisation = {
  name: "Inner Peace Project",
  ipcApproved: IPCStatus.Pending,
  verified: VerificationStatus.NotVerified,
  mainSpecialisation: Specialisation.Therapy,
  mainSupportArea: SupportArea.FundingSupport,
  services: [Service.Counselling, Service.SupportGroup, Service.OverallMentalWellbeing],
  description:
    "Nonprofit offering sliding-scale therapy and mindfulness-based support groups for individuals seeking mental wellness.",
  cardImageUrl: "https://picsum.photos/278/425",
};
export const testOrg21Summary = generateSummary(testOrg21.description);
export const testOrg21OurStory = generateOurStory();
export const testOrg21PeopleSpotlight = generatePeopleSpotlight();

type mockOrganisationData = {
  org: IOrganisation;
  summary: IOrganisationSummary;
  ourStory: IProfileContent[];
  peopleSpotlight: IPeopleSpotlight[];
};

export const mockOrganisations: mockOrganisationData[] = [
  { org: testOrg1, summary: testOrg1Summary, ourStory: testOrg1OurStory, peopleSpotlight: testOrg1PeopleSpotlight },
  { org: testOrg2, summary: testOrg2Summary, ourStory: testOrg2OurStory, peopleSpotlight: testOrg2PeopleSpotlight },
  { org: testOrg3, summary: testOrg3Summary, ourStory: testOrg3OurStory, peopleSpotlight: testOrg3PeopleSpotlight },
  { org: testOrg4, summary: testOrg4Summary, ourStory: testOrg4OurStory, peopleSpotlight: testOrg4PeopleSpotlight },
  { org: testOrg5, summary: testOrg5Summary, ourStory: testOrg5OurStory, peopleSpotlight: testOrg5PeopleSpotlight },
  { org: testOrg6, summary: testOrg6Summary, ourStory: testOrg6OurStory, peopleSpotlight: testOrg6PeopleSpotlight },
  { org: testOrg7, summary: testOrg7Summary, ourStory: testOrg7OurStory, peopleSpotlight: testOrg7PeopleSpotlight },
  { org: testOrg8, summary: testOrg8Summary, ourStory: testOrg8OurStory, peopleSpotlight: testOrg8PeopleSpotlight },
  { org: testOrg9, summary: testOrg9Summary, ourStory: testOrg9OurStory, peopleSpotlight: testOrg9PeopleSpotlight },
  { org: testOrg10, summary: testOrg10Summary, ourStory: testOrg10OurStory, peopleSpotlight: testOrg10PeopleSpotlight },
  { org: testOrg11, summary: testOrg11Summary, ourStory: testOrg11OurStory, peopleSpotlight: testOrg11PeopleSpotlight },
  { org: testOrg12, summary: testOrg12Summary, ourStory: testOrg12OurStory, peopleSpotlight: testOrg12PeopleSpotlight },
  { org: testOrg13, summary: testOrg13Summary, ourStory: testOrg13OurStory, peopleSpotlight: testOrg13PeopleSpotlight },
  { org: testOrg14, summary: testOrg14Summary, ourStory: testOrg14OurStory, peopleSpotlight: testOrg14PeopleSpotlight },
  { org: testOrg15, summary: testOrg15Summary, ourStory: testOrg15OurStory, peopleSpotlight: testOrg15PeopleSpotlight },
  { org: testOrg16, summary: testOrg16Summary, ourStory: testOrg16OurStory, peopleSpotlight: testOrg16PeopleSpotlight },
  { org: testOrg17, summary: testOrg17Summary, ourStory: testOrg17OurStory, peopleSpotlight: testOrg17PeopleSpotlight },
  { org: testOrg18, summary: testOrg18Summary, ourStory: testOrg18OurStory, peopleSpotlight: testOrg18PeopleSpotlight },
  { org: testOrg19, summary: testOrg19Summary, ourStory: testOrg19OurStory, peopleSpotlight: testOrg19PeopleSpotlight },
  { org: testOrg20, summary: testOrg20Summary, ourStory: testOrg20OurStory, peopleSpotlight: testOrg20PeopleSpotlight },
  { org: testOrg21, summary: testOrg21Summary, ourStory: testOrg21OurStory, peopleSpotlight: testOrg21PeopleSpotlight },
];
