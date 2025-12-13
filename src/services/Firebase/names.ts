// define collections names used in firestore
export class Collections {
  static readonly organisations = "organisations";
  static readonly users = "users";
  static readonly organisationsAdminData = "organisationAdminData";
  static readonly organisationPeopleSpotlight = "organisationPeopleSpotlight";
  static readonly organisationFAQ = "organisationFAQ";
  static readonly organisationOurStory = "organisationOurStory";
  static readonly organisationImpact = "organisationImpact";
  static readonly organisationSummary = "organisationSummary";
}

export class StorageDirectory {
  static readonly orgListingsDirectory = "/organisations/listing-data";
  static readonly orgProfilesDirectory = "/organisations/profile-data";
  static readonly consultantProfilesDirectory = `/consultants/profile-data`;
  static readonly profilesOurStoryDirectory = `${StorageDirectory.orgProfilesDirectory}/:orgId/our-story`;
  static readonly profilesPeopleSpotlightDirectory = `${StorageDirectory.orgProfilesDirectory}/:orgId/people-spotlight`;
  static readonly consultantProfileImagesDirectory = `${StorageDirectory.consultantProfilesDirectory}/:consultantId/profile`;
}
