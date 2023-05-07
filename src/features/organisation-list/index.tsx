import {
  Box,
  VStack,
  Text,
  Flex,
  Image,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Footer from "../common/footer";
import SimpleNavigationBar from "../common/simple-navbar";
import CardView from "./components/CardView";
import ListView from "./components/ListView";
import ViewToggle from "./components/ViewToggle";
import {
  getOrganisationsForListingsPage,
  Organisation,
  OrganisationListingQueryFilters,
} from "../../data/model/organisation";
import { Spinner } from "@chakra-ui/react";
import OrgBreadCrumb from "../common/orgBreadCrumb";
import "../page-style.scss";
import { MultiSelect } from "react-multi-select-component";
import {
  ipcOptions,
  serviceOptions,
  specialisationsOptions,
  supportAreaOptions,
} from "./const";

export enum EViewOption {
  Card = "card",
  List = "list",
}

interface Option {
  value: any;
  label: string;
  key?: string;
  disabled?: boolean;
}

const updateFilters = (arr: any[]) => {
  return arr.length > 0 ? arr.map((obj) => obj.value) : undefined;
};

const OrganisationList: React.FC = () => {
  // store organisation card data
  const [orgList, setOrgList] = useState<Organisation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewOption, setViewOption] = useState<EViewOption>(EViewOption.Card);
  // states of the 4 filters
  const [specialisations, setSpecialisations] = useState<Option[]>([]);
  const [services, setServices] = useState<Option[]>([]);
  const [ipcStatus, setIpcStatus] = useState<Option[]>([]);
  const [supportAreas, setSupportAreas] = useState<Option[]>([]);
  const [filters, setFilters] = useState<OrganisationListingQueryFilters>({
    specialisations: undefined,
    services: undefined,
    ipcStatus: undefined,
    supportAreas: undefined,
  });
  const [orgListingComponentHeight, setOrgListingComponentHeight] =
    useState(500);

  useEffect(() => {
    // fetch organisation data on page load
    getOrganisationsForListingsPage(filters)
      .then((orgs) => {
        // console.log('orgs', orgs)
        setOrgList(orgs);
      })
      .then(() => {
        const height = orgList.length > 12 ? 1800 : (orgList.length % 4) * 600;
        setOrgListingComponentHeight(height < 600 ? 600 : height);
        console.log(orgListingComponentHeight);
      })
      .then(() => setIsLoading(false))
      .catch((err) => {
        alert(`Organisation data fetch error!`);
        console.log(err.message);
      });
  }, [filters]);

  useEffect(() => {
    setFilters({
      specialisations: updateFilters(specialisations),
      services: updateFilters(services),
      ipcStatus: updateFilters(ipcStatus),
      supportAreas: updateFilters(supportAreas),
    });
  }, [specialisations, services, ipcStatus, supportAreas]);

  return (
    <VStack
      className="page-width page-padding"
      justify="center"
      spacing={0}
      align="stretch"
    >
      <SimpleNavigationBar />
      <OrgBreadCrumb />

      {/* Description */}
      <Flex h="40vh" w="full">
        <HStack margin="auto" className="page-width" w="70%" h="full">
          <Image
            maxW="50%"
            src={require("../../assets/images/org-listing-image.png")}
          />
          <Spacer />
          <VStack minW="45%" align="left" h="full">
            <Spacer />
            <Heading>Mendisphere</Heading>
            <Heading>Community</Heading>
            <Text>
              <br />
              Looking to fund or partner with a mental health organisation?
              Browse below for the full list of registered organisations under
              Mendisphere. There's always someone in need of your support.
            </Text>
            <Spacer />
          </VStack>
        </HStack>
      </Flex>

      {/* Filters drop down */}
      <Box className="maximise-width" height="15vh" bg="#E0E5FF">
        <VStack h="full" className="page-width page-padding" align="left">
          <Spacer />
          <Text fontSize="xl">How can we help you today?</Text>
          <Text fontSize="xs" color={"#707070"} paddingBottom={1}>
            Filter by
          </Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                flexBasis: "calc(25% - 10px)",
                marginBottom: "20px",
                maxWidth: "25%",
              }}
            >
              Specialisation
              <MultiSelect
                options={specialisationsOptions}
                value={specialisations}
                onChange={setSpecialisations}
                labelledBy="Specialisations"
              />
            </div>
            <div
              style={{
                flexBasis: "calc(25% - 10px)",
                marginBottom: "20px",
                maxWidth: "25%",
              }}
            >
              Services
              <MultiSelect
                options={serviceOptions}
                value={services}
                onChange={setServices}
                labelledBy="Services"
              />
            </div>
            <div
              style={{
                flexBasis: "calc(25% - 10px)",
                marginBottom: "20px",
                maxWidth: "25%",
              }}
            >
              IPC Registered
              <MultiSelect
                options={ipcOptions}
                value={ipcStatus}
                onChange={setIpcStatus}
                labelledBy="IPC Registered"
              />
            </div>
            <div
              style={{
                flexBasis: "calc(25% - 10px)",
                marginBottom: "20px",
                maxWidth: "25%",
              }}
            >
              Looking for
              <MultiSelect
                options={supportAreaOptions}
                value={supportAreas}
                onChange={setSupportAreas}
                labelledBy="Looking for"
              />
            </div>
          </div>
          <Spacer />
        </VStack>
      </Box>

      {/* Cards listing view */}
      <VStack
        h={`${orgListingComponentHeight}px`}
        paddingBottom={5}
        paddingTop={5}
      >
        <ViewToggle
          onChange={(option) => setViewOption(option)}
          viewOption={viewOption}
        />
        <Flex w="full" direction={"column"}>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : viewOption === EViewOption.Card ? (
            <CardView organisationList={orgList} />
          ) : (
            <ListView organisationList={orgList} />
          )}
        </Flex>
      </VStack>

      {/* Footer */}
      <Box className="maximise-width" minH="37.33vh">
        <Footer />
      </Box>
    </VStack>
  );
};

export default OrganisationList;
