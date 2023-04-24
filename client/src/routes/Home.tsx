import { Flex, Box } from '@chakra-ui/react';
import { ReportDash } from '../components/ReportDash';
import { Nav } from '../components/Nav'
import { Overview } from '../components/Overview';
import { Notifications } from '../components/Notifications';


export const Home = () => {
  return (
    <Flex bg={'black'} color={'white'}>
      <Nav />
      <Box  width={'100%'} m={10}>
        <Flex gap={10}>
            <Overview />
            <Notifications />
        </Flex>
        <ReportDash />    
      </Box>
    </Flex>
  );
};
