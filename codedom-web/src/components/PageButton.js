import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';

export default function PagButton(props) {
  const activeStyle = {
    bg: useColorModeValue('purple.500', 'purple.500'),
    color: useColorModeValue('white', 'gray.200'),
  };
  return (
    <Button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      opacity={props.disabled && 0.6}
      _hover={!props.disabled && activeStyle}
      cursor={props.disabled && 'not-allowed'}
      {...(props.active && activeStyle)}
      display={props.p && !props.active && { base: 'none', sm: 'block' }}
    >
      {props.children}
    </Button>
  );
}

