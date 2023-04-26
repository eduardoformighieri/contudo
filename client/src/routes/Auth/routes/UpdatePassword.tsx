import { Button, Center, Flex, Text } from '@chakra-ui/react';

import { InputsPassword } from '../../../components/InputsPassword';

export const UpdatePassword = () => {
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
            Password reset
          </Text>
          <Flex flexDirection="column" gap={5} mb={10}>
            <InputsPassword />
            <Text color="blue.200" cursor="pointer">
              Back to sign in
            </Text>
          </Flex>
          <Button
            size="lg"
            w="350px"
            bg="#BB86FC"
            variant="solid"
            _hover={{
              background: '#9759e3',
            }}>
            Confirm
          </Button>
        </Flex>
      </Center>
    </Flex>
  );
};
