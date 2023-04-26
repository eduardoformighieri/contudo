import { Flex, Box } from '@chakra-ui/react';
import { Header } from '../../../components/Header';
import { Messages } from '../../../components/Messages';
import { Nav } from '../../../components/Nav';
import { ReportDetail } from '../../../components/ReportDetail';
import { ReportInfoAdmin } from '../../../components/ReportInfoAdmin';

export const Report = () => {
  return (
    <Flex bg="black" color={'white'} h={'100vh'}>
      <Nav />
      <Box w={'100%'}>
        <Header />
        <Flex gap={10} p={10}>
          <Flex w={'1100px'} flexDirection={'column'} gap={5}>
            <ReportDetail />
            <Messages />
          </Flex>
          <ReportInfoAdmin />
        </Flex>
      </Box>
    </Flex>
  );
};
