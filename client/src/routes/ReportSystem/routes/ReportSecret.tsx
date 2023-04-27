import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

export const ReportSecret = () => {
  const { secretKey } = useParams<{ secretKey: string }>();
  const navigate = useNavigate();
  return (
    <Flex
      bg={'black'}
      color={'white'}
      width={'100vw'}
      height={'100vh'}
      alignContent={'center'}
      justifyContent={'center'}>
      <Center>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          textAlign={'center'}>
          <Text mb={4} fontSize={25} fontWeight={'700'} as={'b'}>
            Thank you!
          </Text>
          <Text mb={7} fontSize={16}>
            We will investigate this report and be in touch with you in the
            ticket below.
          </Text>
          <Flex
            flexDirection={'column'}
            gap={7}
            mb={10}
            alignItems={'center'}
            justifyContent={'center'}
            w={'450px'}
            bg={'#121212'}
            p={10}
            borderRadius={5}>
            <Box border="1px" w={'350px'} borderRadius={5}>
              <Text color={'#BB86FC'} fontSize={32} p={3}>
                {secretKey}
              </Text>
            </Box>
            <Text fontSize={16}>
              Please, make sure to save the ticket number for future references,
              this is the only way you can review this report at a later date.
            </Text>
          </Flex>
          <Button
            onClick={() => navigate(-1)}
            size="lg"
            w={'350px'}
            bg="#BB86FC"
            variant="solid"
            _hover={{
              background: '#9759e3',
            }}>
            Back
          </Button>
        </Flex>
      </Center>
    </Flex>
  );
};
