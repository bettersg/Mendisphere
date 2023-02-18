import {
  Flex,
  Box,
  HStack,
  Divider,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Component } from "react";
import { Service } from "../../../data/enums/service.enum";
import { SupportArea } from "../../../data/enums/support-area.enum";
import { GetIcon } from "../../../utilities/icon-mappings";
import "../scss/services.scss";

type ServicesProp = {
  needs: SupportArea[]; // limit to 2
  offerrings: Service[]; // limit to 4
};

function generateServiceView(collection: Service[] | SupportArea[]) {
  return collection.map((item) => {
    return (
      <HStack key={item}>
        {GetIcon(item)}
        <Text className="serviceText">{item}</Text>
      </HStack>
    );
  });
}

class Services extends Component {
  private testServices: ServicesProp = {
    needs: [SupportArea.PartnershipOpportunities, SupportArea.FundingSupport],
    offerrings: [
      Service.Counselling,
      Service.SupportGroup,
      Service.CorporateTraining,
      Service.SpeakingEngagements,
    ],
  };

  render() {
    return (
      <Flex className="servicesFlex">
        <Flex className="servicesContainer">
          <Box height="100%" width="1440px">
            <HStack spacing="65px" align="flex-start">
              <VStack className="needsBox" align="flex-start" spacing="15px">
                <Text>What we need</Text>
                {generateServiceView(this.testServices.needs)}
              </VStack>
              <Divider className="divider" orientation="vertical" />
              <VStack
                className="offerringBox"
                align="flex-start"
                spacing="15px"
              >
                <Text>What we offer</Text>
                <SimpleGrid columns={2} spacingX="24px" spacingY="15px">
                  {generateServiceView(this.testServices.offerrings)}
                </SimpleGrid>
              </VStack>
            </HStack>
          </Box>
        </Flex>
      </Flex>
    );
  }
}

export default Services;
