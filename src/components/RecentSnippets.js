import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Button,
  Center,
  Code,
  Flex,
  Table,
  Tr,
  Th,
  Thead,
  Td,
  Tfoot,
  TableContainer,
  Tbody,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';



import axios from 'axios';

const RecentSnippets = () => {
  const loadPrompts = async () => {
    const promptResponse = await axios.get('/api/prompts');
    setRecentPrompts(promptResponse.data);
  };

  const [recentPrompts, setRecentPrompts] = useState([]);

  useEffect(() => {
    loadPrompts();
  }, []);

  console.log();
  return (
    <Center>
      <VStack>
        <Box>
          <Heading size="md">Recent Snippets 👀</Heading>
        </Box>
        <Box border="2px" w="100%">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Snippet</Th>
                  <Th>Analysis</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentPrompts.map(prompt => (
                  <Tr>
                    <Td><Code>{prompt.promptText}</Code></Td>
                    <Td>{prompt.promptAnswer}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Center>
  );
};

export default RecentSnippets;
