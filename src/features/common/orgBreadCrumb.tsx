import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { HomeIcon } from "@primer/octicons-react";
import { Organisation } from "../../data/model/organisation";
import { Paths } from "../../paths";

const OrgBreadCrumb: React.FC<{ org?: Organisation }> = ({ org }) => {
  const isOrgProfilePage = org !== undefined;

  return (
    <Flex h="8vh" className="page-padding">
      <Box alignSelf="center">
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
            >
              <Text textStyle={isOrgProfilePage ? undefined : "breadCrumbLink"}>
                Organisations
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* organisation profile page */}
          {isOrgProfilePage && (
            <BreadcrumbItem>
              <Text textStyle="breadCrumbLink">{org.name}</Text>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </Box>
    </Flex>
  );
};

export default OrgBreadCrumb;
