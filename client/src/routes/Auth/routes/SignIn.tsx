import {
  Center,
  Flex,
  Link,
  Box,
  Text,
  Button,
  Stack,
  Spacer,
  InputLeftElement,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Input, InputGroup } from '@chakra-ui/react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { signIn } from '../../../api/auth';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { setToken } from '../../../utils/tokenStorage';

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const { isLoading, mutate } = useMutation(() => signIn({ email, password }), {
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
        title: 'You logged',
        position: 'top-right',
        isClosable: true,
        status: 'success',
      });

      setToken(data.access_token);
      navigate('/admin');
    },
  });

  const handleSubmit = () => {
    mutate();
  };

  return (
    <Flex
      bg="black"
      color="white"
      width="100vw"
      height="100vh"
      alignContent="center"
      justifyContent="center">
      <Center>
        <Flex flexDirection="column" alignItems="center" textAlign="center">
          <Text mb={7} fontSize={25} fontWeight="700" as="b">
            Log in
          </Text>
          <Flex flexDirection="column" gap={5} mb={10}>
            <Box color={'white'}>
              <Stack spacing={6}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdEmail color="gray.300" />}
                    marginTop={'4px'}
                  />
                  <Input
                    value={email}
                    onChange={(event: any) => setEmail(event.target.value)}
                    type="email"
                    h={'48px'}
                    size="lg"
                    w={'350px'}
                    placeholder="Email"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdLock color="gray.300" />}
                    marginTop={'4px'}
                  />
                  <Input
                    value={password}
                    onChange={(event: any) => setPassword(event.target.value)}
                    type="password"
                    h={'48px'}
                    size="lg"
                    w={'350px'}
                    placeholder="Password"
                  />
                </InputGroup>
              </Stack>
            </Box>
            <Flex justifyContent={'space-between'}>
              <Link
                textAlign="left"
                as={ReactRouterLink}
                to="forgot-password"
                color="blue.200"
                cursor="pointer"
                fontSize={14}>
                Forgot your password?
              </Link>

              <Link
                textAlign="left"
                as={ReactRouterLink}
                to="/report-system"
                color="blue.200"
                cursor="pointer"
                fontSize={14}>
                Visit Report System
              </Link>
            </Flex>
          </Flex>
          <Button
            isLoading={isLoading}
            onClick={handleSubmit}
            size="lg"
            w="350px"
            bg="purple.300"
            variant="solid"
            _hover={{
              background: '#9759e3',
            }}>
            Log in
          </Button>
        </Flex>
      </Center>
    </Flex>
  );
};
