'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

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
  return (
    <CacheProvider>
      <ChakraProvider theme={theme} resetCSS>
        <ColorModeScript initialColorMode="dark" />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
};
