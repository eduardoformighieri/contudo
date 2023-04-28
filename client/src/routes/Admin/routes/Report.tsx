import {
  Flex,
  Box,
  Text,
  Divider,
  Select,
  Button,
  Icon,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  getAllPriorities,
  getAllStatuses,
} from '../../../api/getDataForSelect';
import {
  getReportById,
  sendMessage,
  updatePriorityByReportId,
  updateStatusyByReportId,
} from '../../../api/reports';
import { Header } from '../../../components/Header';
import { Nav } from '../../../components/Nav';
import { queryClient } from '../../../main';
import { dateFormatterWithHH } from '../../../utils/dateFormatter';

export const Report = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { isLoading, isError, data, error } = useQuery<any, Error>(
    ['AdminReport', reportId],
    () => getReportById(reportId!)
  );

  const [isEditingS, setIsEditingS] = useState(false);

  const [statusId, setStatusId] = useState('');

  const { data: statuses } = useQuery<any, Error>(['report-statuses'], () =>
    getAllStatuses()
  );

  const [isEditingP, setIsEditingP] = useState(false);

  const [priorityId, setPriorityId] = useState('');

  const { data: priorities } = useQuery<any, Error>(['report-priorities'], () =>
    getAllPriorities()
  );

  const { mutate: mutatePriority } = useMutation(
    () => updatePriorityByReportId({ reportId: data.id, priorityId }),
    {
      onError: () => {},
      onSuccess: (data) => {
        queryClient.invalidateQueries(['AdminReport']);
        setIsEditingP(!isEditingP);
      },
    }
  );

  const { mutate: mutateStatus } = useMutation(
    () => updateStatusyByReportId({ reportId: data.id, statusId }),
    {
      onError: () => {},
      onSuccess: (data) => {
        queryClient.invalidateQueries(['AdminReport']);
        setIsEditingS(!isEditingS);
      },
    }
  );

  const [inputValue, setInputValue] = useState('');

  const { mutate: mutateSendMessage } = useMutation(
    () =>
      sendMessage({
        content: inputValue,
        reportId: data.id,
        sentBy: 'Admin Team',
      }),
    {
      onError: () => {},
      onSuccess: () => {
        setInputValue('');
        queryClient.invalidateQueries(['AdminReport']);
      },
    }
  );

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      mutateSendMessage();
    }
  };

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
            <Box bg="#121212" borderRadius="8px" h={'460px'} w={'100%'}>
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
                <Box h={'270px'}>
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
          <Box bg="#121212" borderRadius="8px" h={'830px'} w={'650px'}>
            <Text px={6} py={4}>
              Report information
            </Text>

            <Divider borderColor="gray.100" />
            <Flex flexDirection="column" gap={8} p={6}>
              <Box>
                <Flex mb={2} alignItems="center">
                  <Text color="purple.300">Status</Text>{' '}
                  <Button
                    size="xs"
                    colorScheme="blackAlpha"
                    onClick={() => setIsEditingS(!isEditingS)}>
                    {isEditingS ? 'Cancel' : 'Edit'}
                  </Button>
                  {isEditingS && (
                    <Button
                      size="xs"
                      colorScheme="blackAlpha"
                      onClick={() => {
                        mutateStatus();
                      }}>
                      Save Changes
                    </Button>
                  )}
                </Flex>

                {isEditingS ? (
                  <Select
                    value={statusId}
                    onChange={(event: any) => setStatusId(event.target.value)}>
                    {!!statuses &&
                      statuses.map((status: any, i: number) => (
                        <option
                          key={status.id}
                          value={status.id}
                          style={{ background: 'black' }}>
                          {status.name}
                        </option>
                      ))}
                  </Select>
                ) : (
                  <Text>{data?.status}</Text>
                )}
              </Box>
              <Box>
                <Flex mb={2} alignItems="center">
                  <Text color="purple.300">Priority</Text>{' '}
                  <Button
                    size="xs"
                    colorScheme="blackAlpha"
                    onClick={() => setIsEditingP(!isEditingP)}>
                    {isEditingP ? 'Cancel' : 'Edit'}
                  </Button>
                  {isEditingP && (
                    <Button
                      size="xs"
                      colorScheme="blackAlpha"
                      onClick={() => {
                        mutatePriority();
                      }}>
                      Save Changes
                    </Button>
                  )}
                </Flex>
                <Flex alignItems={'center'} textAlign={'center'}>
                  {isEditingP ? (
                    <Select
                      value={priorityId}
                      onChange={(event: any) =>
                        setPriorityId(event.target.value)
                      }>
                      {!!priorities &&
                        priorities.map((priority: any, i: number) => (
                          <option
                            key={priority.id}
                            value={priority.id}
                            style={{ background: 'black' }}>
                            {priority.name}
                          </option>
                        ))}
                    </Select>
                  ) : (
                    <Text>{data?.priority ?? 'None'}</Text>
                  )}
                </Flex>
              </Box>
              <Divider borderColor="gray.100" />
              <Box>
                <Text color="purple.300">Date created</Text>
                <Text>{dateFormatterWithHH(data?.created_at)}</Text>
              </Box>
              <Box>
                <Text color="purple.300">Last update</Text>
                <Text>{dateFormatterWithHH(data?.updated_at)}</Text>
              </Box>
              <Divider borderColor="gray.100" />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
