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
  static readonly listingsDirectory = "/organisations/listing-data";
  static readonly profilesDirectory = "/organisations/profile-data";
  static readonly profilesOurStoryDirectory = `${StorageDirectory.profilesDirectory}/:orgId/our-story`;
  static readonly profilesPeopleSpotlightDirectory = `${StorageDirectory.profilesDirectory}/:orgId/people-spotlight`;
}
