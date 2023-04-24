import { Box, Divider, Flex, Text } from '@chakra-ui/react';


export const ReportDetailEmployee = () => {
  return (
      <Box bg='#121212' borderRadius="8px" h={'420px'} w={'100%'}>
        <Text px={6} py={4}>Report detail</Text>
        <Divider borderColor="gray.100" />
        <Flex flexDirection="column" gap={8} p={6}>
          <Box>
            <Text color="#BB86FC">Status</Text>
            <Text>
              Open
            </Text>
          </Box>
          <Box>
            <Text color="#BB86FC">Requester</Text>
            <Text>Anonym</Text>
          </Box>
          <Box>
            <Text color="#BB86FC">Category</Text>
            <Text>Suspicion of Theft, Corruption or Embezzlement</Text>
          </Box>
          <Box>
            <Text color="#BB86FC">More information</Text>
            <Text>
              I have a suspicion of ongoing bribery. I witnessed a weird
              conversation between our meat supplier and the warehouse manager. I
              saw them exchange cash and look around carefully.
            </Text>
          </Box>
        </Flex>
      </Box>
  );
};
