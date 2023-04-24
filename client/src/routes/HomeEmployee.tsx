import { Button, Center, Flex, Text, Input } from '@chakra-ui/react';
import { MdLibraryAdd, MdCheckCircle } from 'react-icons/md';




export const HomeEmployee = () => {
  return (
    <Flex bg={'black'} color={'white'} width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Center>
        <Flex flexDirection={'column'} alignItems={'center'}  textAlign={'center'} w={'550px'} gap={8}>
          <Text mb={5} fontSize={30} fontWeight={'700'} as={'b'}>
            Welcome to Contudo
          </Text>
          <Text>
          Do you suspect unethical behaviour in our organisation or want to send us any feedback? Use our whistleblowing channel.
          </Text>
          <Text>
          Our company values ethical behavior and mutual respect. In case you witness unethical behavior that is difficult to discuss personally, we have established a whistleblowing channel. Through this channel, you can safely send reports of illegal or unethical behavior, improvement suggestions, questions, or any feedback.
          </Text>
          <Text>
          We would be happy if you stay in touch with us, whether you remain anonymous or provide your name. You can withdraw from anonymity at any time. We may ask for more information and also inform you of the resolution of your report. So, safely save the key to your report, which will be displayed after sending the report. You can return to the report at any time with this key.
          </Text>
          <Flex flexDirection={'column'} gap={10} mb={10} alignItems={'center'}>
          <Flex gap={10}>
            <Input h={'48px'} size='lg'  w={'350px'} placeholder='Search for ticket #'></Input>
            <Button size='lg' w={'350px'} leftIcon={<MdCheckCircle />} bg='#BB86FC' variant='solid'_hover={{
              background: "#9759e3",
              }}>Check report</ Button>
          </Flex>
            <Button size='lg' w={'100%'} leftIcon={<MdLibraryAdd />} bg='#BB86FC' variant='solid' _hover={{
              background: "#9759e3",
              }}>Create report</Button>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
};
