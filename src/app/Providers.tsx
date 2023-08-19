'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Text: {
      color: '#fcfcfc',
    },
    Heading: {
      color: '#fcfcfc',
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
