import { Flex, Box } from "@chakra-ui/react";
import { Component } from "react";
import "../scss/profile.scss";

class Profile extends Component {
  render() {
    return (
      <Flex className="profileFlex">
        <Box>This is the profile</Box>
      </Flex>
    );
  }
}

export default Profile;
