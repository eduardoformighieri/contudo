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
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {  MdAdd } from 'react-icons/md';


export const Users = () => {
  return (
  <Box border={1} bg='#121212'  borderRadius={10} h={'700px'} w={'700px'} color={'white'}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text px={6} py={4} fontSize={24} color={'white'}>Users</Text>
          <Flex gap={5} mr={5}>
          <Button leftIcon={<MdAdd />} size='md' w={'120px'}  bg='#BB86FC' variant='solid' _hover={{
            background: "#9759e3",
          }}>
            Add user
            </Button>
          </Flex>
        </Flex>
        <Divider borderColor="gray.100" />  
      <TableContainer>
        <Table variant="simple">
        <TableCaption>5 Total users</TableCaption>
          <Thead>
            <Tr >
              <Th color={'white'}>Name</Th>
              <Th color={'white'}>Position</Th>
              <Th color={'white'}>Manage</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr _hover={{
              background: "gray.900",
              }}>
              <Td>Marco</Td>
              <Td>
              <Select placeholder='Select'>
                <option value='option1'>Manager</option>
                <option value='option2'>Admin</option>
                <option value='option3'>Lixo</option>
              </Select>
              </Td>
              <Td><IconButton aria-label='Search database' bg={'#121212'} icon={<BsThreeDotsVertical />} /></Td>
            </Tr>
            <Tr _hover={{
              background: "gray.900",
              }}>
              <Td>Eduardo</Td>
              <Td>
              <Select placeholder='Select' mr={20}>
                <option value='option1'>Manager</option>
                <option value='option2'>Admin</option>
                <option value='option3'>Lixo</option>
              </Select>
              </Td>
              <Td ><IconButton aria-label='Search database' bg={'#121212'} icon={<BsThreeDotsVertical />} /></Td>
            </Tr>
            <Tr _hover={{
              background: "gray.900",
              }}>
              <Td>José</Td>
              <Td>
              <Select placeholder='Select'>
                <option value='option1'>Manager</option>
                <option value='option2'>Admin</option>
                <option value='option3'>Lixo</option>
              </Select>
              </Td>
              <Td><IconButton  aria-label='Search database' bg={'#121212'} icon={<BsThreeDotsVertical />} /></Td>
            </Tr>
            <Tr _hover={{
              background: "gray.900",
              }}>
              <Td>Maria</Td>
              <Td>
              <Select placeholder='Select'>
                <option value='option1'>Manager</option>
                <option value='option2'>Admin</option>
                <option value='option3'>Lixo</option>
              </Select>
              </Td>
              <Td ><IconButton aria-label='Search database'  bg={'#121212'} icon={<BsThreeDotsVertical /> }  /></Td>
            </Tr>
            <Tr _hover={{
              background: "gray.900",
              }}>
              <Td>Albert</Td>
                            <Td>
              <Select placeholder='Select'>
                <option value='option1'>Manager</option>
                <option value='option2'>Admin</option>
                <option value='option3'>Lixo</option>
              </Select>
              </Td>
              <Td><IconButton aria-label='Search database' bg={'#121212'} icon={<BsThreeDotsVertical />} /></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
        
      </Box>
  );
};
