import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { MdPerson, MdEmail, MdAssignmentInd, MdLock } from 'react-icons/md';
import { useMutation } from 'react-query';
import { updateSelf } from '../api/admins';
import { updatePassword } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { InputsPassword } from './InputsPassword';

export const MyProfileBox = () => {
  const toast = useToast();
  const { admin } = useAuth();
  console.log(admin);

  const [email, setEmail] = useState(admin?.email ?? '');
  const [name, setName] = useState(admin?.name ?? '');

  const { isLoading: isUpdateProfileLoading, mutate: mutateUpdateProfile } =
    useMutation(
      () =>
        updateSelf({
          ...(email === admin?.email ? {} : { email }),
          ...(name === admin?.name ? {} : { name }),
        }),
      {
        onError: (error: AxiosError<{ message: string }>) => {
          if (error?.response?.data?.message) {
            toast({
              title: error.response.data.message,
              position: 'top-right',
              isClosable: true,
              status: 'error',
            });
          } else {
            toast({
              title: 'Unknown error',
              position: 'top-right',
              isClosable: true,
              status: 'error',
            });
          }
        },
        onSuccess: (data) => {
          toast({
            title: 'Profile updated',
            position: 'top-right',
            isClosable: true,
            status: 'success',
          });
        },
      }
    );

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setconfirmNewPassword] = useState('');

  const { isLoading: isUpdatePasswordLoading, mutate: mutateUpdatePassword } =
    useMutation(
      () =>
        updatePassword({
          oldPassword,
          newPassword,
        }),
      {
        onError: (error: AxiosError<{ message: string }>) => {
          if (error?.response?.data?.message) {
            toast({
              title: error.response.data.message,
              position: 'top-right',
              isClosable: true,
              status: 'error',
            });
          } else {
            toast({
              title: 'Unknown error',
              position: 'top-right',
              isClosable: true,
              status: 'error',
            });
          }
        },
        onSuccess: (data) => {
          toast({
            title: 'Password updated',
            position: 'top-right',
            isClosable: true,
            status: 'success',
          });
        },
      }
    );

  return (
    <Flex
      bg="#121212"
      color={'white'}
      borderRadius="8px"
      h={'700px'}
      w={'700px'}
      flexDirection={'column'}>
      <Text px={6} py={4} fontSize={24}>
        Profile
      </Text>

      <Divider borderColor="gray.100" />
      <Center>
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          w="100%"
          flexDirection={'column'}
          mt={10}>
          <Stack w="100%" spacing={6} alignItems="center">
            <InputGroup maxW="400px" w="100%">
              <InputLeftElement
                pointerEvents="none"
                children={<MdPerson color="gray.300" />}
                marginTop={'4px'}
              />
              <Input
                value={name}
                onChange={(event: any) => setName(event.target.value)}
                type="text"
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup maxW="400px" w="100%">
              <InputLeftElement
                pointerEvents="none"
                children={<MdEmail color="gray.300" />}
                marginTop={'4px'}
              />
              <Input
                value={email}
                onChange={(event: any) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
              />
            </InputGroup>
          </Stack>
          <Button
            isLoading={isUpdateProfileLoading}
            onClick={() => {
              mutateUpdateProfile();
            }}
            maxW="400px"
            w="100%"
            bg="purple.300"
            variant="solid"
            mt={10}
            _hover={{
              background: '#9759e3',
            }}>
            Save changes
          </Button>

          <Text m={5} fontSize={20}>
            Password
          </Text>
          <Box w="100%" color={'white'}>
            <Stack spacing={6} alignItems="center">
              <InputGroup maxW="400px" w="100%">
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLock color="gray.300" />}
                  marginTop={'4px'}
                />
                <Input
                  value={oldPassword}
                  onChange={(event: any) => setOldPassword(event.target.value)}
                  type="password"
                  w="100%"
                  placeholder="Old password"
                />
              </InputGroup>
              <InputGroup maxW="400px" w="100%">
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLock color="gray.300" />}
                  marginTop={'4px'}
                />
                <Input
                  value={newPassword}
                  onChange={(event: any) => setNewPassword(event.target.value)}
                  type="password"
                  w="100%"
                  placeholder="New password"
                />
              </InputGroup>
              <InputGroup maxW="400px" w="100%">
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLock color="gray.300" />}
                  marginTop={'4px'}
                />
                <Input
                  value={confirmNewPassword}
                  onChange={(event: any) =>
                    setconfirmNewPassword(event.target.value)
                  }
                  type="password"
                  w="100%"
                  placeholder="Confirm new password"
                />
              </InputGroup>
            </Stack>
          </Box>

          <Button
            isLoading={isUpdatePasswordLoading}
            onClick={() => {
              if (newPassword === confirmNewPassword) {
                mutateUpdatePassword();
              } else {
                toast({
                  title: 'Password doesnt match',
                  position: 'top-right',
                  isClosable: true,
                  status: 'error',
                });
              }
            }}
            maxW="400px"
            w="100%"
            bg="purple.300"
            variant="solid"
            mt={10}
            _hover={{
              background: '#9759e3',
            }}>
            Update Password
          </Button>
        </Flex>
      </Center>
    </Flex>
  );
};
