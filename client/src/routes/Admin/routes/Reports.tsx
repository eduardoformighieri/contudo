import {
  Flex,
  Box,
  Text,
  Button,
  Stack,
  Input,
  InputGroup,
  Spacer,
  InputLeftElement,
} from '@chakra-ui/react';
import { ReportTable } from '../../../components/ReportTable';
import { Nav } from '../../../components/Nav';
import { SearchIcon } from '@chakra-ui/icons';
import { MdLibraryAdd } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

export const Reports = () => {
  const navigate = useNavigate();
  return (
    <Flex bg={'black'} color={'white'}>
      <Nav />
      <Flex flexDirection={'column'} w={'100%'} h={'100vh'} overflowY={'auto'}>
        <Box color={'white'}>
          <Text px={10} py={4} fontSize={30} fontWeight={700} color={'white'}>
            Reports Inbox
          </Text>
          <Flex>
            <Stack spacing={6} w={'250px'} marginLeft={10}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                  marginTop={'4px'}
                />
                <Input
                  h={'48px'}
                  size="lg"
                  w={'330px'}
                  placeholder="Ticket Number"
                />
              </InputGroup>
            </Stack>
            <Spacer />

            <Button
              as={Link}
              to="/guest/create-report"
              target="_blank"
              rel="noopener noreferrer"
              bg="purple.300"
              size="lg"
              w={'150px'}
              leftIcon={<MdLibraryAdd />}
              variant="solid"
              marginRight={10}
              _hover={{
                background: '#9759e3',
              }}>
              Report
            </Button>
          </Flex>
        </Box>
        <ReportTable />
      </Flex>
    </Flex>
  );
};
