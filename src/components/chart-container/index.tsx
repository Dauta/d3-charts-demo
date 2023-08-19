'use client';

import { VStack } from '@chakra-ui/react';

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack
      height="100%"
      maxHeight="75svh"
      width="100%"
      borderRadius="md"
      border="1px solid white"
      gap={8}
      backgroundColor="blackAlpha.600"
      padding={4}
    >
      {children}
    </VStack>
  );
};
