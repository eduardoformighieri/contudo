import {
  Flex,
  Box,
  Center,
  Text,
  Divider,
  Spinner,
  Input,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getReportBySecretKey, sendMessage } from '../../../api/reports';
import { Header } from '../../../components/Header';
import { NotFound } from '../../../components/NotFound';
import { queryClient } from '../../../main';
import { dateFormatterWithHH } from '../../../utils/dateFormatter';

export const Report = () => {
  const { secretKey } = useParams<{ secretKey: string }>();
  const { isLoading, isError, data, error } = useQuery<any, Error>(
    ['guestReport', secretKey],
    () => getReportBySecretKey(secretKey!),
    { retry: false }
  );

  const [inputValue, setInputValue] = useState('');

  const { mutate: mutateSendMessage } = useMutation(
    () =>
      sendMessage({
        content: inputValue,
        reportId: data.id,
        sentBy: data.guest_identity,
      }),
    {
      onError: () => {},
      onSuccess: () => {
        setInputValue('');
        queryClient.invalidateQueries(['guestReport']);
      },
    }
  );

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      mutateSendMessage();
    }
  };

  if (isLoading) {
    return (
      <Center bg={'black'} color="white" h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return <NotFound />;
  }

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
            <Box bg="#121212" borderRadius="8px" h={'400px'} w={'100%'}>
              <Flex alignItems={'center'} textAlign={'center'} ml={15}>
                <Icon fontSize={'23px'}>
                  <BiMessageRounded />
                </Icon>
                <Text px={3} py={4}>
                  Messages
                </Text>
              </Flex>
              <Divider borderColor="gray.100" />
              <Flex flexDirection="column" gap={8} p={6}>
                <Box h={'200px'}>
                  <Flex
                    h="100%"
                    flexDirection="column-reverse"
                    overflowY="auto"
                    css={{
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                    }}>
                    <Flex w="100%" gap={2} flexDirection="column">
                      {data?.messages.map(
                        (message: {
                          id: string;
                          sent_by: string;
                          content: string;
                          report_id: string;
                          created_at: string;
                        }) => (
                          <Box
                            key={message.id}
                            ml={message.sent_by !== 'Admin Team' ? 'auto' : 0}
                            bg={
                              message.sent_by !== 'Admin Team'
                                ? '#FFEDE0'
                                : '#ECEFFE'
                            }
                            px={4}
                            py={4}
                            maxW="492px"
                            borderRadius="16px"
                            borderBottomRightRadius={
                              message.sent_by !== 'Admin Team' ? 0 : '16px'
                            }
                            borderBottomLeftRadius={
                              message.sent_by !== 'Admin Team' ? '16px' : 0
                            }>
                            <Text
                              whiteSpace="pre-wrap"
                              color="gray.800"
                              fontSize={{ base: 'sm', md: 'md' }}>
                              {message.content}
                            </Text>
                            <Text
                              textAlign="right"
                              whiteSpace="pre-wrap"
                              color="gray.500"
                              fontSize="xs">
                              {message.sent_by} -{' '}
                              {dateFormatterWithHH(message.created_at)}
                            </Text>
                          </Box>
                        )
                      )}
                    </Flex>
                  </Flex>
                </Box>
                <Flex alignItems={'center'} gap={7}>
                  <Input
                    onKeyDown={handleKeyDown}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    h={'48px'}
                    size="lg"
                    w={'90%'}
                    placeholder="Write a message here"
                    fontSize={16}
                  />
                  <IconButton
                    onClick={() => mutateSendMessage()}
                    variant="outline"
                    color="white"
                    aria-label=""
                    size={'lg'}
                    fontSize={'22px'}
                    icon={<AiOutlineSend />}
                    _hover={{
                      color: 'purple.300',
                    }}
                  />
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Center>
      </Box>
    </Flex>
  );
};
