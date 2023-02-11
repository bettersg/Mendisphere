import { Box, VStack, Text, Select, Grid, GridItem, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Footer from "../common/footer";
import SimpleNavigationBar from "../common/simple-header/simple-navbar";
import HeaderBreadCrumbs from "../common/breadcrumbs/header-breadcrumbs";

interface IFilterOptions {
  focusesOn?: string;
  services?: string;
  IPCRegistered?: string;
  lookingFor?: string;
}

interface ICard extends IFilterOptions {
  renderText: string;
}

// TODO remove mock when the actual data is ready to be used
const mockCards: ICard[] = [
  {
    focusesOn: 'antiStigma',
    services: 'counselling',
    IPCRegistered: 'yes',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'antiStigma',\nservices: 'counselling',\nIPCRegistered: 'yes',\nlookingFor: 'fundingSupport',`
  },
  {
    focusesOn: 'eatingDisorder',
    services: 'supportGroup',
    IPCRegistered: 'no',
    lookingFor: 'partnershipOpportunities',
    renderText: `focusesOn: 'eatingDisorder',\nservices: 'supportGroup',\nIPCRegistered: 'no',\n\nlookingFor: 'partnershipOpportunities',`
  },
  {
    focusesOn: 'youthMentalWellness',
    services: 'trainingProvider',
    IPCRegistered: 'yes',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'youthMentalWellness',\nservices: 'trainingProvider',\nIPCRegistered: 'yes',\nlookingFor: 'fundingSupport',`
  },
  {
    focusesOn: 'ocd',
    services: 'workshops',
    IPCRegistered: 'no',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'ocd',\nservices: 'workshops',\nIPCRegistered: 'no',\nlookingFor: 'fundingSupport',`
  },
  {
    focusesOn: 'overallMentalWellbeing',
    services: 'counselling',
    IPCRegistered: 'yes',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'overallMentalWellbeing',\nservices: 'counselling',\nIPCRegistered: 'yes',\nlookingFor: 'fundingSupport',`
  },
  {
    focusesOn: 'antiStigma',
    services: 'counselling',
    IPCRegistered: 'no',
    lookingFor: 'partnershipOpportunities',
    renderText: `focusesOn: 'antiStigma',\nservices: 'counselling',\nIPCRegistered: 'no',\nlookingFor: 'partnershipOpportunities',`
  },
  {
    focusesOn: 'eatingDisorder',
    services: 'counselling',
    IPCRegistered: 'yes',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'eatingDisorder',\nservices: 'counselling',\nIPCRegistered: 'yes',\nlookingFor: 'fundingSupport',`
  },
  {
    focusesOn: 'antiStigma',
    services: 'counselling',
    IPCRegistered: 'no',
    lookingFor: 'fundingSupport',
    renderText: `focusesOn: 'antiStigma',\nservices: 'counselling',\nIPCRegistered: 'no',\nlookingFor: 'fundingSupport',`
  },
]

const OrganisationList: React.FC = () => {
  //TODO: Need to add another lifecycle method to prevent double requests in react
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({});
  // TODO: integrate filter with organization card

  // TODO: replace mockCards with actual list of organization cards from database
  let validOrganizationCards: ICard[] = mockCards;
  let renderedRow: JSX.Element[] = [<></>];
  
  Object.entries(filterOptions).forEach(([key, value]) => {
    if (Boolean(value)) {
      validOrganizationCards = validOrganizationCards.filter((card) => {
        return (card as any)[key] === value
      })
    }
  })

  for (let i = 0; i < validOrganizationCards.length; i += 4) {
    let cardsToRender = validOrganizationCards.slice(i, i+4);
    renderedRow.push(
      <Grid templateColumns='repeat(4, 1fr)' gap={5} marginTop={5} key={i}>
        {cardsToRender.map((card) =>
          <GridItem borderRadius={5} bg={'tomato'} key={card.renderText}>
            {card.renderText}
          </GridItem>)}
      </Grid>
    )
  }

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
      <Flex direction={'column'} paddingLeft={128} paddingRight={128} paddingBottom={5}>
        {renderedRow}
      </Flex>
      <Box minH="37.33vh">
        <Footer />
      </Box>
    </VStack>
  );
}

export default OrganisationList;
