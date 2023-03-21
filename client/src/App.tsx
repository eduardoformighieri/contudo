import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './routes/Home';

export function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}
