import { Box, Divider, Flex, Text } from '@chakra-ui/react';


export const ReportInfoAdmin = () => {
  return (
    <Box bg='#121212'  borderRadius="8px" h={'830px'} w={'650px'} >
      <Text px={6} py={4}>
        Report information
      </Text>
      <Divider borderColor="gray.100" />
      <Flex flexDirection="column" gap={8} p={6}>
        <Box>
          <Text color="#BB86FC">Status</Text>
          <Text>Open</Text>
        </Box>
        <Box>
        <Text color="#BB86FC">Priority</Text>
        <Flex alignItems={'center'} textAlign={'center'}>
          <Text color={'#CF6679'}>High</Text>
        </Flex>
        </Box>
        <Divider borderColor="gray.100" />
        <Box>
          <Text color="#BB86FC">Date created</Text>
          <Text>March 29, 2023</Text>
        </Box>
        <Box>
          <Text color="#BB86FC">Last update</Text>
          <Text>April 01, 2023</Text>
        </Box>
        <Divider borderColor="gray.100" />
      </Flex>
    </Box>
  );
};
