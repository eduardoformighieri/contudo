import { Flex, Box, Text, Divider, Select, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  getAllPriorities,
  getAllStatuses,
} from '../../../api/getDataForSelect';
import {
  getReportById,
  updatePriorityByReportId,
  updateStatusyByReportId,
} from '../../../api/reports';
import { Header } from '../../../components/Header';
import { Messages } from '../../../components/Messages';
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
