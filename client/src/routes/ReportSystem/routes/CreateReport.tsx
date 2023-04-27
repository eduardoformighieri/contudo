import { Center, Flex } from '@chakra-ui/react';
import { CreateReportForm } from '../../../components/CreateReportForm';

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
        <CreateReportForm />
      </Center>
    </Flex>
  );
};
