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
} from '@chakra-ui/react';
import { MdAdd, MdEmail, MdLock, MdPerson } from 'react-icons/md';

export const AddAdminModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                    type="email"
                    h={'48px'}
                    size="lg"
                    w={'350px'}
                    placeholder="Email"
                  />
                </InputGroup>
              </Stack>
              <Select
                placeholder="Select"
                h={'48px'}
                size="lg"
                w={'350px'}
                mt={6}>
                <option value="option1">Manager</option>
                <option value="option2">Admin</option>
                <option value="option3">Lixo</option>
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#BB86FC"
              size="lg"
              w={'150px'}
              variant="solid"
              marginRight={10}
              _hover={{
                background: '#9759e3',
              }}>
              Save changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
