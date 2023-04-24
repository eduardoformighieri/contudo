import { Flex, Box, Center } from '@chakra-ui/react';
import { Header } from '../components/Header'
import { MessagesEmployee } from '../components/MessagesEmployee';
import { ReportDetailEmployee } from '../components/ReportDetailEmployee';



export const TicketEmployee = () => {
  return (
    <Flex bg={'black'} color={'white'} h={'100vh'} w={'100%'}>
        <Box w={'100%'}>
          <Header />
          <Center>
            <Flex p={8} gap={6} w={'990px'} flexDirection={'column'} >
                <ReportDetailEmployee />
                <MessagesEmployee />
            </Flex>
          </Center>
        </Box>
    </Flex>
  );
};

