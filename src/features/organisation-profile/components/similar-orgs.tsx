import { Flex, Text, VStack } from "@chakra-ui/react";
import "../scss/similar-orgs.scss";
import "../../page-style.scss";
import { useEffect, useState } from "react";
import {
  getOrganisationsForListingsPage,
  Organisation,
  OrganisationListingQueryFilters,
} from "../../../data/model/organisation";
import CardView from "../../organisation-list/components/CardView";
import { MentalHealthIssue } from "../../../data/enums/mental-health-issue.enum";

const SimilarOrgs: React.FC<{ org: Organisation }> = ({ org }) => {
  // store organisation card data
  const [orgList, setOrgList] = useState<Organisation[]>([]);
  // states of the 4 filters
  const filter: OrganisationListingQueryFilters = {
    specialisations: [MentalHealthIssue.OverallMentalWellbeing],
  };

  useEffect(() => {
    // fetch organisation data on page load
    getOrganisationsForListingsPage(filter, org.name, 4)
      .then((orgs) => {
        // console.log('orgs', orgs)
        setOrgList(orgs);
      })
      .catch((err) => {
        alert(`Organisation data fetch error!`);
        console.log(err.message);
      });
  }, []);

  return (
    <Flex className="maximise-width" background="#192873">
      <Flex
        marginTop="5vh"
        marginBottom="7vh"
        className="page-width page-padding"
      >
        <VStack spacing="2.5vh" align="flex-start">
          <Text color="#FFFFFF">
            Other organisations supporting similar causes
          </Text>
          <CardView organisationList={orgList} />
        </VStack>
      </Flex>
    </Flex>
  );
};

export default SimilarOrgs;
