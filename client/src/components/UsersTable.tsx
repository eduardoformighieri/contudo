import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from '@chakra-ui/icons';
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getAllAdmins } from '../api/admins';
import { AddAdminModal } from './AddAdminModal';
import { DeleteAdminModal } from './DeleteAdminModal';
import { Pagination } from './Pagination';
import { UpdateAdminModal } from './UpdateAdminModal';

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
          <AddAdminModal />
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
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<BsThreeDotsVertical />}
                      variant="unstyled"
                    />
                    <MenuList bg="#121212">
                      <MenuItem _hover={{ bg: '#404040' }} bg="#121212">
                        <UpdateAdminModal />
                      </MenuItem>
                      <MenuItem _hover={{ bg: '#404040' }} bg="#121212">
                        <DeleteAdminModal />
                      </MenuItem>
                    </MenuList>
                  </Menu>
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
