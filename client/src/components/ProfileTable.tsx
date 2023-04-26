import {
  Flex,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Divider,
  Text,
  Button,
} from '@chakra-ui/react';
import { MdAssignmentInd, MdEmail, MdPerson } from 'react-icons/md';
import { InputsPassword } from './InputsPassword';

export const ProfileTable = () => {
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
          h={'100%'}
          flexDirection={'column'}
          m={10}>
          <Stack spacing={6}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdPerson color="gray.300" />}
                marginTop={'4px'}
              />
              <Input
                type="text"
                h={'48px'}
                size="lg"
                w={'420px'}
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdEmail color="gray.300" />}
                marginTop={'4px'}
              />
              <Input
                type="email"
                h={'48px'}
                size="lg"
                w={'420px'}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdAssignmentInd color="gray.300" />}
                marginTop={'4px'}
              />
              <Input
                type="text"
                h={'48px'}
                size="lg"
                w={'420px'}
                placeholder="Position"
              />
            </InputGroup>
          </Stack>

          <Text m={5} fontSize={20}>
            Password
          </Text>
          <InputsPassword />

          <Flex>
            <Button
              size="lg"
              w={'350px'}
              bg="purple.300"
              variant="solid"
              mt={10}
              _hover={{
                background: '#9759e3',
              }}>
              Save changes
            </Button>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
};
