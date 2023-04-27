import { Flex, Center } from '@chakra-ui/react';
import { Nav } from '../../../components/Nav';
import { MyProfileBox } from '../../../components/MyProfileBox';
import { UsersTable } from '../../../components/UsersTable';

export const Manage = () => {
  return (
    <Flex bg={'black'} color={'white'} h={'100vh'} w={'100%'}>
      <Nav />
      <Flex
        h={'100vh'}
        w={'100%'}
        alignContent={'center'}
        justifyContent={'center'}>
        <Center>
          <Flex w={'100%'} gap={'24'}>
            <MyProfileBox />
            <UsersTable />
          </Flex>
        </Center>
      </Flex>
    </Flex>
  );
};
