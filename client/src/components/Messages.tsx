import {
  Box,
  Divider,
  Flex,
  Text,
  Icon,
  Input,
  IconButton,
} from '@chakra-ui/react';

import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';

export const Messages = () => {
  return (
    <Box bg="#121212" borderRadius="8px" h={'460px'} w={'100%'}>
      <Flex alignItems={'center'} textAlign={'center'} ml={15}>
        <Icon fontSize={'23px'}>
          <BiMessageRounded />
        </Icon>
        <Text px={3} py={4}>
          Messages
        </Text>
      </Flex>
      <Divider borderColor="gray.100" />
      <Flex flexDirection="column" gap={8} p={6}>
        <Box h={'270px'}></Box>
        <Flex alignItems={'center'} gap={7}>
          <Input
            h={'48px'}
            size="lg"
            w={'90%'}
            placeholder="Write a message here"
            fontSize={16}
          />
          <IconButton
            variant="outline"
            color="white"
            aria-label=""
            size={'lg'}
            fontSize={'22px'}
            icon={<AiOutlineSend />}
            _hover={{
              color: 'purple.300',
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
