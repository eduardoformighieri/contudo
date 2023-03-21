import { Box, Flex } from '@chakra-ui/react';
import { ReportDetail } from '../components/ReportDetail';
import { ReportTable } from '../components/ReportTable';

export const Home = () => {
  return (
    <Box>
      <ReportTable />
      <ReportDetail title="Meu titulo" loading={false} />
    </Box>
  );
};
