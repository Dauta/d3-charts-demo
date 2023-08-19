'use client';

import {
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Link,
  Box,
  Icon,
} from '@chakra-ui/react';
import { FiActivity, FiMap, FiFramer } from 'react-icons/fi';
import { TbBrandD3 } from 'react-icons/tb';
import { BiLogoReact } from 'react-icons/bi';
import NextLink from 'next/link';

export default function Home() {
  return (
    <>
      <VStack gap={2} alignItems="flex-start" width="100%" paddingTop={4}>
        <Text marginBottom={2} fontSize={20} fontWeight="semibold">
          Greetings! 👋
        </Text>
        <Text>
          This is{' '}
          <Link href="https://github.com/dauta" color="blue.200">
            my
          </Link>{' '}
          attempt at creating interactive charts using{' '}
          <Link href="https://d3js.org" color="blue.200">
            d3{' '}
            <Icon as={TbBrandD3} p={0} color="orange.300" marginBottom="-2px" />
          </Link>{' '}
          and{' '}
          <Link href="https://react.dev" color="blue.200">
            React <Icon as={BiLogoReact} color="blue.400" marginBottom="-3px" />
          </Link>{' '}
        </Text>
        <Text>
          Charts are animated using{' '}
          <Link href="https://www.framer.com/motion/" color="blue.200">
            Framer Motion{' '}
            <Icon as={FiFramer} color="pink.400" marginBottom="-3px" />
          </Link>
        </Text>
        <Text>I will keep adding more chart types in the future. Enjoy 🚀</Text>

        <Box as="section" marginTop={8}>
          <Text marginBottom={4} fontSize={20} fontWeight="semibold">
            Charts
          </Text>
          <List spacing={2}>
            <ListItem>
              <ListIcon as={FiActivity} color="green.500" />
              <Link as={NextLink} href="/charts/sankey" color="blue.200">
                Sankey
              </Link>
            </ListItem>
            <ListItem>
              <Text>
                <ListIcon as={FiMap} color="green.500" />
                <Link as={NextLink} href="/charts/choropleth" color="blue.200">
                  Choropleth
                </Link>
              </Text>
            </ListItem>
          </List>
        </Box>
      </VStack>
    </>
  );
}
