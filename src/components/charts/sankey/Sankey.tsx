import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { Box, Tooltip, useToken } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { formatNumericValue } from '@/helpers';
import { useOnResize } from '@/hooks/useOnResize';

type DimensionValue = {
  value: string;
};

type MetricValue = {
  value: string;
};

type Row = {
  dimensionValues: DimensionValue[];
  metricValues: MetricValue[];
};

type Data = {
  rows: Row[];
};

type SankeyProps = {
  data: Data;
};

type SankeyNode = {
  name: string;
  index?: number;
};

type SankeyLink = {
  source: number;
  target: number;
  value: number;
};

type SankeyGraph = {
  nodes: SankeyNode[];
  links: SankeyLink[];
};

export const Sankey = ({ data }: SankeyProps) => {
  const { ref, width, height } = useOnResize<HTMLDivElement>();

  const colorTokens = useToken('colors', [
    'blue.400',
    'pink.400',
    'yellow.400',
    'orange.400',
    'blue.500',
    'purple.400',
    'cyan.500',
    'teal.500',
    'red.400',
  ]);

  const sankeyGenerator = sankey()
    .nodeWidth(16)
    .nodePadding(12)
    .size([width, height]);

  const colors = d3.scaleOrdinal(colorTokens);

  const nodes: SankeyNode[] = [];

  const nodesMap = new Map<string, number>();
  const linksMap = new Map<
    string,
    { source: number; target: number; value: number }
  >();

  data.rows.forEach((row) => {
    const sourceName = row.dimensionValues[1].value;
    const targetName = row.dimensionValues[2].value;
    const value = Number(row.metricValues[0].value);

    if (!nodesMap.has(sourceName)) {
      nodesMap.set(sourceName, nodes.length);
      nodes.push({ name: sourceName });
    }

    if (!nodesMap.has(targetName)) {
      nodesMap.set(targetName, nodes.length);
      nodes.push({ name: targetName });
    }

    const linkKey = `${nodesMap.get(sourceName)}->${nodesMap.get(targetName)}`;
    if (linksMap.has(linkKey)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      linksMap.get(linkKey)!.value += value;
    } else {
      linksMap.set(linkKey, {
        source: nodesMap.get(sourceName) as number,
        target: nodesMap.get(targetName) as number,
        value,
      });
    }
  });

  const graph: SankeyGraph = {
    nodes,
    links: Array.from(linksMap.values()), // Convert the links map to an array
  };

  const sankeyData = sankeyGenerator(graph);

  const maxNodeValue = Math.max(
    ...sankeyData.nodes.map((node) => node.value ?? 0)
  );

  return (
    <Box ref={ref} width="100%" height="100%" overflow="hidden">
      <svg width={width} height={height}>
        <defs>
          {sankeyData.links.map((link, i) => (
            <linearGradient
              key={i}
              id={`gradient-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor={colors((link.source as SankeyNode).name)}
              />
              <stop
                offset="100%"
                stopColor={colors((link.target as SankeyNode).name)}
              />
            </linearGradient>
          ))}
        </defs>

        {sankeyData.links.map((link, i) => {
          if (!link || !link.width) return null;

          const tooltipText = `${(link.source as SankeyNode).name} -> ${
            (link.target as SankeyNode).name
          }: ${formatNumericValue(link.value)}`;

          return (
            <Tooltip label={tooltipText} key={i} openDelay={200}>
              <motion.path
                d={sankeyLinkHorizontal()(link) ?? ''}
                style={{
                  fill: 'none',
                  stroke: `url(#gradient-${i})`,
                  strokeWidth: Math.max(1, link.width),
                }}
                // opacity={0.8}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.8,
                  transition: {
                    duration: 0.4,
                    ease: 'easeOut',
                  },
                }}
                whileHover={{
                  opacity: 1,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
              />
            </Tooltip>
          );
        })}

        {sankeyData.nodes.map((node, i) => {
          if (
            !node ||
            node.x1 == null ||
            node.x0 == null ||
            node.y1 == null ||
            node.y0 == null
          ) {
            return null;
          }

          return (
            <g key={i}>
              <rect
                x={node.x0}
                y={node.y0}
                width={Math.max(1, node.x1 - node.x0)}
                height={Math.max(1, node.y1 - node.y0)}
                fill={colors((node as any).name)}
              />

              {node.value && node.value > maxNodeValue / 200 && (
                <Box
                  as="text"
                  key={i}
                  x={node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}
                  y={(node.y0 + node.y1) / 2}
                  dy=".35em"
                  textAnchor={node.x0 < width / 2 ? 'start' : 'end'}
                  fill="#fff"
                  fontSize="16px"
                  backgroundColor="#000"
                >
                  {(node as any).name}
                </Box>
              )}
            </g>
          );
        })}
      </svg>
    </Box>
  );
};
