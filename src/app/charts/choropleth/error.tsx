'use client';

import NextLink from 'next/link';
import { Link, Stack, Text } from '@chakra-ui/react';

export default function Error() {
  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      <Text>Something went wrong 🤷</Text>
      <Link as={NextLink} href="/">
        Back to home
      </Link>
    </Stack>
  );
}
