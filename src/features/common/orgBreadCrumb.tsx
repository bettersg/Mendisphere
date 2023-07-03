import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HomeIcon } from "@primer/octicons-react";
import { Organisation } from "../../data/model/organisation";
import { Paths } from "../../paths";

const currentPageStyle = {
  color: "#3959FF",
  textDecoration: "underline",
  fontWeight: "700",
};

const OrgBreadCrumb: React.FC<{ org?: Organisation }> = ({ org }) => {
  const isOrgProfilePage = org !== undefined;

  return (
    <Flex h="6vh">
      <Box alignSelf="center" fontSize="14px">
        <Breadcrumb spacing="1vw" separator={<ChevronRightIcon />}>
          {/* Home link */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <HomeIcon />
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* organisations page */}
          <BreadcrumbItem>
            <BreadcrumbLink
              href={isOrgProfilePage ? Paths.organisationListing : undefined}
              style={isOrgProfilePage ? undefined : currentPageStyle}
            >
              Organisations
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* organisation profile page */}
          {isOrgProfilePage && (
            <BreadcrumbItem>
              <BreadcrumbLink
                as={Text}
                style={isOrgProfilePage ? currentPageStyle : undefined}
              >
                {org.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </Box>
    </Flex>
  );
};

export default OrgBreadCrumb;
