import { Box, HStack, Heading, Spacer } from "@chakra-ui/layout";
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import ProfileSetupPage from "../../registration/profile-setup-page";
import { Header, ProfileSidebar } from "./profile-sidebar";

const htmlContent =
  '<h1><span style="background-color: transparent;">OTR Listens</span></h1><p> </p><p><span style="background-color: transparent;">OTR Listens is a text-based chat support. It is a safe, anonymous chat platform for emotional support, manned by trained volunteers.Avie is available if you need an empathetic listening ear during these operating hours: </span></p><ul><li><span style="background-color: transparent;">Monday - Friday (Weekdays): 4pm - 12 midnight (SGT)</span></li><li><span style="background-color: transparent;">Saturday &amp; Sunday (Weekends): 12 noon - 12 midnight daily (SGT) </span></li></ul><p><br></p><p><span style="background-color: transparent;">The chat conversation is strictly private, confidential, and PDPA compliant. Note: This is not a suicide prevention or a crisis service.</span></p><p><br></p><p><span style="background-color: transparent;">[Embed video] </span><a href="https://youtu.be/UpWXtuLDKpQ" rel="noopener noreferrer" target="_blank" style="background-color: transparent;">https://youtu.be/UpWXtuLDKpQ</a></p><p><br></p><p><span style="background-color: transparent;">Find out more here: </span><a href="https://otrlistens.net/" rel="noopener noreferrer" target="_blank" style="background-color: transparent;">https://otrlistens.net/</a></p><p><br></p><h1><span style="background-color: transparent;">Youth Counselling Services (TH!NK X Rainbow)</span></h1><p><span style="background-color: transparent;">OTR’s youth counselling service provides quality psychotherapy and counselling support for youths and families that is timely and affordable.</span></p><p><br></p><p><span style="background-color: transparent;">The Service service is provided in collaboration with Th!nk Psychological Services:</span></p><ul><li><span style="background-color: transparent;">For Whom: 11 to 20 year old (with support for parents included)</span></li><li><span style="background-color: transparent;">What: Package of 6 sessions, 60 min per session, at a rate of $90 per session</span></li><li><span style="background-color: transparent;">How: Tele-therapy as the primary modality - with a professional therapist</span></li><li><span style="background-color: transparent;">When: Weekdays 8:00am - 8:00pm; Saturday 8am - 3pm; Sunday 8am - 3pm; payments to be made 24 hours prior to scheduled session to secure time slot</span></li></ul><p><br></p><p><span style="background-color: transparent;">Find out more here: </span><a href="https://otrlistens.net/thinkxrainbow" rel="noopener noreferrer" target="_blank" style="background-color: transparent;">https://otrlistens.net/thinkxrainbow</a></p><p><br></p><h1><span style="background-color: transparent;">Well-being champion</span></h1><p><span style="background-color: transparent;">OTR Wellbeing Champion is a flagship program to empower a community of wellbeing champions as role models who take responsibility for own mental wellbeing— and as a wellness guide for others—at home, in the school, in the workplace, or out in the community.</span></p><p><br></p><p><span style="background-color: transparent;">A Wellbeing Champion is first and foremost a role model in the community who takes responsibility for his / her own mental wellbeing through self-care practices that create positive change on the inside. The change manifested within then radiates outwards — from the core to the shell—inside to the outside—enabling you to care for and serve those around you better—to become a more effective and aware mental wellness care-giver and wellness guide for others in the community.</span></p><p><br></p><p><span style="background-color: transparent;">Wellbeing Champions can undergo a set of four foundational modules that form the core of OTR’s teachings for the Wellbeing Champion: Mental Health 101, Self-Care 101, Others Care 101, and Psychological First Aid 101.</span></p><p><br></p><p><span style="background-color: transparent;">Find out more here: </span><a href="https://overtherainbow.sg/otr-wellbeing-champion-series/" rel="noopener noreferrer" target="_blank" style="background-color: transparent;">https://overtherainbow.sg/otr-wellbeing-champion-series/</a></p><p><br></p><p> </p>';

export const ProfileContent: React.FC = () => {
  let headerCounter = 0;
  const generateHeaderId = () => `header-${headerCounter++}`;

  const headers: Header[] = [];

  const options: HTMLReactParserOptions = {
    replace: (node: any) => {
      if (node.type === "tag" && node.name.startsWith("h1")) {
        const level = node.name.substr(1);
        let headerId = node.attribs.id;

        if (!headerId) {
          headerId = generateHeaderId();
        }

        const headerText = node.children[0]?.children[0]?.data || "";

        if (level === "1") {
          headers.push({
            id: headerId,
            text: headerText,
            subHeaders: [],
          });
        } else if (level === "2" && headers.length > 0) {
          headers[headers.length - 1].subHeaders.push({
            id: headerId,
            text: headerText,
            subHeaders: [],
          });
        }

        return (
          <Heading as={node.name} size="xl" color="blue" id={headerId}>
            {domToReact(node.children, options)}
          </Heading>
        );
      }
    },
  };

  // todo must sanitize html before rendering
  return (
    <HStack>
      <Box textAlign="left" width="20vw">
        <ProfileSidebar headers={headers} />
      </Box>
      <Spacer />
      <Box width="40vw" textAlign="left">
        {parse(htmlContent, options)}
      </Box>
    </HStack>
  );
};
