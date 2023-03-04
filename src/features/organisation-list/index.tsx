import {
  Box,
  VStack,
  Text,
  Select,
  Grid,
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
import { MentalHealthIssue } from "../../data/enums/mental-health-issue.enum";
import { Service } from "../../data/enums/service.enum";
import { SupportArea } from "../../data/enums/support-area.enum";
import { IPCStatus, IPCStatusViewMap } from "../../data/enums/ipc-status.enum";
import { Spinner } from "@chakra-ui/react";
import OrgBreadCrumb from "../common/orgBreadCrumb";
import "../page-style.scss";

export enum EViewOption {
  Card = "card",
  List = "list",
}

const OrganisationList: React.FC = () => {
  // store organisation card data
  const [orgList, setOrgList] = useState<Organisation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewOption, setViewOption] = useState<EViewOption>(EViewOption.Card);
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

  return (
    <VStack className="page-width" justify="center" spacing={0} align="stretch">
      <SimpleNavigationBar />
      <OrgBreadCrumb />
      <Flex h="40vh">
        <HStack margin="auto" maxW="50vw" h="full">
          <Image
            w="50%"
            src={require("../../assets/images/org-listing-image.png")}
          />
          <Spacer />
          <VStack w="45%" align="left" h="full">
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
      <Box className="maximise-width" height="15vh" bg="#E0E5FF">
        <VStack h="full" className="page-width page-padding" align="left">
          <Spacer />
          <Text fontSize="xl">How can we help you today?</Text>
          <Text fontSize="xs" color={"#707070"} paddingBottom={1}>
            Filter by
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={5}>
            <Select
              placeholder="Specialisations"
              bg="#FFFFFF"
              color="#2D3748"
              onChange={(e) => {
                setFilters((previous) => ({
                  ...previous,
                  specialisations:
                    e.target.value === ""
                      ? undefined
                      : [e.target.value as MentalHealthIssue],
                }));
              }}
            >
              <option value={MentalHealthIssue.AntiStigmatism}>
                {MentalHealthIssue.AntiStigmatism}
              </option>
              <option value={MentalHealthIssue.YouthMentalWellness}>
                {MentalHealthIssue.YouthMentalWellness}
              </option>
              <option value={MentalHealthIssue.OCD}>
                {MentalHealthIssue.OCD}
              </option>
              <option value={MentalHealthIssue.OverallMentalWellbeing}>
                {MentalHealthIssue.AntiStigmatism}
              </option>
            </Select>
            <Select
              placeholder="Services"
              bg="#FFFFFF"
              color="#2D3748"
              onChange={(e) => {
                setFilters((previous) => ({
                  ...previous,
                  services:
                    e.target.value === ""
                      ? undefined
                      : [e.target.value as Service],
                }));
              }}
            >
              <option value={Service.Youth}>{Service.Youth}</option>
              <option value={Service.Workshops}>{Service.Workshops}</option>
              <option value={Service.OCD}>{Service.OCD}</option>
              <option value={Service.SupportGroup}>
                {Service.SupportGroup}
              </option>
              <option value={Service.OverallMentalWellbeing}>
                {Service.OverallMentalWellbeing}
              </option>
              <option value={Service.TrainingProvider}>
                {Service.TrainingProvider}
              </option>
              <option value={Service.Counselling}>{Service.Counselling}</option>
              <option value={Service.SpeakingEngagements}>
                {Service.SpeakingEngagements}
              </option>
              <option value={Service.CorporateTraining}>
                {Service.CorporateTraining}
              </option>
            </Select>
            <Select
              placeholder="IPC Registered"
              bg="#FFFFFF"
              color="#2D3748"
              onChange={(e) => {
                setFilters((previous) => ({
                  ...previous,
                  ipcStatus:
                    e.target.value === ""
                      ? undefined
                      : (Number(e.target.value) as IPCStatus),
                }));
              }}
            >
              <option value={IPCStatus.Approved}>
                {IPCStatusViewMap.get(IPCStatus.Approved)}
              </option>
              <option value={IPCStatus.NotApproved}>
                {IPCStatusViewMap.get(IPCStatus.NotApproved)}
              </option>
              <option value={IPCStatus.Pending}>
                {IPCStatusViewMap.get(IPCStatus.Pending)}
              </option>
            </Select>
            <Select
              placeholder="Looking for"
              bg="#FFFFFF"
              color="#2D3748"
              onChange={(e) => {
                setFilters((previous) => ({
                  ...previous,
                  supportAreas:
                    e.target.value === ""
                      ? undefined
                      : [e.target.value as SupportArea],
                }));
              }}
            >
              <option value={SupportArea.FundingSupport}>
                {SupportArea.FundingSupport}
              </option>
              <option value={SupportArea.PartnershipOpportunities}>
                {SupportArea.PartnershipOpportunities}
              </option>
            </Select>
          </Grid>
          <Spacer />
        </VStack>
      </Box>
      <VStack
        className="page-padding"
        h={`${orgListingComponentHeight}px`}
        paddingBottom={5}
        paddingTop={5}
      >
        <ViewToggle
          onChange={(option) => setViewOption(option)}
          viewOption={viewOption}
        />
        <Flex direction={"column"}>
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
      <Box minH="37.33vh">
        <Footer />
      </Box>
    </VStack>
  );
};

export default OrganisationList;
