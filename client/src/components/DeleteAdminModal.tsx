import {
  Box,
  Button,
  Divider,
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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';

export const DeleteAdminModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box as="button" onClick={onOpen}>
        Delete
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'#121212'}>
          <ModalHeader color={'white'}>Delete user</ModalHeader>
          <ModalCloseButton color={'white'} />
          <ModalBody>
            <Box color={'white'}>
              <Text fontSize={20}>
                Are you sure you want to delete this user?
              </Text>
              <Text fontSize={16}>This cannot be undone.</Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              color={'white'}
              bg="#ff0000cf"
              size="md"
              variant="solid"
              _hover={{
                background: '#ff0000',
              }}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
