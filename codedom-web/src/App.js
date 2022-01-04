import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import NavBar from './components/NavBar';
import CodedomCallToAction from './pages/hero';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="top" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <NavBar />
          <CodedomCallToAction />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
