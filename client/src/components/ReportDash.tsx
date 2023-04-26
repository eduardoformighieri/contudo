import {
  Box,
  Divider,
  Text,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export const ReportDash = () => {
  return (
    <Box bg="#121212" borderRadius={10} mt={10} color={'white'}>
      <Box bg="#121212" borderRadius={10}>
        <Text px={6} py={4}>
          Tickets that demand attention
        </Text>
        <Divider borderColor="white" />
      </Box>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>3 Total tickets</TableCaption>
          <Thead>
            <Tr>
              <Th color={'white'}>ID</Th>
              <Th color={'white'}>Subject</Th>
              <Th color={'white'}>Requester</Th>
              <Th color={'white'}>Requester updated</Th>
              <Th color={'white'}>Priority</Th>
              <Th color={'white'}>Assignee</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={'purple.300'}>#175595</Td>
              <Td>Corruption</Td>
              <Td>Robert</Td>
              <Td>21 Mar 2023</Td>
              <Td color={'yellow.100'}>Normal</Td>
              <Td>Admin</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={'purple.300'}>#175846</Td>
              <Td>Theft</Td>
              <Td>Sabrina</Td>
              <Td>22 Mar 2023</Td>
              <Td color={'red.400'}>High</Td>
              <Td>Admin</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={'purple.300'}>#175946</Td>
              <Td>Assault</Td>
              <Td>George</Td>
              <Td>23 Mar 2023</Td>
              <Td color={'orange.400'}>Medium</Td>
              <Td>Admin</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
