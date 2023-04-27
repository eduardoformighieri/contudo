import { Flex, Box, Text, Divider } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getReportById } from '../../../api/reports';
import { Header } from '../../../components/Header';
import { Messages } from '../../../components/Messages';
import { Nav } from '../../../components/Nav';
import { dateFormatter } from '../../../utils/dateFormatter';

export const Report = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { isLoading, isError, data, error } = useQuery<any, Error>(
    ['service', reportId],
    () => getReportById(reportId!)
  );

  console.log(data);

  return (
    <Flex bg="black" color={'white'} h={'100vh'}>
      <Nav />
      <Box w={'100%'}>
        <Header title={data?.title} />
        <Flex gap={10} p={10}>
          <Flex w={'1100px'} flexDirection={'column'} gap={5}>
            <Box bg="#121212" borderRadius="8px" h={'350px'} w={'100%'}>
              <Text px={6} py={4}>
                Report detail
              </Text>
              <Divider borderColor="gray.100" />
              <Flex flexDirection="column" gap={8} p={6}>
                <Box>
                  <Text color="purple.300">Requester</Text>
                  <Text>{data?.guest_identity}</Text>
                </Box>
                <Box>
                  <Text color="purple.300">Category</Text>
                  <Text>{data?.category}</Text>
                </Box>
                <Box>
                  <Text color="purple.300">Description</Text>
                  <Text>{data?.description}</Text>
                </Box>
              </Flex>
            </Box>
            <Messages />
          </Flex>
          <Box bg="#121212" borderRadius="8px" h={'830px'} w={'650px'}>
            <Text px={6} py={4}>
              Report information
            </Text>
            <Divider borderColor="gray.100" />
            <Flex flexDirection="column" gap={8} p={6}>
              <Box>
                <Text color="purple.300">Status</Text>
                <Text>{data?.status}</Text>
              </Box>
              <Box>
                <Text color="purple.300">Priority</Text>
                <Flex alignItems={'center'} textAlign={'center'}>
                  <Text>{data?.priority ?? 'None'}</Text>
                </Flex>
              </Box>
              <Divider borderColor="gray.100" />
              <Box>
                <Text color="purple.300">Date created</Text>
                <Text>{dateFormatter(data?.created_at)}</Text>
              </Box>
              <Box>
                <Text color="purple.300">Last update</Text>
                <Text>{dateFormatter(data?.updated_at)}</Text>
              </Box>
              <Divider borderColor="gray.100" />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
