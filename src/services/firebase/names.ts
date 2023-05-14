// define collections names used in firestore
export class Collections {
  static readonly organisations = "organisations";
  static readonly users = "users";
  static readonly organisationsAdminData = "organisationAdminData";
  static readonly organisationPeopleSpotlight = "organisationPeopleSpotlight";
  static readonly organisationFAQ = "organisationFAQ";
  static readonly organisationOurStory = "organisationOurStory";
  static readonly organisationSummary = "organisationSummary";
}

export class StorageDirectory {
  static readonly listingsDirectory = "/organisations/listing-data";
  static readonly profilesDirectory = "/organisations/profile-data";
}
