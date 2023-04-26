import { Flex, Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';

import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  reportId?: string;
}

export const Header = ({ reportId }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <Flex bg="#121212" alignItems={'center'} textAlign={'center'} h={16}>
      <IconButton
        onClick={() => navigate(-1)}
        color="white"
        aria-label=""
        fontSize="28px"
        icon={<BsArrowLeft />}
        ml={30}
        _hover={{
          color: 'purple.300',
        }}
        bg="#121212"
      />
      <Text fontSize={'28px'} ml={5}>
        {reportId ?? '#165232'}
      </Text>
    </Flex>
  );
};
