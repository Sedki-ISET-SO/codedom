import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import NavBar from '../../../components/NavBar';
import RepositoryDetails from './repository-details';

export default function CharkaRepositoryDetails() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <RepositoryDetails />
    </ChakraProvider>
  );
}