import { Flex, Text, VStack } from "@chakra-ui/react";
import "../scss/similar-orgs.scss";
import "../style.scss";
import { useEffect, useState } from "react";
import {
  getOrganisationsForListingsPage,
  Organisation,
  OrganisationListingQueryFilters,
} from "../../data/Model/Organisation";
import CardView from "../OrganisationList/CardView";
import { Specialisation } from "../../data/Enums/specialisation.enum";

const SimilarOrganisations: React.FC<{ org: Organisation }> = ({ org }) => {
  // store organisation card data
  const [orgList, setOrgList] = useState<Organisation[]>([]);
  // states of the 4 filters
  const filter: OrganisationListingQueryFilters = {
    // For testing only, replace with org.mainSpecialisation
    specialisations: [Specialisation.OverallMentalWellbeing],
  };

  useEffect(() => {
    // fetch organisation data on page load
    getOrganisationsForListingsPage(filter, org.name, 4, undefined)
      .then((res) => {
        // console.log('orgs', orgs)
        setOrgList(res.organisations);
      })
      .catch((err) => {
        alert(`Organisation data fetch error!`);
        console.log(err.message);
      });
  }, []);

  return (
    <Flex background="#192873">
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

export default SimilarOrganisations;
