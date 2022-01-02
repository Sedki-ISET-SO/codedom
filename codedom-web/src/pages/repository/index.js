import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import CreateRepositoryForm from './create-repository';
import NavBar from '../../components/NavBar';

export default function CharkaCreateRepositoryFrom() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <CreateRepositoryForm />
    </ChakraProvider>
  );
}
