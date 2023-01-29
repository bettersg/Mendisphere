import {
  Flex,
  Box,
  HStack,
  Divider,
  Text,
  Spacer,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Component } from "react";
import { Service } from "../../../data/enums/service.enum";
import { GetIconForService } from "../../../utilities/icon-mappings";
import "../scss/services.scss";

type ServicesProp = {
  needs: Service[]; // limit to 2
  offerrings: Service[]; // limit to 4
};

function generateServiceView(collection: Service[]) {
  return collection.map((item) => {
    return (
      <HStack key={item}>
        {GetIconForService(item)}
        <Text className="serviceText">{item}</Text>
      </HStack>
    );
  });
}

class Services extends Component {
  private testServices: ServicesProp = {
    needs: [Service.PartnershipOpportunities, Service.FundingSupport],
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
        <Box className="servicesBox">
          <HStack spacing="65px" height="100%" align="flex-start">
            <VStack className="needsBox" align="flex-start" spacing="15px">
              <Text>What we need</Text>
              <Spacer />
              {generateServiceView(this.testServices.needs)}
            </VStack>
            <Divider className="divider" orientation="vertical" />
            <VStack className="offerringBox" align="flex-start" spacing="15px">
              <Text>What we offer</Text>
              <Spacer />
              <SimpleGrid columns={2} spacingX="24px" spacingY="15px">
                {generateServiceView(this.testServices.offerrings)}
              </SimpleGrid>
            </VStack>
          </HStack>
        </Box>
      </Flex>
    );
  }
}

export default Services;
