import { Box, VStack, Text, Select, Grid, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Footer from "../common/footer";
import SimpleNavigationBar from "../common/simple-header/simple-navbar";
import HeaderBreadCrumbs from "../common/breadcrumbs/header-breadcrumbs";
import CardView from "./components/CardView";
import ListView from "./components/ListView";
import ViewToggle from "./components/ViewToggle";
import {
  getOrganisationsForListingsPage,
  Organisation,
  OrganisationListingQueryFilters,
} from "../../data/model/organisation";
import { Button } from "react-bootstrap";

interface IFilterOptions {
  focusesOn?: string;
  services?: string;
  IPCRegistered?: string;
  lookingFor?: string;
}

export enum EViewOption {
  Card = "card",
  List = "list",
}

const OrganisationList: React.FC = () => {
  // store organisation card data
  const [orgList, setOrgList] = useState<Organisation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let filters: OrganisationListingQueryFilters = {
      specialisations: undefined,
      services: undefined,
      ipcStatus: undefined,
      supportAreas: undefined,
    };

    console.log("useeffect triggerred");

    // fetch organisation data on page load
    getOrganisationsForListingsPage()
      .then((orgs) => {
        setOrgList((old) => [...old, ...orgs]);
      })
      .then(() => setIsLoading(false))
      .catch((err) => {
        alert(`Organisation data fetch error!`);
        console.log(err.message);
      });
  }, []);

  //TODO: Need to add another lifecycle method to prevent double requests in react
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({});
  const [viewOption, setViewOption] = useState<EViewOption>(EViewOption.Card);

  // TODO: integrate filter with organization card

  // TODO: replace mockCards with actual list of organization cards from database
  // Object.entries(filterOptions).forEach(([key, value]) => {
  //   if (Boolean(value)) {
  //     validOrganizations = validOrganizations.filter((org) => {
  //       return (org as any)[key] === value;
  //     });
  //   }
  // });

  return (
    <VStack spacing={0} align="stretch">
      <Button onClick={() => console.log(orgList)}>Test</Button>
      <Box minH="11.11vh">
        <SimpleNavigationBar />
      </Box>
      <HeaderBreadCrumbs />
      <Box height={182} bg="#E0E5FF" paddingLeft={128} paddingRight={128}>
        <Text paddingTop={37} paddingBottom={5}>
          How can we help you today?
        </Text>
        <Text fontSize="xs" color={"#707070"} paddingBottom={1}>
          Filter by
        </Text>
        <Grid templateColumns="repeat(4, 1fr)" gap={5}>
          <Select
            placeholder="Specialisations:"
            bg="#FFFFFF"
            color="#2D3748"
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, focusesOn: e.target.value })
            }
          >
            <option value="antiStigma">Anti-Stigmatism</option>
            <option value="eatingDisorder">Eating Disorder</option>
            <option value="youthMentalWellness">Youth Mental Wellness</option>
            <option value="ocd">Obsessive Compulsion Disorder (OCD)</option>
            <option value="overallMentalWellbeing">
              Overall Mental Wellbeing
            </option>
          </Select>
          <Select
            placeholder="Services:"
            bg="#FFFFFF"
            color="#2D3748"
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, services: e.target.value })
            }
          >
            <option value="counselling">Counselling</option>
            <option value="supportGroup">Support Group</option>
            <option value="trainingProvider">Training Provider</option>
            <option value="workshops">Workshops</option>
          </Select>
          <Select
            placeholder="IPC Registered:"
            bg="#FFFFFF"
            color="#2D3748"
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                IPCRegistered: e.target.value,
              })
            }
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
          <Select
            placeholder="Looking for:"
            bg="#FFFFFF"
            color="#2D3748"
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, lookingFor: e.target.value })
            }
          >
            <option value="fundingSupport">Funding Support</option>
            <option value="partnershipOpportunities">
              Partnership Opportunities
            </option>
          </Select>
        </Grid>
      </Box>
      <Flex
        direction={"column"}
        paddingLeft={128}
        paddingRight={128}
        paddingBottom={5}
        paddingTop={5}
      >
        <ViewToggle
          onChange={(option) => setViewOption(option)}
          viewOption={viewOption}
        />
        {viewOption === EViewOption.Card ? (
          <CardView organisationList={orgList} />
        ) : (
          <ListView organisationList={orgList} />
        )}
      </Flex>
      <Box minH="37.33vh">
        <Footer />
      </Box>
    </VStack>
  );
};

export default OrganisationList;
