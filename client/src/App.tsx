import { ChakraProvider } from '@chakra-ui/react';
import { TicketEmployee } from './routes/TicketEmployee';

export function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <TicketEmployee/>
    </ChakraProvider>
  );
}
