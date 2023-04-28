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
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';

export const UpdateAdminModal = ({ adminId }: { adminId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box as="button" onClick={onOpen}>
        Edit
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#121212">
          <ModalHeader color="white">Edit user</ModalHeader>
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
                    type="password"
                    h={'48px'}
                    size="lg"
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
                    placeholder="Email"
                  />
                </InputGroup>
              </Stack>
              <Select placeholder="Select" h={'48px'} size="lg" mt={6}>
                <option value="option1">Manager</option>
                <option value="option2">Admin</option>
                <option value="option3">Lixo</option>
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter mt={4}>
            <Button
              _hover={{ color: 'purple.400' }}
              mr={4}
              colorScheme="purple"
              variant="ghost">
              Reset password
            </Button>
            <Button colorScheme="purple" variant="solid">
              Save changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
