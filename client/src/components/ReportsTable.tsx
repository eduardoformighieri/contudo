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
import { Pagination } from './Pagination';
import { dateFormatter } from '../utils/dateFormatter';

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
          <Thead>
            <Tr>
              <Th color={'white'}>ID</Th>
              <Th color={'white'}>Category</Th>
              <Th color={'white'}>Requester</Th>
              <Th color={'white'}>Last update</Th>
              <Th color={'white'}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.payload.map((report: any) => (
              <Tr
                _hover={{
                  background: 'gray.900',
                }}>
                <Td color={' purple.300'}>{report?.id}</Td>
                <Td>{report?.category}</Td>
                <Td>{report?.guest_identity}</Td>
                <Td>{dateFormatter(report?.updated_at)}</Td>
                <Td
                  color={
                    report?.status === 'Open' ? 'green.200' : 'yellow.100'
                  }>
                  {report?.status}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        px={10}
        currentPage={page}
        total={data?.total || 0}
        changeCurrentPage={setPage}
      />
    </Box>
  );
};
