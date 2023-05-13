import { useState } from "react";
import { Box, Flex, HStack, IconButton, Stack, Link } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import NavigationButton from "./NavigationButton";
import { Paths } from "../../../paths";

const Navigation = () => {
  const [mobileNav, setMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>Logo</Box>
        {/* <HStack spacing={8} alignItems={"center"}>
          <HStack
            paddingRight="100px"
            as={"nav"}
            spacing="80px"
            fontSize="sm"
            fontWeight="700"
            display={{ base: "none", md: "flex" }}
          >
            <Link as={ReactRouterLink} to={Paths.about} fontFamily={"Inter"}>
              About
            </Link>
            <Link
              as={ReactRouterLink}
              to={Paths.organisationListing}
              fontFamily={"Inter"}
            >
              Organisations
            </Link>
            <Link
              as={ReactRouterLink}
              to={Paths.contactUs}
              fontFamily={"Inter"}
            >
              Contact Us
            </Link>
          </HStack>
          <Flex flex={1} justify={"flex-end"}>
            <HStack
              direction={"row"}
              spacing={4}
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
            >
              <NavigationButton
                backgroundColor="#192873"
                navigationLink={Paths.login}
                buttonText="Log in"
                height="6vh"
                width="9vw"
              />
              <NavigationButton
                backgroundColor="#192873"
                navigationLink={Paths.signup}
                buttonText="Sign up"
                height="6vh"
                width="9vw"
              />
            </HStack>
            <IconButton
              size={"md"}
              icon={mobileNav ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={toggleMobileNav}
            />
          </Flex>
        </HStack> */}
      </Flex>

      {mobileNav ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Link
              as={ReactRouterLink}
              to={"/organisations"}
              fontFamily={"Inter"}
            >
              Organisations
            </Link>
            <Link
              as={ReactRouterLink}
              to={"/applyforservices"}
              fontFamily={"Inter"}
            >
              Apply for Services
            </Link>
            <Link as={ReactRouterLink} to={"/contactus"} fontFamily={"Inter"}>
              Contact Us
            </Link>
            <Stack direction={"row"} spacing={4} alignItems={"center"}>
              <NavigationButton
                backgroundColor="#192873"
                navigationLink="/login"
                buttonText="Log in"
                height="6vh"
                width="9vw"
              />
              <NavigationButton
                backgroundColor="#192873"
                navigationLink=""
                buttonText="Sign up"
                height="6vh"
                width="9vw"
              />
            </Stack>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navigation;
