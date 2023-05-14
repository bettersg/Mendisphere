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
import { ReactComponent as Approved } from "../../../assets/icons/statusApproved.svg";
import { ReactComponent as NotApproved } from "../../../assets/icons/statusNotApproved.svg";
import { ReactComponent as Pending } from "../../../assets/icons/statusPending.svg";
import { ReactComponent as Verified } from "../../../assets/icons/statusVerified.svg";
import { ReactComponent as NotVerified } from "../../../assets/icons/statusNotVerified.svg";
import { Organisation } from "../../../data/model/organisation";
import { VerificationStatus } from "../../../data/enums/verification-status.enum";
import { IPCStatus } from "../../../data/enums/ipc-status.enum";

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

const ListView: React.FC<{ organisationList: Organisation[] }> = ({
  organisationList,
}) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState<string>();

  return (
    <TableContainer maxW="full" whiteSpace="normal">
      <Table variant="orgListings">
        <Thead>
          <Tr>
            <Th w="18%">ORGANISATION</Th>
            <Th w="28%">DESCRIPTION</Th>
            {/* <Th w="11%">VERIFIED?</Th> */}
            <Th w="15%">FOCUSES ON</Th>
            <Th w="16%">LOOKING FOR</Th>
            {/* <Th w="12%">IPC STATUS</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {organisationList.map((organisation, index) => {
            return (
              <Tr
                onClick={() =>
                  window.open(`/organisations/${organisation.id}`, "_blank")
                }
                style={{ cursor: "pointer" }}
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
