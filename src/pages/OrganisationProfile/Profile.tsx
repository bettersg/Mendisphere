import {
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetIconForSocials } from "../../utilities/iconMappings/iconMapping";
import "./profile.scss";
import { Organisation } from "../../data/model/organisation";
import {
  IFAQ,
  getOrganisationProfileFAQ,
} from "../../data/model/organisationProfile/organisationProfileFAQ";
import { getOrganisationProfileOurStory } from "../../data/model/organisationProfile/organisationProfileOurStory";
import {
  IPeopleSpotlight,
  getOrganisationProfilePeopleSpotlight,
} from "../../data/model/organisationProfile/organisationProfilePeopleSpotlight";
import {
  IProfileContent,
  ISection,
} from "../../data/model/organisationProfile/profileContent";
import { ProfileContent } from "./ProfileContent";

// TODO move this to model when class is defined
export interface IFeaturedProjects {
  content: string;
}

export type tabData = {
  label: ETabLabel;
  content?: IProfileContent[] | IFAQ[] | IFeaturedProjects | IPeopleSpotlight[];
};

export enum ETabLabel {
  OUR_STORY = "Our story",
  PEOPLE_SPOTLIGHT = "People spotlight",
  FEATURED_PROJECTS = "Featured projects",
  IMPACT = "Impact",
  FAQ = "FAQ",
}

