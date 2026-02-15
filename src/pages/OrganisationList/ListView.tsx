import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {ReactComponent as NotVerified} from "../../assets/icons/statusNotVerified.svg"
import {ReactComponent as Verified} from "../../assets/icons/statusVerified.svg"
import { ReactComponent as Approved } from "../../assets/icons/statusApproved.svg";
import { ReactComponent as NotApproved } from "../../assets/icons/statusNotApproved.svg";
import { ReactComponent as Pending } from "../../assets/icons/statusPending.svg";
import { ReactComponent as Sort } from "../../assets/icons/sort.svg";
import { ReactComponent as SortUp } from "../../assets/icons/sortUp.svg";
import { ReactComponent as SortDown } from "../../assets/icons/sortDown.svg";
import { Organisation } from "../../data/Model/Organisation";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import "./style.scss";
import { muiTheme } from "../../theme/muiTheme";

const ipcUIMap = {
  [IPCStatus.Approved]: <Approved />,
  [IPCStatus.NotApproved]: <NotApproved />,
  [IPCStatus.Pending]: <Pending />,
};

const verifiedUIMap = {
  [VerificationStatus.Verified]: <Verified/>,
  [VerificationStatus.NotVerified]: <NotVerified/>,
  [VerificationStatus.Pending]: <Pending />,
};

const ListView: React.FC<{
  OrganisationList: Organisation[];
  sortOrganisation: (sortField: string, sortDirection: "asc" | "desc") => void;
}> = ({ OrganisationList, sortOrganisation }) => {
  const navigate = useNavigate();
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
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        border: "none",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header" style={{ fontWeight: 400, letterSpacing: '0.2em' }}>
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
            </TableCell>
            <TableCell
              onClick={() => handleSort("description")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header" style={{ fontWeight: 400, letterSpacing: '0.2em' }}>
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
            </TableCell>
            <TableCell
              onClick={() => handleSort("verified")}
              sx={{display:{xs:'none',md:'table-cell'}}}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header" style={{ fontWeight: 400, letterSpacing: '0.2em' }}>
                VERIFIED
                {currentSortField === "verified" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : (
                  <Sort />
                )}
              </div>
            </TableCell>
            <TableCell
              onClick={() => handleSort("mainSpecialisation")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header" style={{ fontWeight: 400, letterSpacing: '0.2em' }}>
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
            </TableCell>
            <TableCell
              onClick={() => handleSort("mainSupportArea")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header" style={{ fontWeight: 400, letterSpacing: '0.2em' }}>
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
            </TableCell>
            <TableCell
              onClick={() => handleSort("ipcStatus")}
              style={{ cursor: "pointer" }}
              sx={{display:{xs:'none',md:'table-cell'}}}
            >
              <div className="table-header" style={{ fontWeight: 400, letterSpacing: '0.2em' }}>
                IPC STATUS
                {currentSortField === "ipcStatus" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : (
                  <Sort />
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OrganisationList.map((organisation, index) => (
            <TableRow
              key={index}
              onClick={() =>
                window.open(`/organisations/${organisation.id}`, "_blank")
              }
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#3959FF",
                  color: "white",
                  "& .MuiTableCell-root": {
                    color: "white",
                  },
                },
              }}
            >
              <TableCell style={{ fontWeight: 700, fontSize: "16px" }}>
                {organisation.name}
              </TableCell>
              <TableCell>{organisation.description}</TableCell>
              <TableCell sx={{display:{xs:'none',md:'table-cell'}}}>{verifiedUIMap[organisation.verified]}</TableCell>
              <TableCell>{organisation.mainSpecialisation}</TableCell>
              <TableCell>{organisation.mainSupportArea}</TableCell>
              <TableCell sx={{display:{xs:'none',md:'table-cell'}}}>{ipcUIMap[organisation.ipcApproved]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
