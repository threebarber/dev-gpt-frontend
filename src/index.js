import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ColorModeScript, ChakraProvider, extendTheme } from '@chakra-ui/react';

import theme from './theme';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
const customTheme = extendTheme({ config });

root.render(
  
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>
);
