import {
  Box,
  VStack,
  Text,
  Flex,
  Image,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardView from "./cardView";
import ListView from "./listView";
import ViewToggle from "./viewToggle";
import {
  getOrganisationsForListingsPage,
  Organisation,
  OrganisationListingQueryFilters,
} from "../../data/model/organisation";
import Breadcrumbs from "../../components/breadcrumbs";
import "../style.scss";
import { MultiSelect } from "react-multi-select-component";
import {
  ipcOptions,
  serviceOptions,
  specialisationsOptions,
  supportAreaOptions,
} from "./const";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { colors } from "../../theme/colours";
import CardViewLoadingScreen from "./cardViewloadingScreen";
import ListViewLoadingScreen from "./listViewloadingScreen";

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

  const [totalCount, setTotalCount] = useState<number>(0);
  const [lastVisible, setLastVisible] =
    useState<DocumentSnapshot<DocumentData> | null>(null);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
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

  const limit = 8;

  useEffect(() => {
    setIsLoading(true);
    // fetch organisation data on page load
    getOrganisationsForListingsPage(filters, "", limit, undefined)
      .then((res) => {
        setOrgList(res.organisations);
        setLastVisible(res.lastVisible);
        setTotalCount(res.totalCount);
      })
      .finally(() => setIsLoading(false))
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

  const loadMore = () => {
    if (isLoadMoreLoading || lastVisible === null) return;

    setIsLoadMoreLoading(true);
    getOrganisationsForListingsPage(filters, "", limit, lastVisible)
      .then((res) => {
        setOrgList((prevState) => [...prevState, ...res.organisations]);
        setLastVisible(res.lastVisible);
      })
      .finally(() => setIsLoadMoreLoading(false))
      .catch((err) => {
        alert(`Organisation data fetch error!`);
        console.log(err.message);
        setIsLoadMoreLoading(false);
      });
  };

  const sortOrganisation = (
    sortField: string,
    sortDirection: "asc" | "desc"
  ) => {
    getOrganisationsForListingsPage(
      filters,
      "",
      limit,
      undefined,
      sortField,
      sortDirection
    )
      .then((res) => {
        setOrgList(res.organisations);
        setLastVisible(res.lastVisible);
        setTotalCount(res.totalCount);
      })
      .finally(() => setIsLoading(false))
      .catch((err) => {
        alert(`Organisation data fetch error!`);
        console.log(err.message);
      });
  };

  return (
    <VStack justify="center" spacing={0} align="stretch">
      <Breadcrumbs />

      {/* Description */}
      <Flex w="full" paddingBottom="25px">
        <HStack margin="auto" className="page-width" w="50%" h="full">
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
      <Box bg="#E0E5FF" paddingBottom="20px" paddingTop="20px">
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
              <Text marginBottom={2}>Specialisation</Text>
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
              <Text marginBottom={2}>Services</Text>
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
              <Text marginBottom={2}>IPC Registered</Text>
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
              <Text marginBottom={2}>Looking for</Text>
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
      <VStack paddingBottom={5} paddingTop={5}>
        {isLoading ? (
          viewOption === EViewOption.Card ? (
            <CardViewLoadingScreen />
          ) : (
            <ListViewLoadingScreen />
          )
        ) : (
          <>
            {orgList.length > 0 && totalCount > 0 ? (
              <>
                <ViewToggle
                  length={orgList.length}
                  totalCount={totalCount}
                  onChange={(option) => setViewOption(option)}
                  viewOption={viewOption}
                />
                <Box
                  className="page-width page-padding"
                  display="flex"
                  justifyContent="flex-end"
                  marginBottom={5}
                >
                  <Flex
                    w="full"
                    direction={"column"}
                    alignItems="center"
                    paddingBottom="60px"
                  >
                    {viewOption === EViewOption.Card ? (
                      <CardView organisationList={orgList} />
                    ) : (
                      <ListView
                        organisationList={orgList}
                        sortOrganisation={sortOrganisation}
                      />
                    )}

                    <Text marginTop="60px" marginBottom="20px">
                      Displaying <strong>{orgList.length}</strong> out of{" "}
                      <strong>{totalCount}</strong> results
                    </Text>
                    {orgList.length === totalCount ? (
                      <Text>
                        — You have reached the end of the page. More
                        organisations to come soon! —
                      </Text>
                    ) : (
                      <Button
                        onClick={loadMore}
                        disabled={
                          isLoadMoreLoading ||
                          lastVisible === null ||
                          orgList.length === totalCount
                        }
                        height="48px"
                        width="250px"
                        border="1px"
                        borderRadius="4px"
                        padding="16px 0"
                        borderColor={colors.brand.secondary}
                        color={colors.neutral.primary}
                        backgroundColor={colors.neutral.white}
                      >
                        {isLoadMoreLoading ? (
                          <>
                            <Spinner
                              thickness="3px"
                              speed="0.65s"
                              emptyColor="gray.200"
                              color="blue.500"
                              size="md"
                              marginRight="10px"
                            />
                            Loading...
                          </>
                        ) : (
                          "Load More"
                        )}
                      </Button>
                    )}
                  </Flex>
                </Box>
              </>
            ) : (
              "No organisations found!"
            )}
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default OrganisationList;
