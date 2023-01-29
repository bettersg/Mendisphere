import {
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import { Component } from "react";
import "../scss/profile.scss";

type tabData = {
  label: string;
  content: string;
};

type profileProps = tabData[];

class Profile extends Component {
  private testProfileProps: profileProps = [
    {
      label: "Our story",
      content: "our story...",
    },
    {
      label: "People spotlight",
      content: "people spotlight",
    },
    {
      label: "Featured Projects",
      content: "Featured projects...",
    },
    {
      label: "The impact",
      content: "The impact...",
    },
    {
      label: "FAQ",
      content: "FAQ...",
    },
  ];

  render() {
    return (
      <Flex className="profileFlex">
        <Tabs isLazy isFitted className="tabsContainer" align="center">
          <TabList className="tabList">
            {this.testProfileProps.map((tab, index) => (
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
            {this.testProfileProps.map((tab, index) => (
              <TabPanel p={4} key={index}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>
    );
  }
}

export default Profile;
