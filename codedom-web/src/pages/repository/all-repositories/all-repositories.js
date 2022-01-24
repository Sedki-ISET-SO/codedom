import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosConfig';
import {
  chakra,
  Heading,
  SimpleGrid,
  Box,
  Button,
  Flex,
  Text,
  Icon,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { MdFileDownload, MdUpdate } from 'react-icons/md';
import { BsShieldLock, BsPower, BsFolder } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import PagButton from '../../../components/PageButton';

export default function AllRepositories() {
  const [repositories, setRepositories] = useState([]);

  let navigate = useNavigate();

  let bgColor = useColorModeValue('white', 'gray.900');
  let h1Color = useColorModeValue('gray.800', 'white');
  let flexColor = useColorModeValue('gray.700', 'gray.200');
  let textColor = useColorModeValue('gray.800', 'gray.400');

  useEffect(() => {
    axiosInstance
      .get('/repos')
      .then(response => {
        console.log(response.data.content);
        setRepositories(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <section>
      <Flex
        boxSize="full"
        h="100vh"
        pos="absolute"
        p={30}
        justifyContent="center"
      >
        <AutoComplete rollNavigation>
          <AutoCompleteInput
            variant="filled"
            placeholder="Search..."
            autoFocus
          />
          <AutoCompleteList>
            {repositories.map((repository, rid) => (
              <AutoCompleteItem
                key={`option-${rid}`}
                value={repository.name}
                textTransform="capitalize"
              >
                {repository.name}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </Flex>
      <SimpleGrid
        pt={100}
        columns={3}
        minChildWidth="400px"
        spacing={5}
        alignItems="center"
        justifyItems="center"
      >
        {repositories ? (
          repositories.map(repository => (
            <Box
              w="sm"
              mx="1px"
              bg={bgColor}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              key={repository.id}
            >
              <Box py={4} px={6}>
                <chakra.h1 fontSize="xl" fontWeight="bold" color={h1Color}>
                  <Tooltip
                    label={
                      repository.description !== null
                        ? repository.description
                        : 'No Description Provided'
                    }
                    fontSize="md"
                  >
                    <Button
                      px={6}
                      colorScheme={'purple'}
                      color={'white'}
                      bg={'purple.500'}
                      _hover={{ bg: 'purple.400' }}
                      variant="solid"
                      onClick={() => {
                        navigate(`/repos/${repository.id}`);
                      }}
                    >
                      {repository.name}
                    </Button>
                  </Tooltip>
                </chakra.h1>

                <Flex alignItems="center" mt={4} color={flexColor}>
                  <Tooltip label="Creation Date" fontSize="md">
                    <span>
                      <Icon as={BsPower} h={6} w={6} mr={2} />
                    </span>
                  </Tooltip>

                  <chakra.h1 px={2} fontSize="sm">
                    <Text as="i" color={textColor}>
                      {repository.createdAt}
                    </Text>
                  </chakra.h1>
                </Flex>

                <Flex alignItems="center" mt={4} color={flexColor}>
                  <Tooltip label="Last Update Date" fontSize="md">
                    <span>
                      <Icon as={MdUpdate} h={6} w={6} mr={2} />
                    </span>
                  </Tooltip>

                  <chakra.h1 px={2} fontSize="sm">
                    <Text as="i" color={textColor}>
                      {repository.updatedAt}
                    </Text>
                  </chakra.h1>
                </Flex>

                <Flex alignItems="center" mt={4} color={flexColor}>
                  <Tooltip label="Visiblity" fontSize="md">
                    <span>
                      <Icon as={BsShieldLock} h={6} w={6} mr={2} />
                    </span>
                  </Tooltip>

                  <chakra.h1 px={2} fontSize="sm">
                    {repository.is_visible ? (
                      <Text as="i" color={textColor}>
                        Public
                      </Text>
                    ) : (
                      <Text as="i" color={textColor}>
                        Private
                      </Text>
                    )}
                  </chakra.h1>
                </Flex>

                <Flex alignItems="center" mt={4} color={flexColor}>
                  <Tooltip label="Size" fontSize="md">
                    <span>
                      <Icon as={BsFolder} h={6} w={6} mr={2} />
                    </span>
                  </Tooltip>

                  <chakra.h1 px={2} fontSize="sm">
                    <Text as="i" color={textColor}>
                      {repository.repositorySize}
                    </Text>
                    <Text as="i" color={textColor}>
                      {repository.repositorySize == null && <div>0.0 KB</div>}
                    </Text>
                  </chakra.h1>
                </Flex>

                <Flex alignItems="center" mt={4} color={flexColor}>
                  <Tooltip label="Downloads Number" fontSize="md">
                    <span>
                      <Icon as={MdFileDownload} h={6} w={6} mr={2} />
                    </span>
                  </Tooltip>

                  <chakra.h1 px={2} fontSize="sm">
                    <Text as="i" color={textColor}>
                      {repository.downloadsNumber}
                    </Text>
                    <Text as="i" color={textColor}>
                      {repository.downloadsNumber == null && <div>0</div>}
                    </Text>
                  </chakra.h1>
                </Flex>
              </Box>
            </Box>
          ))
        ) : (
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            0 Repositories have been created.
          </Heading>
        )}{' '}
      </SimpleGrid>
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Flex>
          <PagButton>
            <Icon
              as={IoIosArrowBack}
              color={useColorModeValue('gray.700', 'gray.200')}
              boxSize={4}
            />
          </PagButton>
          <PagButton p>1</PagButton>
          <PagButton p active>
            2
          </PagButton>
          <PagButton p>3</PagButton>
          <PagButton p>4</PagButton>
          <PagButton p>5</PagButton>
          <PagButton>
            <Icon
              as={IoIosArrowForward}
              color={useColorModeValue('gray.700', 'gray.200')}
              boxSize={4}
            />
          </PagButton>
        </Flex>
      </Flex>
    </section>
  );
}
