import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import AllRepositories from '../../repository/all-repositories/all-repositories'
import NavBar from '../../../components/NavBar';

export default function CharkaAllRepositories() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <AllRepositories />
    </ChakraProvider>
  );
}