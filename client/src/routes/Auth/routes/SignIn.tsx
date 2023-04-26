import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { InputsSignin } from '../../../components/InputsSignin';

export const SignIn = () => {
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
            <InputsSignin />
            <Flex justifyContent="space-between">
              <Text color="blue.200" cursor="pointer" fontSize={14}>
                Forgot your password?
              </Text>
              <Text color="blue.200" cursor="pointer" fontSize={14}>
                First time logging in?
              </Text>
            </Flex>
          </Flex>
          <Button
            size="lg"
            w="350px"
            bg="#BB86FC"
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
