import { Flex } from '@chakra-ui/react';
import { ReportTable } from '../components/ReportTable';
import { Nav } from '../components/Nav'
import { Search } from '../components/Search';


export const Dashboard = () => {
  return (
    <Flex bg={'black'} color={'white'} >
      <Nav />
      <Flex flexDirection={'column'} w={'100%'} h={'100vh'} overflowY={'auto'}>
        <Search />
        <ReportTable />    
      </Flex>
    </Flex>
  );
};
