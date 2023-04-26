import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { RootRoutes } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
