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
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../api/getDataForSelect';
import { createReport } from '../api/reports';

export const CreateReportForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [identity, setIdentity] = useState('');
  const [title, setTitle] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentUrls, setAttachmentUrls] = useState([]);
  //TODO: FILE UPLOAD
  const { isLoading, mutate } = useMutation(
    () =>
      createReport({
        guest_identity: isAnonymous ? 'Anonymous' : identity,
        title,
        categoryId: `${category}`,
        description,
      }),
    {
      onError: (error: AxiosError<{ message: string }>) => {
        if (error?.response?.data?.message) {
          toast({
            title: error.response.data.message,
            position: 'top-right',
            isClosable: true,
            status: 'error',
          });
        } else {
          toast({
            title: 'Unknown error',
            position: 'top-right',
            isClosable: true,
            status: 'error',
          });
        }
      },
      onSuccess: (data) => {
        toast({
          title: 'Success',
          position: 'top-right',
          isClosable: true,
          status: 'success',
        });
        console.log(data);
        navigate(`/report-system/report-secret/${data?.secretReportKey}`);
      },
    }
  );
  console.log(category);

  const handleSubmit = () => {
    mutate();
  };

  const { data: categories, isFetching: isFetchingCategories } = useQuery<
    any,
    Error
  >(['report-categories'], () => getAllCategories());

  useEffect(() => {
    setCategory(categories[0].id);
  }, [categories]);

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
                <Input
                  isDisabled={isAnonymous}
                  value={identity}
                  onChange={(event: any) => setIdentity(event.target.value)}
                  type="text"
                  mb={3}
                />
                <Checkbox
                  isChecked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  size="md"
                  colorScheme="purple">
                  Anonymous?
                </Checkbox>
              </Box>
              <Box>
                <FormLabel>Choose a title for your report</FormLabel>
                <Input
                  value={title}
                  onChange={(event: any) => setTitle(event.target.value)}
                  type="text"
                  mb={3}
                />
              </Box>
              <Box>
                <FormLabel>Category</FormLabel>
                <Select
                  value={category}
                  onChange={(event: any) => setCategory(event.target.value)}>
                  {!!categories &&
                    categories.map((category: any) => (
                      <option
                        id={category.id}
                        value={category.id}
                        style={{ background: 'black' }}>
                        {category.name}
                      </option>
                    ))}
                </Select>
              </Box>

              <Flex flexDirection={'column'}>
                <Text fontWeight={'600'}> Description</Text>
                <Textarea
                  value={description}
                  onChange={(event: any) => setDescription(event.target.value)}
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
                  onClick={handleSubmit}
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
