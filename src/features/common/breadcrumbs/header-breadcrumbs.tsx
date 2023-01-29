import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { Component } from "react";
import "./header-breadcrumbs.scss";
import { HomeIcon } from "@primer/octicons-react";

type HeaderBreadCrumbsProps = {
  pageName: string;
};

class HeaderBreadCrumbs extends Component<HeaderBreadCrumbsProps> {
  private pageName: string;

  constructor(props: HeaderBreadCrumbsProps) {
    super(props);
    this.pageName = props.pageName;
  }

  // REVIEW use referential links

  render() {
    return (
      <Flex className="breadCrumbFlex">
        <Box className="breadCrumbBox">
          <Breadcrumb spacing="15px" separator={<ChevronRightIcon />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon />
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/organisations">
                Organisations
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <Text>{this.pageName}</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </Flex>
    );
  }
}

export default HeaderBreadCrumbs;
