import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { IOrganization } from "..";
import { ReactComponent as Approved } from '../../../assets/icons/statusApproved.svg'
import { ReactComponent as NotApproved } from '../../../assets/icons/statusNotApproved.svg'
import { ReactComponent as Pending } from '../../../assets/icons/statusPending.svg'
import { ReactComponent as Verified } from '../../../assets/icons/statusVerified.svg'
import { ReactComponent as NotVerified } from '../../../assets/icons/statusNotVerified.svg'

const ipcUIMap = {
    ['yes' as string]: <Approved/>,
    ['no' as string]: <NotApproved/>,
    ['pending' as string]: <Pending/>
}

const verifiedUIMap = {
    ['yes' as string]: <Verified/>,
    ['no' as string]: <NotVerified/>,
    ['pending' as string]: <Pending/>
}

const ListView: React.FC<{organizationList: IOrganization[]}> = ({organizationList}) => {
    return (
        <TableContainer>
            <Table variant='simple'>
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
                    {organizationList.map((organization, index) => {
                        return (
                            <Tr>
                                <Td>{index} name</Td>
                                <Td>{organization.renderText}</Td>
                                <Td>{!!organization.verified && verifiedUIMap[organization.verified]}</Td>
                                <Td>{organization.focusesOn}</Td>
                                <Td>{organization.lookingFor}</Td>
                                <Td>{!!organization.IPCRegistered && ipcUIMap[organization.IPCRegistered]}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default ListView;