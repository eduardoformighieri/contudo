import { Flex, Center, Text, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Center bg={'black'} color={'white'} h="100vh">
      <Flex flexDirection={'column'} alignItems={'center'}>
        <Text color={'#BB86FC'} fontSize={100}>
          404!
        </Text>
        <Text color={'#BB86FC'}>
          Unable to find ticket number, please go back.
        </Text>
        <Link as={ReactRouterLink} to="/report-system" color={'white'} mt={10}>
          Back to home
        </Link>
      </Flex>
    </Center>
  );
};
