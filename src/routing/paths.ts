export class Paths {
  static readonly home = "/";
  static readonly OrganisationListing = "/organisations";
  static readonly organisationProfile = "/organisations/:orgId";
  static readonly login = "/login";
  static readonly signup = "/registration";
  static readonly emailVerification = "/verification";
  static readonly emailVerified = "/verified";
  static readonly profileSetup = "/profile-setup";
  static readonly dashboard = "/dashboard";
  static readonly about = "/about-us";
  static readonly contactUs = "/contact-us";
  static readonly verifyEmail = "/auth/action";
}

export const buildOrgProfilePath = (orgId: string) =>
  `${Paths.OrganisationListing}/${orgId}`;
