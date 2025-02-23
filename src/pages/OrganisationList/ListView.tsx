import { useState } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Approved } from "../../assets/icons/statusApproved.svg";
import { ReactComponent as NotApproved } from "../../assets/icons/statusNotApproved.svg";
import { ReactComponent as Pending } from "../../assets/icons/statusPending.svg";
import { ReactComponent as Verified } from "../../assets/icons/statusVerified.svg";
import { ReactComponent as NotVerified } from "../../assets/icons/statusNotVerified.svg";
import { ReactComponent as Sort } from "../../assets/icons/sort.svg";
import { ReactComponent as SortUp } from "../../assets/icons/sortUp.svg";
import { ReactComponent as SortDown } from "../../assets/icons/sortDown.svg";
import { Organisation } from "../../data/Model/Organisation";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import "./style.scss";

const ipcUIMap = {
  [IPCStatus.Approved]: <Approved />,
  [IPCStatus.NotApproved]: <NotApproved />,
  [IPCStatus.Pending]: <Pending />,
};

const verifiedUIMap = {
  [VerificationStatus.Verified]: <Verified />,
  [VerificationStatus.NotVerified]: <NotVerified />,
  [VerificationStatus.Pending]: <Pending />,
};

const ListView: React.FC<{
  OrganisationList: Organisation[];
  sortOrganisation: (sortField: string, sortDirection: "asc" | "desc") => void;
}> = ({ OrganisationList, sortOrganisation }) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState<string>();
  const [currentSortField, setCurrentSortField] = useState<string>("");
  const [currentSortDirection, setCurrentSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  const handleSort = (field: string) => {
    const newSortDirection =
      currentSortField === field && currentSortDirection === "asc"
        ? "desc"
        : "asc";

    setCurrentSortField(field);
    setCurrentSortDirection(newSortDirection);
    sortOrganisation(field, newSortDirection);
  };

  return (
    <TableContainer maxW="full" whiteSpace="normal">
      <Table variant="orgListings">
        <Thead>
          <Tr>
            <Th
              w="18%"
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header">
                ORGANISATION
                {currentSortField === "name" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : (
                  <Sort />
                )}
              </div>
            </Th>
            <Th
              w="28%"
              onClick={() => handleSort("description")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header">
                DESCRIPTION
                {currentSortField === "description" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : (
                  <Sort />
                )}
              </div>
            </Th>
            {/* <Th w="11%">VERIFIED?</Th> */}
            <Th
              w="15%"
              onClick={() => handleSort("mainSpecialisation")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header">
                FOCUSES ON
                {currentSortField === "mainSpecialisation" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : (
                  <Sort />
                )}
              </div>
            </Th>
            <Th
              w="16%"
              onClick={() => handleSort("mainSupportArea")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header">
                LOOKING FOR
                {currentSortField === "mainSupportArea" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : (
                  <Sort />
                )}
              </div>
            </Th>
            {/* <Th w="12%">IPC STATUS</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {OrganisationList.map((organisation, index) => {
            return (
              <Tr
                onClick={() =>
                  window.open(`/organisations/${organisation.id}`, "_blank")
                }
                style={{ cursor: "pointer" }}
                key={index}
              >
                <Td fontWeight="700" fontSize="16px">
                  {organisation.name}
                </Td>
                <Td>{organisation.description}</Td>
                {/* <Td>{verifiedUIMap[organisation.verified]}</Td> */}
                <Td>{organisation.mainSpecialisation}</Td>
                <Td>{organisation.mainSupportArea}</Td>
                {/* <Td>{ipcUIMap[organisation.ipcApproved]}</Td> */}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
