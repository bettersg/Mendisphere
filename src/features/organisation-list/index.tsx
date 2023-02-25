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
import { MentalHealthIssue } from "../../data/enums/mental-health-issue.enum";
import { Service } from "../../data/enums/service.enum";
import { SupportArea } from "../../data/enums/support-area.enum";
import { IPCStatus, IPCStatusViewMap } from "../../data/enums/ipc-status.enum";

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
  const [filter, setFilterOptions] = useState<OrganisationListingQueryFilters>(
    {}
  );
  const [viewOption, setViewOption] = useState<EViewOption>(EViewOption.Card);

  const filterData = () => {
    // fetch organisation data on page load
    getOrganisationsForListingsPage(filter)
      .then((orgs) => {
        console.log(orgs);
        setOrgList(orgs);
      })
      .then(() => setIsLoading(false))
      .catch((err) => {
        alert(`Organisation data fetch error!`);
        console.log(err.message);
      });
  };

  return (
    <VStack spacing={0} align="stretch">
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
            onChange={(e) => {
              // setFilterOptions({
              //   ...filter,
              //   specialisations: [e.target.value as MentalHealthIssue],
              // });
              filter.specialisations = [e.target.value as MentalHealthIssue];
              filterData();
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
            placeholder="Services:"
            bg="#FFFFFF"
            color="#2D3748"
            onChange={(e) => {
              // setFilterOptions({
              //   ...filter,
              //   services: [e.target.value as Service],
              // });
              filter.services = [e.target.value as Service];
              filterData();
            }}
          >
            <option value={Service.Youth}>{Service.Youth}</option>
            <option value={Service.Workshops}>{Service.Workshops}</option>
            <option value={Service.OCD}>{Service.OCD}</option>
            <option value={Service.SupportGroup}>{Service.SupportGroup}</option>
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
            placeholder="IPC Registered:"
            bg="#FFFFFF"
            color="#2D3748"
            onChange={(e) => {
              // setFilterOptions({
              //   ...filter,
              //   ipcStatus: e.target.value as unknown as number as IPCStatus,
              // });

              filter.ipcStatus = Number(e.target.value) as IPCStatus;
              filterData();
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
            placeholder="Looking for:"
            bg="#FFFFFF"
            color="#2D3748"
            onChange={(e) => {
              // setFilterOptions({
              //   ...filter,
              //   supportAreas: [e.target.value as SupportArea],
              // });
              filter.supportAreas = [e.target.value as SupportArea];
              filterData();
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
