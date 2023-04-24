import { Button, Center, Flex, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react';

import { InputsPassword } from '../components/InputsPassword';
import { MdEmail, MdLock } from 'react-icons/md';



export const NewEmail = () => {
  return (
    <Flex bg={'black'} color={'white'} width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Center>
        <Flex flexDirection={'column'} alignItems={'center'}  textAlign={'center'} >
          <Text mb={7} fontSize={25} fontWeight={'700'} as={'b'}>
          What’s your email?
          </Text>
          <Center>
            <Flex flexDirection={'column'} gap={5} mb={10} w={'350px'}>
            <Text >
              We’ll send a temporary link to your email to set up your account.
                </Text>
                <Text  mb={3}>
                It can take a few minutes to receive the link.
                </Text>
            <Stack spacing={6}>
            <InputGroup >
              <InputLeftElement
                pointerEvents='none'
                children={<MdEmail color='gray.300' />}
                marginTop={'4px'}
                />
              <Input type='email' h={'48px'} size='lg'  w={'350px'} placeholder='Your email' />
            </InputGroup>
          </Stack>
          
          </Flex>
          </Center>
          <Button size='lg' w={'350px'}  bg='#BB86FC'  variant='solid' _hover={{
   background: "#9759e3",
}}>
          Confirm
          </Button>
        </Flex>
      </Center>
    </Flex>
  );
};
