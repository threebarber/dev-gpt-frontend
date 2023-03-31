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

import MainTitle from './components/MainTitle';
import SnippetForm from './components/SnippetForm';
import RecentSnippets from './components/RecentSnippets';


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
        <RecentSnippets/>
      </ChakraProvider>
    
  );
}

export default App;
