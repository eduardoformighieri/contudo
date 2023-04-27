import { Flex, Box, Center, Text, Divider } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getReportBySecretKey } from '../../../api/reports';
import { Header } from '../../../components/Header';
import { MessagesEmployee } from '../../../components/MessagesEmployee';

export const Report = () => {
  const { secretKey } = useParams<{ secretKey: string }>();
  const { isLoading, isError, data, error } = useQuery<any, Error>(
    ['service', secretKey],
    () => getReportBySecretKey(secretKey!)
  );
  return (
    <Flex bg={'black'} color={'white'} h={'100vh'} w={'100%'}>
      <Box w={'100%'}>
        <Header title={data?.title} />
        <Center>
          <Flex p={8} gap={6} w={'990px'} flexDirection={'column'}>
            <Box bg="#121212" borderRadius="8px" h={'420px'} w={'100%'}>
              <Text px={6} py={4}>
                Report detail
              </Text>
              <Divider borderColor="gray.100" />
              <Flex flexDirection="column" gap={8} p={6}>
                <Box>
                  <Text color="purple.300">Status</Text>
                  <Text>{data?.status}</Text>
                </Box>
                <Box>
                  <Text color="purple.300">Requester</Text>
                  <Text>{data?.guest_identity}</Text>
                </Box>
                <Box>
                  <Text color="purple.300">Category</Text>
                  <Text>{data?.category}</Text>
                </Box>
                <Box>
                  <Text color="purple.300">More information</Text>
                  <Text>{data?.description}</Text>
                </Box>
              </Flex>
            </Box>
            <MessagesEmployee />
          </Flex>
        </Center>
      </Box>
    </Flex>
  );
};
