import { ReactComponent as AntiStigmatismIcon } from "../assets/icons/mental-health-issue/anti-stigmatism.svg";
import { ReactComponent as FacebookIcon } from "../assets/icons/socials/facebook.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/socials/instagram.svg";
import { ReactComponent as LinkedInIcon } from "../assets/icons/socials/linkedin.svg";
import { ReactComponent as YoutubeIcon } from "../assets/icons/socials/youtube.svg";
import { ReactComponent as TiktokIcon } from "../assets/icons/socials/tiktok.svg";
import { SocialType } from "../data/enums/social-type.enum";
import { MentalHealthIssue } from "../data/enums/mental-health-issue.enum";

export function GetIconForIssue(issue: MentalHealthIssue) {
  switch (issue) {
    case MentalHealthIssue.AntiStigmatism:
      return <AntiStigmatismIcon />;
    default:
      return null;
  }
}

export function GetIconForSocials(socialType: SocialType) {
  switch (socialType) {
    case SocialType.Facebook:
      return <FacebookIcon />;
    case SocialType.Youtube:
      return <YoutubeIcon />;
    case SocialType.Instagram:
      return <InstagramIcon />;
    case SocialType.LinkedIn:
      return <LinkedInIcon />;
    case SocialType.TikTok:
      return <TiktokIcon />;
    default:
      return null;
  }
}
