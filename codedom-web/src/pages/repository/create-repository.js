import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Switch,
  Textarea,
  Stack,
  Text,
  Box,
  FormHelperText,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import axiosInstance from '../../utils/axiosConfig';

export default function CreateRepositoryForm() {
  const initialData = {
    name: '',
    description: '',
    is_visible: false,
  };

  const [repository, setRepository] = useState(initialData);

  function onInputChange(event) {
    let { name, value } = event.target;

    setRepository({ ...repository, [name]: value });
  }

  const isError = repository.name === '';

  let isSwitched = false;

  let isSubmitted = false;

  function handleSubmit(event) {
    event.preventDefault();

    isSubmitted = true;

    axiosInstance
      .post('/repo', {
        name: repository.name,
        description: repository.description,
        is_visible: repository.is_visible,
      })
      .then(response => {
        console.log(response.data);
      })
      .then(
        setTimeout(() => {
          console.log('created successfully', repository);
        }, 1000)
      )
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Ready to create a new repository?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          A repository contains all project files, including the revision
          history
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={isError} isRequired>
            <Box mt={4}>
              <Text as="i" color={useColorModeValue('gray.800', 'gray.400')}>
                Great repository names are short and memorable
              </Text>
              <Input
                placeholder="super-guide"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                name="name"
                minLength={3}
                mt={2}
                value={repository.name}
                onChange={onInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the name you'd like to reserve for your repository
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  Repository name is required.
                </FormErrorMessage>
              )}
            </Box>
          </FormControl>

          <FormControl>
            <Box mt={4} style={{ opacity: 0.6 }}>
              <Text as="i" color={useColorModeValue('gray.800', 'gray.400')}>
                The description of a repo tells the public what is contained in
                the repo itself
              </Text>
              <Textarea
                placeholder="Here is a sample placeholder"
                name="description"
                mt={2}
                value={repository.description || ''}
                onChange={onInputChange}
              />
            </Box>
          </FormControl>

          <FormControl isRequired>
            <Box mt={6}>
              <Text as="i" color={useColorModeValue('gray.800', 'gray.400')}>
                Set repository visiblity to public?
              </Text>
              <Switch
                id="searchTxt"
                name="is_visible"
                marginLeft={2}
                colorScheme={'telegram'}
                defaultChecked={false}
                value={isSwitched}
                onChange={() => {isSwitched = !isSwitched; repository.is_visible = isSwitched;}}
              />
            </Box>
          </FormControl>

          <Stack spacing={6}>
            <Button
              type="submit"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              marginTop={4}
              isLoading={isSubmitted}
              loadingText="Submitting"
            >
              Create Repository
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
