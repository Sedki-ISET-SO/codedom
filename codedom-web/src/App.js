import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import NavBar from './components/NavBar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="top" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <NavBar />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
