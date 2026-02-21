import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SortUp } from "../../assets/icons/sortUp.svg";
import { ReactComponent as SortDown } from "../../assets/icons/sortDown.svg";
import { Organisation } from "../../data/Model/Organisation";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import "./style.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { muiTheme } from "../../theme/muiTheme";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const ipcUIMap = {
  [IPCStatus.Approved]: (
    <Chip
      sx={{ bgcolor: muiTheme.palette.success.main, color: "white" }}
      label={"IPC Certified"}
      deleteIcon={<CheckCircleIcon sx={{ color: "white !important" }} />}
      onDelete={() => {}}
    />
  ),
  [IPCStatus.NotApproved]: null,
  [IPCStatus.Pending]: (
    <Chip
      sx={{ bgcolor: muiTheme.palette.pending.main, color: "white" }}
      label={"IPC Pending"}
      deleteIcon={<InfoOutlinedIcon sx={{ color: "white !important" }} />}
      onDelete={() => {}}
    />
  ),
};

const verifiedUIMap = {
  [VerificationStatus.Verified]: <VerifiedUserOutlinedIcon />,
  [VerificationStatus.NotVerified]: null,
  [VerificationStatus.Pending]: null,
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
        <TableHead sx={{ display: { xs: "none", md: "table-header-group" } }}>
          <TableRow>
            <TableCell sx={{ width: 56 }} />
            <TableCell
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header" style={{ fontWeight: 600 }}>
                Organisations
                {currentSortField === "name" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : null}
              </div>
            </TableCell>
            <TableCell
              onClick={() => handleSort("verified")}
              sx={{ display: { xs: "none", md: "table-cell" } }}
              style={{ cursor: "pointer" }}
            >
              <div
                className="table-header"
                style={{ fontWeight: 400, letterSpacing: "0.2em" }}
              >
                {currentSortField === "verified" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : null}
              </div>
            </TableCell>
            <TableCell
              onClick={() => handleSort("description")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header" style={{ fontWeight: 600 }}>
                Description
                {currentSortField === "description" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : null}
              </div>
            </TableCell>

            <TableCell
              onClick={() => handleSort("mainSpecialisation")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header" style={{ fontWeight: 600 }}>
                Focuses on
                {currentSortField === "mainSpecialisation" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : null}
              </div>
            </TableCell>
            <TableCell
              onClick={() => handleSort("mainSupportArea")}
              style={{ cursor: "pointer" }}
            >
              <div className="table-header" style={{ fontWeight: 600 }}>
                Looking for
                {currentSortField === "mainSupportArea" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : null}
              </div>
            </TableCell>
            <TableCell
              onClick={() => handleSort("ipcStatus")}
              style={{ cursor: "pointer" }}
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              <div className="table-header" style={{ fontWeight: 600 }}>
                IPC Registered
                {currentSortField === "ipcStatus" ? (
                  currentSortDirection === "asc" ? (
                    <SortUp />
                  ) : (
                    <SortDown />
                  )
                ) : null}
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
                  backgroundColor: "#F7F9FF",
                },
              }}
            >
              <TableCell sx={{ width: 56, padding: "8px" }}>
                {organisation.cardImageUrl && (
                  <img
                    src={organisation.cardImageUrl}
                    alt={organisation.name}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 4,
                      display: "block",
                    }}
                  />
                )}
              </TableCell>
              <TableCell style={{ fontWeight: 700, fontSize: "16px" }}>
                <Typography variant="subtitle2">{organisation.name}</Typography>
                <Box sx={{ display: { xs: "block", md: "none" }, mt: 0.5 }}>
                  <Chip label={organisation.mainSpecialisation} size="small" />
                </Box>
              </TableCell>
              <TableCell>{verifiedUIMap[organisation.verified]}</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                {organisation.description}
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                <Chip label={organisation.mainSpecialisation} />
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                <Chip
                  sx={{ bgcolor: "#E7EBFF" }}
                  label={organisation.mainSupportArea}
                  deleteIcon={<SearchIcon />}
                  onDelete={() => {}}
                />
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                {ipcUIMap[organisation.ipcApproved]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
