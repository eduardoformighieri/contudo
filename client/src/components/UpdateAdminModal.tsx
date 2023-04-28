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
import { useState, useEffect } from 'react';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { useMutation, useQuery } from 'react-query';
import { switchAdminRole, updateOtherAdmin } from '../api/admins';
import { getAllAdminRoles } from '../api/getDataForSelect';
import { queryClient } from '../main';

export const UpdateAdminModal = ({ admin }: { admin: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [name, setName] = useState(admin.name);
  const [email, setEmail] = useState(admin.email);

  const [adminRoleId, setAdminRoleId] = useState('');

  const { data: adminRoles } = useQuery<any, Error>(['admin-roles'], () =>
    getAllAdminRoles()
  );

  useEffect(() => {
    if (adminRoles?.length > 0) {
      setAdminRoleId(adminRoles[0]?.id);
    }
  }, [adminRoles]);

  const { mutate: mutateUpdateAdmin } = useMutation(
    () =>
      updateOtherAdmin(admin.id, {
        ...(email === admin?.email ? {} : { email }),
        ...(name === admin?.name ? {} : { name }),
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
          title: 'Admin UPDATED',
          position: 'top-right',
          isClosable: true,
          status: 'success',
        });
        onClose();
        queryClient.invalidateQueries(['adminsTable']);
      },
    }
  );

  const { mutate: mutateAdminRole } = useMutation(
    () =>
      switchAdminRole({
        adminId: admin.id,
        roleId: adminRoleId,
      }),
    {
      onError: () => {},
      onSuccess: (data) => {
        onClose();
        queryClient.invalidateQueries(['adminsTable']);
      },
    }
  );

  return (
    <>
      <Box w="100%" textAlign="left" as="button" onClick={onOpen}>
        Edit
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#121212">
          <ModalHeader color="white">Edit user</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={10}>
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
                    w="100%"
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
                    w="100%"
                    placeholder="Email"
                  />
                </InputGroup>
              </Stack>
              <Flex justify="space-between" mt={4} mb={6}>
                <Button
                  _hover={{ color: 'purple.400' }}
                  mr={4}
                  colorScheme="purple"
                  variant="ghost">
                  Reset password
                </Button>
                <Button
                  onClick={() => mutateUpdateAdmin()}
                  colorScheme="purple"
                  variant="solid">
                  Save changes
                </Button>
              </Flex>

              <Select
                mt={20}
                w="100%"
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
              <Button
                mt={4}
                w="100%"
                onClick={() => mutateAdminRole()}
                colorScheme="purple"
                variant="solid">
                Update Admin role
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