const renderTabContent = (label: ETabLabel, content: any) => {
  switch (label) {
    case ETabLabel.OUR_STORY:
    case ETabLabel.IMPACT: {
      const contentMenu = content.map(
        ({ header, section }: { header: string; section: ISection[] }) => ({
          header,
          section,
        })
      );
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* left nav bar */}
          <div
            style={{
              textAlign: "left",
              width: "25%",
              display: "flex",
              flexDirection: "column",
              paddingTop: 60,
              marginRight: 125,
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 120 + 60,
                zIndex: 100,
              }}
            >
              {!!contentMenu &&
                contentMenu.map(
                  ({
                    header,
                    section,
                  }: {
                    header: string;
                    section: ISection[];
                  }) => (
                    <div>
                      <div>
                        <a
                          href={`#${header}`}
                          style={{
                            fontWeight: 700,
                            fontSize: 18,
                            color: "#333333",
                          }}
                        >
                          {header}
                        </a>
                      </div>
                      {section?.map(({ subHeader }) => (
                        <div>
                          <a
                            href={`#${subHeader}`}
                            style={{ fontSize: 14, color: "#333333" }}
                          >
                            {subHeader}
                          </a>
                        </div>
                      ))}
                      <div
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#707070",
                          marginTop: 20,
                          marginBottom: 20,
                        }}
                      ></div>
                    </div>
                  )
                )}
            </div>
          </div>
          {/* content section */}
          <div
            style={{ width: "75%", display: "flex", flexDirection: "column" }}
          >
            {!!content &&
              content.map((item: any, i: any) => (
                <div key={i} style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      paddingBottom: 30,
                      paddingTop: 60,
                    }}
                    id={item.header}
                  >
                    {item.header}
                  </div>
                  {item.section?.map(
                    ({ subHeader, text }: { subHeader: any; text: any }) => (
                      <div>
                        <div
                          style={{
                            fontSize: 18,
                            color: "#707070",
                            fontWeight: 700,
                            paddingBottom: 20,
                          }}
                          id={subHeader}
                        >
                          {subHeader}
                        </div>
                        <div style={{ fontSize: 18, paddingBottom: 30 }}>
                          {text}
                        </div>
                      </div>
                    )
                  )}
                  <Image
                    style={{ paddingBottom: 75 }}
                    src={item.imageUrl}
                    alt={`Our Story #${i}`}
                  />
                  <div
                    style={
                      i === content.length - 1
                        ? undefined
                        : { borderBottomWidth: 1, borderBottomColor: "#707070" }
                    }
                  ></div>
                </div>
              ))}
          </div>
        </div>
      );
    }
    case ETabLabel.PEOPLE_SPOTLIGHT:
      return (
        <div style={{ borderRadius: 4 }}>
          <div style={{ paddingTop: 77, paddingBottom: 77, fontSize: 24 }}>
            Hover over ‘Learn More’ to get up close and personal with the team
            members 👀
          </div>
          {!!content &&
            content.map((content: IPeopleSpotlight, i: number) => (
              <div style={{ borderWidth: 1, marginBottom: 40 }} key={i}>
                <Flex
                  direction={"row"}
                  style={{
                    paddingTop: 44,
                    paddingBottom: 44,
                    paddingLeft: 44,
                    paddingRight: 44,
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "70%", textAlign: "left" }}>
                    <div style={{ fontWeight: 700 }}>{content.name}</div>
                    <div style={{ paddingBottom: 20 }}>{content.jobTitle}</div>
                    <div style={{ paddingBottom: 20 }}>
                      {content.description}
                    </div>
                    <Flex direction={"row"}>
                      {content.socials.map((social, i) => (
                        <a
                          href={social.url}
                          key={i}
                          style={{ marginRight: 10 }}
                        >
                          {GetIconForSocials(social.socialType)}
                        </a>
                      ))}
                    </Flex>
                  </div>
                  <div>
                    <Image
                      src={content.photoUrl}
                      alt={"random shiz"}
                      style={{ height: 200, width: 200, borderRadius: 100 }}
                    />
                  </div>
                </Flex>
                <Accordion allowToggle>
                  <AccordionItem key={i}>
                    <AccordionButton
                      color="white"
                      style={{
                        background:
                          "linear-gradient(to left, #FFFFFF, #3959FF)",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          fontWeight: 700,
                          paddingBottom: 6,
                          paddingTop: 6,
                        }}
                      >
                        LEARN MORE
                      </div>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel
                      style={{
                        paddingTop: 35,
                        paddingBottom: 37,
                        background: "#3959FF",
                        flexDirection: "row",
                        display: "flex",
                        paddingLeft: 54,
                        paddingRight: 63,
                        justifyContent: "space-between",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 24,
                          color: "white",
                          maxWidth: "30%",
                        }}
                      >
                        {content.learnMore.question}
                      </div>
                      <div style={{ color: "white", maxWidth: "70%" }}>
                        {content.learnMore.answer}
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
        </div>
      );
    case ETabLabel.FEATURED_PROJECTS:
      return <ProfileContent />; // TODO pending designers
    case ETabLabel.FAQ:
      return (
        <Accordion allowMultiple>
          {!!content &&
            content.map((item: any, i: number) => (
              <AccordionItem key={i}>
                <AccordionButton>
                  <div
                    style={{
                      flex: 1,
                      textAlign: "left",
                      fontWeight: 700,
                      paddingBottom: 26,
                      paddingTop: 31,
                    }}
                  >
                    {item.question}
                  </div>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  style={{ textAlign: "left", paddingBottom: 37 }}
                >
                  {item.answer}
                </AccordionPanel>
                <div
                  style={{ borderBottomWidth: 1, borderBottomColor: "#CBCBCB" }}
                ></div>
              </AccordionItem>
            ))}
        </Accordion>
      );
    default:
      return <></>;
  }
};

const getOrganisationProfileData = async (orgId: string) => {
  const orgFAQSnapshot = await getOrganisationProfileFAQ(orgId);
  const orgFAQ = orgFAQSnapshot?.FAQ;

  const ourStorySnapshot = await getOrganisationProfileOurStory(orgId);
  const ourStory = ourStorySnapshot?.content;

  const peopleSpotlightSnapshot = await getOrganisationProfilePeopleSpotlight(
    orgId
  );
  const peopleSpotlight = peopleSpotlightSnapshot?.content;

  const orgProfileData: tabData[] = [
    {
      label: ETabLabel.OUR_STORY,
      content: ourStory,
    },
    {
      label: ETabLabel.PEOPLE_SPOTLIGHT,
      content: peopleSpotlight,
    },
    {
      label: ETabLabel.FEATURED_PROJECTS,
      content: { content: "TODO fill this" }, // TODO fill this
    },
    // hide for alpha version
    // {
    //   label: ETabLabel.IMPACT,
    //   content: ourStory, // TODO fill this
    // },
    // {
    //   label: ETabLabel.FAQ,
    //   content: orgFAQ,
    // },
  ];

  return orgProfileData;
};

const Profile: React.FC<{ org?: Organisation }> = ({ org }) => {
  // TODO retrieve organisation ID based on selected option
  const orgId = org?.id ?? "";
  const [profileData, setProfileData] = useState<tabData[]>([]);

  useEffect(() => {
    getOrganisationProfileData(orgId).then((data) => setProfileData(data));
  }, []);

  return (
    <Flex className="page-width page-padding">
      <Tabs isLazy isFitted align="center" style={{ width: "100%" }}>
        <TabList
          style={{
            position: "sticky",
            top: 0,
            zIndex: 200,
          }}
        >
          {profileData.map((tab, index) => (
            <Tab
              className="tabStyle"
              bg="#FFFFFF"
              _selected={{
                color: "#3959FF",
                borderColor: "#3959FF",
              }}
              key={index}
              borderBottomWidth={2}
              borderColor={"#CBCBCB"}
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {profileData.map((tab, index) => (
            <TabPanel p={4} key={index}>
              {renderTabContent(tab.label, tab.content)}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Profile;
