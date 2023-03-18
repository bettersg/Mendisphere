export class Paths {
  static readonly home = "/";
  static readonly organisationListing = "/organisations";
  static readonly organisationProfile = "/organisations/:orgId";
  static readonly login = "/login";
  static readonly signup = "/signup";
  static readonly dashboard = "/dashboard";
  static readonly about = "/about-us";
}

export const buildOrgProfilePath = (orgId: string) =>
  `${Paths.organisationListing}/${orgId}`;
