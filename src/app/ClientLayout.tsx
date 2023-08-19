'use client';

import { Heading, VStack, Link, Box } from '@chakra-ui/react';
import NextLink from 'next/link';

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack
      padding={8}
      width="100vw"
      height="100svh"
      overflow="hidden"
      justifyContent="center"
      alignItems="center"
      gap={16}
    >
      <Box width="100%">
        <Link as={NextLink} display="block" href="/">
          <Heading>D3 Charts</Heading>
        </Link>
      </Box>
      <VStack flex="1" width="100%">
        {children}
      </VStack>
    </VStack>
  );
};
