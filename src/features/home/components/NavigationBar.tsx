import { useState } from "react";
import { Box, Flex, HStack, Text, Stack, Link, Spacer } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import NavigationButton from "./NavigationButton";
import { Paths } from "../../../paths";
import "../../page-style.scss";

const Navigation = () => {
  const [mobileNav, setMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  // alpha version only
  const handleScrollToFooter = () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HStack className="page-width" paddingLeft="4vw">
      <Spacer></Spacer>
      <HStack spacing={8} alignItems={"center"}>
        <HStack
          paddingRight="100px"
          as={"nav"}
          spacing="80px"
          fontSize="15px"
          fontWeight="700"
          color="#333333"
          display={{ base: "none", md: "flex" }}
        >
          <Link onClick={handleScrollToFooter}>About</Link>
          <Link as={ReactRouterLink} to={Paths.organisationListing}>
            Organisations
          </Link>
          <Link onClick={handleScrollToFooter}>Contact Us</Link>
        </HStack>
        {/* <Flex flex={1} justify={"flex-end"}>
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
          </Flex> */}
      </HStack>

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
    </HStack>
  );
};

export default Navigation;
