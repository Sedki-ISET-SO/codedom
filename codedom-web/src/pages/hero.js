import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';

export default function CodedomCallToAction() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Code management{' '}
          <Text as={'span'} color={'purple.500'}>
            made easy
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Design, develop, and securely manage your code. Keep track of your
          codebase and collaborate easily on a fully featured, scalable, and
          private code management solution. Collaborate on open-source projects.
          Get Paid for coding.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            color={'white'}
            colorScheme={'purple'}
            bg={'purple.500'}
            _hover={{ bg: 'purple.600' }}
          >
            Get started
          </Button>
          <Button rounded={'full'} px={6}>
            Learn more
          </Button>
        </Stack>
        <Flex w={'full'}>
          <Illustration
            height={{ sm: '24rem', lg: '28rem' }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
}

export const Illustration = props => {
  return (
    <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
      <img src="Saly.png" alt="Saly is a developer having fun" />
    </div>
  );
};
