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

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    //TODO: login
    navigate('/admin');
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

            <Link
              textAlign="left"
              as={ReactRouterLink}
              to="forgot-password"
              color="blue.200"
              cursor="pointer"
              fontSize={14}>
              Forgot your password?
            </Link>
          </Flex>
          <Button
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
