import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import FilesUploadManager from './file-upload-manager';
import NavBar from '../../../../components/NavBar';

export default function CharkaFilesUploadManager() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <FilesUploadManager />
    </ChakraProvider>
  );
}