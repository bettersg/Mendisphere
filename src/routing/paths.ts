export class Paths {
  static readonly home = "/";
  static readonly OrganisationListing = "/organisations";
  static readonly organisationProfile = "/organisations/:orgId";
  static readonly consultants = "/consultants";
  static readonly consultantProfile = "/consultants/:consultantId";
  static readonly login = "/login";
  static readonly signup = "/registration";
  static readonly profileSetup = "/profile-setup";
  static readonly dashboard = "/dashboard";
  static readonly about = "/about-us";
  static readonly contactUs = "/contact-us"
}

export const buildOrgProfilePath = (orgId: string) =>
  `${Paths.OrganisationListing}/${orgId}`;
