'use client';

import { Heading, VStack, Link, Box, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { RiHomeFill } from 'react-icons/ri';

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack
      padding={8}
      width="100%"
      maxWidth="960px"
      height="100%"
      overflow="hidden"
      justifyContent="center"
      alignItems="center"
      gap={16}
    >
      <Box width="100%" paddingTop={12}>
        <Link as={NextLink} href="/">
          <Heading>
            <Icon
              as={RiHomeFill}
              p={0}
              color="white"
              marginBottom={-1}
              marginRight={2}
            />
            D3 Charts Demo
          </Heading>
        </Link>
      </Box>
      <VStack flex="1" width="100%">
        {children}
      </VStack>
    </VStack>
  );
};
