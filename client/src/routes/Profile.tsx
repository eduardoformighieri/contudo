import { Flex,  Center } from '@chakra-ui/react';
import { Nav } from '../components/Nav'
import { ProfileTable } from '../components/ProfileTable';
import { Users } from '../components/Users';


export const Profile = () => {
  return (
    <Flex bg={'black'} color={'white'} h={'100vh'} w={'100%'}>
      <Nav />
        <Flex h={'100vh'} w={'100%'} alignContent={"center"} justifyContent={"center"}>
        <Center>
          <Flex w={'100%'} gap={'24'}>
            <ProfileTable />
            <Users />
          </Flex>
        </Center>
      </Flex>
    </Flex>
  );
};
