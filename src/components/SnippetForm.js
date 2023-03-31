import React from 'react';
import {
  Box,
  VStack,
  Heading,
  SimpleGrid,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Button,
  Center,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  Flex,
} from '@chakra-ui/react';

import { useState } from 'react';

import { sendQuery } from '../services.js/api';

const SnippetForm = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(undefined);
  const [info, setInfo] = useState('');

  const handlePromptSubmit = async event => {
    event.preventDefault();
    console.log(`Submitting prompt: ${prompt}`);
    console.log(prompt.length);
    if (prompt.length <= 150 && prompt.length > 2) {
      try {
        setLoading(true);
        setInfo('');
        setAnswer(undefined);
        const answerResponse = await sendQuery(prompt);
        setAnswer(answerResponse.message);
        console.log(answerResponse);
      } catch (err) {
        console.log(err);
        setInfo(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Snippet too long/short');
      setInfo('Code snippet too long/short');
      return;
    }
  };

  let handleInputChange = e => {
    let inputValue = e.target.value;
    setPrompt(inputValue);
    console.log(prompt);
  };

  return (
    <Center>
      <Box align="center" width="40%" p="20px">
        <SimpleGrid p="20px" minChildWidth="120px" spacing="40px">
          <Box borderRadius="lg" borderWidth="2px" p="20px">
            <VStack>
              <Textarea
                maxLength="150"
                name="promptText"
                height="300px"
                width="80%"
                isRequired
                placeholder="Input a short code snippet here..."
                size="lg"
                onChange={handleInputChange}
              ></Textarea>

              <Button
                isLoading={loading}
                loadingText="Loading..."
                onClick={handlePromptSubmit}
                variant="outline"
              >
                Submit
              </Button>

              <Card w="100%">
                <CardHeader>
                  <Heading size="md">Code Analysis 👇 </Heading>
                </CardHeader>
                <CardBody>
                  {answer !== undefined && (
                    <Tag
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                    >
                      <TagLabel>{answer}</TagLabel>
                    </Tag>
                  )}

                  {info !== '' ? (
                    <Tag borderRadius="full" variant="solid" colorScheme="red">
                      <TagLabel>{info}</TagLabel>
                    </Tag>
                  ) : null}
                  <Flex justify="space-between">
                    <Text>
                    <a  target="blank" href='https://github.com/threebarber/dev-gpt-frontend'><svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                    </Text>
                  <Text display="inline">
                    <Tooltip label="Please note functionality is intentionally limited and may not be working at all times due to the cost of using the OpenAI API" aria-label="A tooltip">
                      ❔
                    </Tooltip>
                  </Text>
                  </Flex>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </Center>
  );
};

export default SnippetForm;
