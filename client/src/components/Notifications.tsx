import { Box, Divider, Flex, Text, Icon } from '@chakra-ui/react';

import { MdExposurePlus1 } from "react-icons/md";


export const Notifications = () => {
  return (
    <Box bg='#121212'  borderRadius="8px" h={'350px'} w={'100%'} color={'white'}>
      <Text px={6} py={4} >Notifications</Text>
      <Divider borderColor="white" />
    <Flex flexDirection="column" gap={30} p={6}>

      <Flex gap={3} alignItems={'center'}>
        <Icon fontSize={'25px'} color='#BB86FC'><MdExposurePlus1 /></Icon>
        <Text fontSize={24}>New update on ticket #256345</Text>
      </Flex>

      <Divider borderColor="gray.100" />

      <Flex gap={3} alignItems={'center'}>
        <Icon fontSize={'25px'} color='#BB86FC'><MdExposurePlus1 /></Icon>
        <Text fontSize={24} >New update on ticket #345654</Text>
      </Flex>

      <Divider borderColor="gray.100" />

      <Flex gap={3} alignItems={'center'}>
        <Icon fontSize={'25px'} color='#BB86FC'><MdExposurePlus1 /></Icon>
        <Text fontSize={24}>New update on ticket #284456</Text>
      </Flex>
  
    </Flex>
  </Box>
  );
};
