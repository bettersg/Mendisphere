import {
  Flex,
  HStack,
  Text,
  VStack,
  SimpleGrid,
  StackDivider,
} from "@chakra-ui/react";
import { Component } from "react";
import { Service } from "../../data/Enums/service.enum";
import { SupportArea } from "../../data/Enums/support-area.enum";
import { GetIcon } from "../../utilities/iconMappings/iconMapping";
import "./services.scss";
import "../style.scss";

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
        <Flex className="servicesContainer page-width page-padding">
          <HStack
            spacing="65px"
            align="flex-start"
            width="100%"
            divider={<StackDivider border="2px solid #cbcbcb" />}
          >
            <VStack width="40%" align="flex-start" spacing="15px">
              <Text>What we need</Text>
              {generateServiceView(this.testServices.needs)}
            </VStack>
            <VStack align="flex-start" spacing="15px">
              <Text>What we offer</Text>
              <SimpleGrid columns={2} spacingX="24px" spacingY="15px">
                {generateServiceView(this.testServices.offerrings)}
              </SimpleGrid>
            </VStack>
          </HStack>
        </Flex>
      </Flex>
    );
  }
}

export default Services;
