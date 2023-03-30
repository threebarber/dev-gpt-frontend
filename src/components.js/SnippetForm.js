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
    if (prompt.length <= 150) {
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
      console.log('Snippet too long');
      setInfo('Please try a shorter code snippet...');
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
          <Box borderRadius="lg" borderWidth="2px">
            <VStack>
              <Textarea
                maxLength="150"
                name="promptText"
                height="300px"
                width="100%"
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
                  <Text align="end">
                    <Tooltip label="Please note functionality is intentionally limited and may not be working at all times due to the cost of using the OpenAI API" aria-label="A tooltip">
                      ❔
                    </Tooltip>
                  </Text>
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
