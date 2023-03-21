import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';

type ReportDetailProps = {
  title: string;
  loading?: boolean; // ? indica que a propriedade é opcional
};

export const ReportDetail = ({ title, loading = true }: ReportDetailProps) => {
  return (
    <Box bg="gray.400" borderRadius="8px">
      <Text px={6} py={4}>
        Report detail
      </Text>
      <Divider borderColor="gray.100" />
      <Flex flexDirection="column" gap={8} p={6}>
        <Box>
          <Text color="red">Sender</Text>
          <Text>Anonym</Text>
        </Box>
        <Box>
          <Text color="red">Category</Text>
          <Text>Suspicion of Theft, Corruption or Embezzlement</Text>
        </Box>
        <Box>
          <Text color="red">More information</Text>
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
