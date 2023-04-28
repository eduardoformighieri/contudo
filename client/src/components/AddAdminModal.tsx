import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { MdAdd, MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { useMutation, useQuery } from 'react-query';
import { createAdmin } from '../api/admins';
import { getAllAdminRoles } from '../api/getDataForSelect';
import { queryClient } from '../main';
import { setToken } from '../utils/tokenStorage';

export const AddAdminModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [adminRoleId, setAdminRoleId] = useState('');

  const { data: adminRoles } = useQuery<any, Error>(['admin-roles'], () =>
    getAllAdminRoles()
  );

  useEffect(() => {
    if (adminRoles?.length > 0) {
      setAdminRoleId(adminRoles[0]?.id);
    }
  }, [adminRoles]);

  const { mutate } = useMutation(
    () => createAdmin({ email, name, roleId: adminRoleId }),
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
          title: 'Admin created',
          position: 'top-right',
          isClosable: true,
          status: 'success',
        });
        onClose();
        queryClient.invalidateQueries(['adminsTable']);
      },
    }
  );

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<MdAdd />}
        size="md"
        w={'120px'}
        bg="purple.300"
        variant="solid"
        _hover={{
          background: '#9759e3',
        }}>
        Add user
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#121212">
          <ModalHeader color="white">Add user</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Box color={'white'}>
              <Stack spacing={6}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdPerson color="gray.300" />}
                    marginTop={'4px'}
                  />
                  <Input
                    value={name}
                    onChange={(event: any) => setName(event.target.value)}
                    type="text"
                    h={'48px'}
                    size="lg"
                    w={'350px'}
                    placeholder="Name"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdEmail color="gray.300" />}
                    marginTop={'4px'}
                  />
                  <Input
                    value={email}
                    onChange={(event: any) => setEmail(event.target.value)}
                    type="email"
                    h={'48px'}
                    size="lg"
                    w={'350px'}
                    placeholder="Email"
                  />
                </InputGroup>
                <Select
                  w={'350px'}
                  value={adminRoleId}
                  onChange={(event: any) => setAdminRoleId(event.target.value)}>
                  {!!adminRoles &&
                    adminRoles.map((adminRole: any) => (
                      <option
                        key={adminRole.id}
                        value={adminRole.id}
                        style={{ background: 'black' }}>
                        {adminRole.name}
                      </option>
                    ))}
                </Select>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => mutate()}
              bg="#BB86FC"
              size="lg"
              w={'150px'}
              variant="solid"
              marginRight={10}
              _hover={{
                background: '#9759e3',
              }}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
