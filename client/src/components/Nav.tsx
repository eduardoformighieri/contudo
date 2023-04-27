import { Box, Center, List } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';

import { MdHome, MdPerson, MdSpaceDashboard } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteToken } from '../utils/tokenStorage';

export const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogOut = () => {
    deleteToken();
    navigate('/auth');
  };

  return (
    <Box
      bg="#121212"
      w={'60px'}
      h={'100vh'}
      display="flex"
      flexDirection={'column'}
      py={8}
      justifyContent="space-between">
      <List spacing={6} display="flex" flexDirection={'column'}>
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
      <Center
        as="button"
        onClick={onLogOut}
        color={'gray.100'}
        _hover={{
          color: 'purple.300',
        }}>
        <BiLogOut size="24px" />
      </Center>
    </Box>
  );
};
function useNvaigate() {
  throw new Error('Function not implemented.');
}
