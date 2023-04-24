import { Box } from "@chakra-ui/react"
import { List } from '@chakra-ui/react'

import { IconButton } from '@chakra-ui/react'
import { MdSpaceDashboard, MdHome, MdPerson, MdOutlineVerticalShadesClosed } from "react-icons/md";

// The default icon size is 1em (16px)

export const Nav = () => {
  return (
    <Box bg='#121212' w={'60px'} h={'100vh'} display='flex' flexDirection={"column"} >
        <IconButton
          colorScheme=''
          aria-label=''
          fontSize={'25px'}
          icon={<MdOutlineVerticalShadesClosed />}
          marginBottom={7}
          mt={4}
        />
        <List spacing={6} display='flex' flexDirection={"column"}>
          <IconButton
            colorScheme='gray.700'
            aria-label='Search database'
            icon={<MdHome />}
            fontSize={'25px'}
            _hover={{
              color: "#BB86FC",
            }}
          />
          <IconButton
            colorScheme='gray.700'
            aria-label='Search database'
            icon={<MdSpaceDashboard />}
            fontSize={'25px'}
            _hover={{
              color: "#BB86FC",
            }}
          />
          <IconButton
            colorScheme='gray.700'
            aria-label='Search database'
            icon={<MdPerson />}
            fontSize={'25px'}
            _hover={{
              color: "#BB86FC",
            }}
          />
        </List>
    </Box>
  )
}