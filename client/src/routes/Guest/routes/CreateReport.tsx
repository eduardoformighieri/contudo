import { Center, Flex } from '@chakra-ui/react';
import { FormTable } from '../../../components/FormTable';

export const CreateReport = () => {
  return (
    <Flex
      bg="#121212"
      color={'white'}
      width={'100vw'}
      height={'100vh'}
      alignContent={'center'}
      justifyContent={'center'}>
      <Center>
        <FormTable />
      </Center>
    </Flex>
  );
};
