import {
  Box,
  Divider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Text,
  Thead,
  Tr,
  Select,
  Button,
  Flex,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getAllAdmins } from '../api/admins';
import { Pagination } from './Pagination';

export const UsersTable = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data, error } = useQuery<any, Error>(
    ['reports', page],
    () => getAllAdmins(page)
  );

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
    <Box
      border={1}
      bg="#121212"
      borderRadius={10}
      h={'700px'}
      w={'700px'}
      color={'white'}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text px={6} py={4} fontSize={24} color={'white'}>
          Users
        </Text>
        <Flex gap={5} mr={5}>
          <Button
            leftIcon={<MdAdd />}
            size="md"
            w={'120px'}
            bg="purple.300"
            variant="solid"
            _hover={{
              background: '#9759e3',
            }}>
            Add user
          </Button>
        </Flex>
      </Flex>
      <Divider borderColor="gray.100" />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={'white'}>Email</Th>
              <Th color={'white'}>Position</Th>
              <Th color={'white'}>Status</Th>
              <Th color={'white'}>Manage</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.payload.map((admin: any) => (
              <Tr
                key={admin.id}
                _hover={{
                  background: 'gray.900',
                }}>
                <Td>{admin?.email}</Td>
                <Td>{admin?.role?.name}</Td>
                <Td>
                  {admin?.is_first_access ? (
                    <Text color="yellow.200">Pending</Text>
                  ) : (
                    <Text color="green.200">Active</Text>
                  )}
                </Td>
                <Td>
                  <IconButton
                    aria-label="Search database"
                    bg={'#121212'}
                    icon={<BsThreeDotsVertical />}
                  />
                </Td>
              </Tr>
            ))}
            <Tr
              _hover={{
                background: 'gray.900',
              }}>
              <Td>Marco</Td>
              <Td>
                <Select placeholder="Select">
                  <option value="option1">Manager</option>
                  <option value="option2">Admin</option>
                  <option value="option3">Lixo</option>
                </Select>
              </Td>
              <Td>Marco</Td>
              <Td>
                <IconButton
                  aria-label="Search database"
                  bg={'#121212'}
                  icon={<BsThreeDotsVertical />}
                />
              </Td>
            </Tr>
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
