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
    <TableContainer>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>ORGANISATION</Th>
            <Th>DESCRIPTION</Th>
            <Th>VERIFIED?</Th>
            <Th>FOCUSES ON</Th>
            <Th>LOOKING FOR</Th>
            <Th>IPC STATUS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {organisationList.map((organisation, index) => {
            return (
              <Tr
                onClick={() => navigate(`/organisations/${organisation.id}`)}
                style={{ cursor: "pointer" }}
              >
                <Td>{index} name</Td>
                <Td>{organisation.description}</Td>
                <Td>
                  {!!organisation.verified &&
                    verifiedUIMap[organisation.verified]}
                </Td>
                <Td>{organisation.mainSpecialisation}</Td>
                <Td>{organisation.mainSupportArea}</Td>
                <Td>
                  {!!organisation.ipcApproved &&
                    ipcUIMap[organisation.ipcApproved]}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
