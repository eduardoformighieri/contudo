import {  SearchIcon } from '@chakra-ui/icons';
import { Box, Text, Button, Stack, Flex, Spacer, InputLeftElement } from '@chakra-ui/react';
import { Input, InputGroup } from '@chakra-ui/react'
import { MdLibraryAdd } from "react-icons/md"

export const Search = () => {
  return (
    <Box color={'white'}>
      <Text px={10} py={4} fontSize={30} fontWeight={700} color={'white'}>
        Reports Inbox
      </Text>
      <Flex>
        <Stack spacing={6} w={'250px'} marginLeft={10} >
          <InputGroup >
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' />}
              marginTop={'4px'}
            />
            <Input h={'48px'} size='lg'  w={'330px'} placeholder='Ticket Number' />
          </InputGroup>
        </Stack>
        <Spacer />
        <Stack direction='row' spacing={4}>
          <Button bg='#BB86FC' size='lg' w={'150px'} leftIcon={<MdLibraryAdd />}  variant='solid' marginRight={10} _hover={{
              background: "#9759e3",
              }}>
           Report
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};


