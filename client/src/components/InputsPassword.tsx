import { Box, Text, Button, Stack, Flex, Spacer, InputLeftElement } from '@chakra-ui/react';
import { Input, InputGroup } from '@chakra-ui/react'
import { MdEmail, MdLock } from "react-icons/md"

export const InputsPassword = () => {
  return (
    <Box color={'white'}>
      <Stack spacing={6}>
        <InputGroup >
          <InputLeftElement
            pointerEvents='none'
            children={<MdLock color='gray.300' />}
            marginTop={'4px'}
            />
          <Input type='password' h={'48px'} size='lg'  w={'350px'} placeholder='Old password' />
        </InputGroup>
        <InputGroup >
          <InputLeftElement
            pointerEvents='none'
            children={<MdLock color='gray.300' />}
            marginTop={'4px'}
            />
          <Input type='password' h={'48px'} size='lg'  w={'350px'} placeholder='New password' />
        </InputGroup>
        <InputGroup >
          <InputLeftElement
            pointerEvents='none'
            children={<MdLock color='gray.300' />}
            marginTop={'4px'}
            />
          <Input type='password' h={'48px'} size='lg'  w={'350px'} placeholder='Confirm new password' />
        </InputGroup>
      </Stack>
    </Box>
  );
};

