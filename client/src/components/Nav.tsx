import { Box, Center } from '@chakra-ui/react';
import { List } from '@chakra-ui/react';

import { IconButton } from '@chakra-ui/react';
import {
  MdSpaceDashboard,
  MdHome,
  MdPerson,
  MdOutlineVerticalShadesClosed,
} from 'react-icons/md';
import { useLocation, useNavigate, Link } from 'react-router-dom';

// The default icon size is 1em (16px)

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
