import { Box, VStack, Text, Select, Grid, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Footer from "../common/footer";
import SimpleNavigationBar from "../common/simple-header/simple-navbar";
import HeaderBreadCrumbs from "../common/breadcrumbs/header-breadcrumbs";
import CardView from "./Components/CardView";
import ListView from "./Components/ListView";
import { ReactComponent as ViewCardActive } from '../../assets/icons/viewCardActive.svg'
import { ReactComponent as ViewCardInactive } from '../../assets/icons/viewCardInactive.svg'
import { ReactComponent as ViewListActive } from '../../assets/icons/viewListActive.svg'
import { ReactComponent as ViewListInactive } from '../../assets/icons/viewListInactive.svg'

interface IFilterOptions {
  focusesOn?: string;
  services?: string;
  IPCRegistered?: string;
  lookingFor?: string;
}
export interface IOrganization extends IFilterOptions {
  renderText: string;
  verified?: string; // unique to <ListView/>
  image?: JSX.Element; // unique to <CardView />
}

// TODO remove mock when the actual data is ready to be used
const mockOrganizations: IOrganization[] = [
  {
    focusesOn: 'antiStigma',
    services: 'counselling',
    IPCRegistered: 'yes',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'antiStigma',\nservices: 'counselling',\nIPCRegistered: 'yes',\nlookingFor: 'fundingSupport',`,
    verified: 'yes',
  },
  {
    focusesOn: 'eatingDisorder',
    services: 'supportGroup',
    IPCRegistered: 'no',
    lookingFor: 'partnershipOpportunities',
    renderText: `focusesOn: 'eatingDisorder',\nservices: 'supportGroup',\nIPCRegistered: 'no',\n\nlookingFor: 'partnershipOpportunities',`,
    verified: 'pending',
  },
  {
    focusesOn: 'youthMentalWellness',
    services: 'trainingProvider',
    IPCRegistered: 'yes',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'youthMentalWellness',\nservices: 'trainingProvider',\nIPCRegistered: 'yes',\nlookingFor: 'fundingSupport',`,
    verified: 'no',
  },
  {
    focusesOn: 'ocd',
    services: 'workshops',
    IPCRegistered: 'no',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'ocd',\nservices: 'workshops',\nIPCRegistered: 'no',\nlookingFor: 'fundingSupport',`,
    verified: 'pending',
  },
  {
    focusesOn: 'overallMentalWellbeing',
    services: 'counselling',
    IPCRegistered: 'yes',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'overallMentalWellbeing',\nservices: 'counselling',\nIPCRegistered: 'yes',\nlookingFor: 'fundingSupport',`,
    verified: 'no',
  },
  {
    focusesOn: 'antiStigma',
    services: 'counselling',
    IPCRegistered: 'no',
    lookingFor: 'partnershipOpportunities',
    renderText: `focusesOn: 'antiStigma',\nservices: 'counselling',\nIPCRegistered: 'no',\nlookingFor: 'partnershipOpportunities',`,
    verified: 'yes',
  },
  {
    focusesOn: 'eatingDisorder',
    services: 'counselling',
    IPCRegistered: 'yes',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'eatingDisorder',\nservices: 'counselling',\nIPCRegistered: 'yes',\nlookingFor: 'fundingSupport',`,
    verified: 'no',
  },
  {
    focusesOn: 'antiStigma',
    services: 'counselling',
    IPCRegistered: 'no',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'antiStigma',\nservices: 'counselling',\nIPCRegistered: 'no',\nlookingFor: 'fundingSupport',`,
    verified: 'pending',
  },
]

const OrganisationList: React.FC = () => {
  //TODO: Need to add another lifecycle method to prevent double requests in react
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({});
  const [viewOption, setViewOption] = useState<"card" | "list">("card");
  // TODO: integrate filter with organization card

  // TODO: replace mockCards with actual list of organization cards from database
  let validOrganizations: IOrganization[] = mockOrganizations;
  Object.entries(filterOptions).forEach(([key, value]) => {
    if (Boolean(value)) {
      validOrganizations = validOrganizations.filter((org) => {
        return (org as any)[key] === value
      })
    }
  })

  return (
    <VStack spacing={0} align="stretch">
      <Box minH="11.11vh">
        <SimpleNavigationBar />
      </Box>
      <HeaderBreadCrumbs />
      <Box height={182} bg="#E0E5FF" paddingLeft={128} paddingRight={128}>
        <Text paddingTop={37} paddingBottom={5}>How can we help you today?</Text>
        <Text fontSize='xs' color={"#707070"} paddingBottom={1}>Filter by</Text>
        <Grid templateColumns='repeat(4, 1fr)' gap={5}>
          <Select placeholder='Focuses on:' bg='#FFFFFF' color='#2D3748' onChange={(e) => setFilterOptions({...filterOptions, focusesOn: e.target.value})}>
            <option value='antiStigma'>Anti-Stigmatism</option>
            <option value='eatingDisorder'>Eating Disorder</option>
            <option value='youthMentalWellness'>Youth Mental Wellness</option>
            <option value='ocd'>Obsessive Compulsion Disorder (OCD)</option>
            <option value='overallMentalWellbeing'>Overall Mental Wellbeing</option>
          </Select>
          <Select placeholder='Services:' bg='#FFFFFF' color='#2D3748' onChange={(e) => setFilterOptions({...filterOptions, services: e.target.value})}>
            <option value='counselling'>Counselling</option>
            <option value='supportGroup'>Support Group</option>
            <option value='trainingProvider'>Training Provider</option>
            <option value='workshops'>Workshops</option>
          </Select>
          <Select placeholder='IPC Registered:' bg='#FFFFFF' color='#2D3748' onChange={(e) => setFilterOptions({...filterOptions, IPCRegistered: e.target.value})}>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </Select>
          <Select placeholder='Looking for:' bg='#FFFFFF' color='#2D3748' onChange={(e) => setFilterOptions({...filterOptions, lookingFor: e.target.value})}>
            <option value='fundingSupport'>Funding Support</option>
            <option value='partnershipOpportunities'>Partnership Opportunities</option>
          </Select>
        </Grid>
      </Box>
      <Flex direction={'column'} paddingLeft={128} paddingRight={128} paddingBottom={5} paddingTop={5}>
        <div style={{alignSelf: 'end', display: 'flex', flexDirection: 'row'}}>
          <div onClick={() => setViewOption("card")} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginRight: 5}}>
            {viewOption === "card" ? <ViewCardActive/> : <ViewCardInactive/>}
            <Text
              marginLeft={2}
              style={viewOption === "card" ? {
                color: "#3959FF",
                fontWeight: 'bold',
              }
              : {
                color: "#CBCBCB",
              }}
            >
              Card View
            </Text>
          </div>
          <div style={{textAlign: 'start'}}>|</div>
          <div onClick={() => setViewOption("list")} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: 5}}>
          {viewOption === "list" ? <ViewListActive/> : <ViewListInactive/>}
            <Text
              marginLeft={2}
              style={viewOption === "list" ? {
                color: "#3959FF",
                fontWeight: 'bold',
              }
              : {
                color: "#CBCBCB",
              }}
            >
              List View
            </Text>
          </div>
        </div>
        {viewOption === "card"
          ? <CardView organizationList={validOrganizations}/>
          : <ListView organizationList={validOrganizations}/>
        }
      </Flex>
      <Box minH="37.33vh">
        <Footer />
      </Box>
    </VStack>
  );
}

export default OrganisationList;
