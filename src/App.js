import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from '@chakra-ui/react';

import MainTitle from './components.js/MainTitle';
import SnippetForm from './components.js/SnippetForm';


// 1. import `ChakraProvider` component and `extendTheme`
import { extendTheme } from '@chakra-ui/react';

 const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };
  const customTheme = extendTheme({ config });

function App() {
 

  return (
    
      <ChakraProvider theme={customTheme}>
        <MainTitle />
        <SnippetForm />
      </ChakraProvider>
    
  );
}

export default App;
