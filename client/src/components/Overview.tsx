import { Box, Divider, Flex, Text, Icon } from '@chakra-ui/react';

import { MdNewReleases } from "react-icons/md";
import { HiMinusCircle } from "react-icons/hi";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";


export const Overview = () => {
  return (
    <Box bg='#121212'  borderRadius="8px" h={'350px'} w={'1200px'}>
    <Text px={6} py={4}>Overview</Text>
    <Divider borderColor="white" />
    <Flex flexDirection="column" gap={50} p={6}>
      <Flex gap={3} alignItems={'center'}>
      <Icon fontSize={'25px'} color='#BB86FC'><MdNewReleases /></Icon>
        <Text fontSize={24} >2 New Tickets</Text>
      </Flex>
      <Flex gap={3} alignItems={'center'}>
      <Icon fontSize={'25px'} color='#BB86FC'><HiMinusCircle/></Icon>
        <Text fontSize={24} >4 Open Tickets</Text>
      </Flex>
      <Flex gap={3} alignItems={'center'}>
        <Icon fontSize={'25px'} color='#BB86FC' ><IoCheckmarkDoneCircleSharp/></Icon>
        <Text fontSize={24} >13 Solved Tickets</Text>
      </Flex>
    </Flex>
  </Box>
  );
};
