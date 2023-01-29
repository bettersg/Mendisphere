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
  pageName?: string;
};

class HeaderBreadCrumbs extends Component<HeaderBreadCrumbsProps> {
  private pageName: string | undefined;

  constructor(props: HeaderBreadCrumbsProps) {
    super(props);
    this.pageName = props.pageName;
  }

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
              <BreadcrumbLink
                href={this.pageName ? "/organisations" : undefined}
              >
                <Text className={!this.pageName ? "currentPage" : undefined}>
                  Organisations
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {this.pageName && (
              <BreadcrumbItem isCurrentPage>
                <Text className="currentPage">{this.pageName}</Text>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Box>
      </Flex>
    );
  }
}

export default HeaderBreadCrumbs;
