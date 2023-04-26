import { Box, Center, List } from '@chakra-ui/react';

import { MdHome, MdPerson, MdSpaceDashboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

export const Nav = () => {
  const { pathname } = useLocation();

  return (
    <Box
      bg="#121212"
      w={'60px'}
      h={'100vh'}
      display="flex"
      flexDirection={'column'}>
      <List mt={8} spacing={6} display="flex" flexDirection={'column'}>
        <Center
          as={Link}
          color={pathname === '/admin' ? 'purple.500' : 'gray.100'}
          _hover={{
            color: 'purple.300',
          }}
          to="/admin">
          <MdHome size="24px" />
        </Center>
        <Center
          as={Link}
          color={
            pathname.startsWith('/admin/reports') ? 'purple.500' : 'gray.100'
          }
          _hover={{
            color: 'purple.300',
          }}
          to="/admin/reports">
          <MdSpaceDashboard size="24px" />
        </Center>
        <Center
          as={Link}
          color={
            pathname.startsWith('/admin/manage') ? 'purple.500' : 'gray.100'
          }
          _hover={{
            color: 'purple.300',
          }}
          to="/admin/manage">
          <MdPerson size="24px" />
        </Center>
      </List>
    </Box>
  );
};
