import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import CardView from "./CardView";
import ListView from "./ListView";
import ViewToggle from "./ViewToggle";
import {  Organisation } from "../../data/Model/Organisation";
import "../style.scss";
import { MultiSelect } from "react-multi-select-component";
import { getOrganisations, OrganisationFilters } from "../../services/OrganisationService";
import {
  ipcOptions,
  serviceOptions,
  specialisationsOptions,
  supportAreaOptions,
} from "./const";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { colors } from "../../theme/colours";
import CardViewLoadingScreen from "./CardViewloadingScreen";
import ListViewLoadingScreen from "./ListViewloadingScreen";
import Homepage_Breadcrumbs from "../../components/Breadcrumbs/HomePage_BreadCrumbs";
import { VStack } from "@chakra-ui/react";

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
  const [currentSortField, setCurrentSortField] = useState<string | undefined>(undefined);
  const [currentSortDirection, setCurrentSortDirection] = useState<"asc" | "desc">("asc");

  // states of the 4 filters
  const [specialisations, setSpecialisations] = useState<Option[]>([]);
  const [services, setServices] = useState<Option[]>([]);
  const [ipcStatus, setIpcStatus] = useState<Option[]>([]);
  const [supportAreas, setSupportAreas] = useState<Option[]>([]);
  const [filters, setFilters] = useState<OrganisationFilters>({
    specialisations: undefined,
    services: undefined,
    ipcStatus: undefined,
    supportAreas: undefined,
  });

  const limit = 12;

  useEffect(() => {
    setIsLoading(true);
    // fetch organisation data on page load
    getOrganisations(filters, "", limit, undefined)
      .then((res) => {
        setOrgList(res.organisations);
        setLastVisible(res.lastVisible);
        setTotalCount(res.totalCount);
        console.log(res)
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
    getOrganisations(filters, "", limit, lastVisible, currentSortField, currentSortField ? currentSortDirection : undefined)
      .then((res) => {
        setOrgList((prevState) => [...prevState, ...res.organisations]);
        setLastVisible(res.lastVisible);
        setTotalCount(res.totalCount);
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
    setCurrentSortField(sortField);
    setCurrentSortDirection(sortDirection);
    getOrganisations(
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
    <Box display="flex" flexDirection="column" alignItems="stretch" sx={{backgroundColor:"grey.100"}}>
      <Homepage_Breadcrumbs/>

      {/* Description */}
      <Box width="100%" paddingBottom="25px">
        <Container className="page-width" sx={{ display: 'flex', alignItems: 'center'}}>
          <Box component="img" src={require("../../assets/images/org-listing-image.png")} sx={{ maxWidth: '50%' }} />
          <VStack alignItems="start" sx={{ minWidth: '45%', marginLeft: '24px' }} gap={2} height={"full"}>
            <Typography variant="h4" sx={{ fontSize: { xs: "24px", sm: "40px" } }}>Mendisphere Community</Typography>
          
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Looking to fund or partner with a mental health organisation?
              Browse below for the full list of registered organisations under
              Mendisphere. There's always someone in need of your support.
            </Typography>
          </VStack>
        </Container>
      </Box>

      {/* Filters drop down */}
      <Box bgcolor="white" paddingY="32px">
        <Container className="page-width ">
          <Typography fontWeight={500} variant="h6" marginBottom={1.5}>Find an organisation you want to support</Typography>
          <Typography variant="body2" color="#707070" paddingBottom={1}>
            Filter by
          </Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            <Box flexBasis="calc(25% - 10px)" marginBottom="20px" maxWidth="25%">
              <Typography marginBottom={2}>Specialisation</Typography>
              <MultiSelect
                options={specialisationsOptions}
                value={specialisations}
                onChange={setSpecialisations}
                labelledBy="Specialisations"
              />
            </Box>
            <Box flexBasis="calc(25% - 10px)" marginBottom="20px" maxWidth="25%">
              <Typography marginBottom={2}>Services</Typography>
              <MultiSelect
                options={serviceOptions}
                value={services}
                onChange={setServices}
                labelledBy="Services"
              />
            </Box>
            <Box flexBasis="calc(25% - 10px)" marginBottom="20px" maxWidth="25%">
              <Typography marginBottom={2}>IPC Registered</Typography>
              <MultiSelect
                options={ipcOptions}
                value={ipcStatus}
                onChange={setIpcStatus}
                labelledBy="IPC Registered"
              />
            </Box>
            <Box flexBasis="calc(25% - 10px)" marginBottom="20px" maxWidth="25%">
              <Typography marginBottom={2}>Looking for</Typography>
              <MultiSelect
                options={supportAreaOptions}
                value={supportAreas}
                onChange={setSupportAreas}
                labelledBy="Looking for"
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Cards listing view */}
      <Box paddingBottom={5} paddingTop={5} bgcolor={"white"}>
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
                <Container className="page-width" sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 5, padding: "0 !important" }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    paddingBottom="60px"
                    width="100%"
                  >
                    {viewOption === EViewOption.Card ? (
                      <CardView OrganisationList={orgList} />
                    ) : (
                      <ListView
                        OrganisationList={orgList}
                        sortOrganisation={sortOrganisation}
                      />
                    )}

                    <Typography marginTop="60px" marginBottom="20px">
                      Displaying {orgList.length} out of{" "}
                      {totalCount} results
                    </Typography>
                    {orgList.length === totalCount ? (
                      <Typography>
                        — You have reached the end of the page. More
                        organisations to come soon! —
                      </Typography>
                    ) : (
                      <Button
                        onClick={loadMore}
                        disabled={
                          isLoadMoreLoading ||
                          lastVisible === null ||
                          orgList.length === totalCount
                        }
                        sx={{
                          height: "48px",
                          width: "250px",
                          border: "1px solid",
                          borderRadius: "4px",
                          padding: "16px 0",
                          borderColor: colors.brand.secondary,
                          color: colors.neutral.primary,
                          backgroundColor: colors.neutral.white,
                        }}
                      >
                        {isLoadMoreLoading ? (
                          <>
                            <CircularProgress
                              thickness={3}
                              size={24}
                              sx={{ marginRight: "10px" }}
                            />
                            Loading...
                          </>
                        ) : (
                          "Load More"
                        )}
                      </Button>
                    )}
                  </Box>
                </Container>
              </>
            ) : (
              <Typography align="center">No organisations found!</Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default OrganisationList;
