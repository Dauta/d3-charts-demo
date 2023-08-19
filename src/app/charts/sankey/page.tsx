'use client';

import { Box, Heading } from '@chakra-ui/react';
import { Sankey } from '@/components/charts/sankey/Sankey';
import { data } from '@/components/charts/sankey/data';

export default function SankeyPage() {
  return (
    <>
      <Heading as="h2" size="lg" fontWeight="semibold" width="100%">
        Sankey
      </Heading>
      <Box flex={1} width="100%">
        <Sankey data={data} />
      </Box>
    </>
  );
}
