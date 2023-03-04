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
import { getOrganisationProfileData } from "../../../data/model/organisationProfile";
import { GetIconForSocials } from "../../../utilities/icon-mappings";
import "../scss/profile.scss";
import { Social } from "./summary";

export type tabData = {
  label: ETabLabel;
  content?:
    | IOurStory[]
    | IImpact[]
    | IFAQ[]
    | IFeaturedProjects
    | IPeopleSpotlight[];
};
export interface IOurStory {
  header: string;
  text: string;
  imageUrl: string;
}

export interface IImpact extends IOurStory {}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface IFeaturedProjects {
  content: string;
}

export interface IPeopleSpotlight {
  name: string;
  jobTitle: string;
  description: string;
  photoUrl: string;
  socials: Social[];
  learnMore: { question: string; answer: string };
}

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
      return (
        <div>
          {!!content &&
            content.map((item: any, i: any) => {
              // TODO sidebar? or pushback
              return (
                <div key={i} style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      paddingBottom: 30,
                      paddingTop: 60,
                    }}
                  >
                    {item.header}
                  </div>
                  <div style={{ fontSize: 18, paddingBottom: 30 }}>
                    {item.text}
                  </div>
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
              );
            })}
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
      return <>{content.content}</>; // TODO pending designers
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

const Profile: React.FC = () => {
  // TODO retrieve organisation ID based on selected option
  const mockOrganisationId = "5EwkmPe7M9fRtcRa6PnJ";
  const [profileData, setProfileData] = useState<tabData[]>([]);

  const getData = async () => {
    await getOrganisationProfileData(mockOrganisationId).then((data) =>
      setProfileData(data)
    );
  };
  useEffect(() => {
    getData();
  }, []);
  console.log("rendering", profileData);
  return (
    <Tabs isLazy isFitted align="center" style={{ width: 1200 }}>
      <TabList>
        {profileData.map((tab, index) => (
          <Tab
            className="tabStyle"
            _selected={{
              color: "#3959FF",
              borderColor: "#3959FF",
            }}
            key={index}
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
  );
};

export default Profile;
