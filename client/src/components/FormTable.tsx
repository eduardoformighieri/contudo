import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Input,
  Center,
  Select,
  Box,
  Textarea,
  Text,
  Button,
  Spacer,
  Checkbox,
} from '@chakra-ui/react';

export const FormTable = () => {
  return (
    <Flex
      bg="#121212"
      color={'white'}
      width={'100vw'}
      height={'100vh'}
      alignContent={'center'}
      justifyContent={'center'}>
      <Center>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={'2xl'} mb={10} as={'b'}>
            New Report
          </Text>
          <FormControl>
            <Flex
              flexDirection={'column'}
              gap={6}
              border="1px"
              borderColor="gray.200"
              borderRadius={'5px'}
              p={10}
              w={'600px'}>
              <Box>
                <FormLabel>First and last name</FormLabel>
                <Input type="text" mb={3}></Input>
                <Checkbox size="md" colorScheme="purple">
                  Anonymous?
                </Checkbox>
              </Box>
              <Box>
                <FormLabel>Category</FormLabel>
                <Select placeholder="-">
                  <option>Bullying</option>
                  <option>Discrimination</option>
                </Select>
              </Box>

              <Flex flexDirection={'column'}>
                <Text fontWeight={'600'}> Description</Text>
                <Textarea
                  placeholder="Write more information about your report"
                  resize={'none'}
                  mt={2}
                />
                <Box ml={'310px'}>
                  <Input type="file" width={'250px'} variant="unstyled"></Input>
                </Box>
              </Flex>

              <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Button
                  mt={4}
                  bg="#CF6679"
                  w={'240px'}
                  _hover={{
                    background: '#c43952',
                  }}>
                  Cancel
                </Button>
                <Spacer />
                <Button
                  mt={4}
                  bg="purple.300"
                  type="submit"
                  w={'240px'}
                  _hover={{
                    background: '#9759e3',
                  }}>
                  Submit
                </Button>
              </Flex>
            </Flex>
          </FormControl>
        </Flex>
      </Center>
    </Flex>
  );
};
