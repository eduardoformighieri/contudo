import {
  Box,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export const ReportsTable = () => {
  return (
    <Box border={1} margin={10} bg="#121212" borderRadius={10} mt={'50px'}>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>15 Total tickets</TableCaption>
          <Thead>
            <Tr>
              <Th color={'white'}>ID</Th>
              <Th color={'white'}>Category</Th>
              <Th color={'white'}>Requester</Th>
              <Th color={'white'}>Requester updated</Th>
              <Th color={'white'}>Priority</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175595</Td>
              <Td>Corruption</Td>
              <Td>Robert</Td>
              <Td>21 Mar 2023</Td>
              <Td color={'yellow.100'}>Normal</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175846</Td>
              <Td>Theft</Td>
              <Td>Sabrina</Td>
              <Td>22 Mar 2023</Td>
              <Td color={'red.'}>High</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175946</Td>
              <Td>Assault</Td>
              <Td>George</Td>
              <Td>23 Mar 2023</Td>
              <Td color={'orange.400'}>Medium</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175595</Td>
              <Td>Corruption</Td>
              <Td>Robert</Td>
              <Td>21 Mar 2023</Td>
              <Td color={'yellow.100'}>Normal</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175846</Td>
              <Td>Theft</Td>
              <Td>Sabrina</Td>
              <Td>22 Mar 2023</Td>
              <Td color={'red.'}>High</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175946</Td>
              <Td>Assault</Td>
              <Td>George</Td>
              <Td>23 Mar 2023</Td>
              <Td color={'orange.400'}>Medium</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175595</Td>
              <Td>Corruption</Td>
              <Td>Robert</Td>
              <Td>21 Mar 2023</Td>
              <Td color={'yellow.100'}>Normal</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175846</Td>
              <Td>Theft</Td>
              <Td>Sabrina</Td>
              <Td>22 Mar 2023</Td>
              <Td color={'red.'}>High</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175946</Td>
              <Td>Assault</Td>
              <Td>George</Td>
              <Td>23 Mar 2023</Td>
              <Td color={'orange.400'}>Medium</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175595</Td>
              <Td>Corruption</Td>
              <Td>Robert</Td>
              <Td>21 Mar 2023</Td>
              <Td color={'yellow.100'}>Normal</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175846</Td>
              <Td>Theft</Td>
              <Td>Sabrina</Td>
              <Td>22 Mar 2023</Td>
              <Td color={'red.'}>High</Td>
            </Tr>
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td color={' purple.300'}>#175946</Td>
              <Td>Assault</Td>
              <Td>George</Td>
              <Td>23 Mar 2023</Td>
              <Td color={'orange.400'}>Medium</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
