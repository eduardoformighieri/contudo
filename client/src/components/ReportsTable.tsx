import {
  Box,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getAllReports } from '../api/reports';
import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';

export const ReportsTable = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data, error } = useQuery<any, Error>(
    ['reports', page],
    () => getAllReports(page)
  );
  console.log(data);
  if (isLoading) {
    return (
      <Flex w="100%" justifyContent="center" py={4}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex w="100%" justifyContent="center" py={4}>
        <Text color="#0F1010" fontSize="2xl">
          Error info:
        </Text>
        <Text mt={2}>{error?.message}</Text>
      </Flex>
    );
  }

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
            {/* {data?.payload.map((report: any) => (
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
            ))} */}

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
