'use client';

import * as d3 from 'd3';
import { Heading, Tooltip, useToken } from '@chakra-ui/react';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatNumericValue } from '@/helpers';
import { FeatureCollection, Geometry } from 'geojson';
import { CountryCode, CountryName } from './helpers';

type ChoroplethProps = {
  data: Map<string, number>;
  features: FeatureCollection<
    Geometry,
    { alpha2: CountryCode; name: CountryName }
  >;
};

export const Choropleth = ({ data, features }: ChoroplethProps) => {
  const projection = d3.geoNaturalEarth1();
  const pathGenerator = d3.geoPath().projection(projection);

  const bounds = useMemo(
    () => (features ? pathGenerator.bounds(features) : null),
    [features, pathGenerator]
  );

  const [minColor, maxColor, hoverColor] = useToken('colors', [
    'blue.100',
    'blue.600',
    'blue.700',
  ]);

  if (!bounds || !features) return null;

  const [x0, y0, x1, y1] = [
    bounds[0][0],
    bounds[0][1],
    bounds[1][0],
    bounds[1][1],
  ];

  const viewBox = `${x0} ${y0} ${x1 - x0} ${y1 - y0}`;

  const values = Array.from(data.values());
  const interpolateColor = d3
    .scaleSequentialLog<string>()
    .domain([d3.min(values) || 0, d3.max(values) || 1000])
    .range([minColor, maxColor]);

  return (
    <>
      <Heading as="h2" size="lg" fontWeight="semibold" width="100%">
        Choropleth
      </Heading>
      <svg
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {features.features.map((feature, i) => {
          const value = data.get(String(feature.properties.alpha2));
          const fillColor = value ? interpolateColor(value) : '#fff';

          const d = pathGenerator(feature) ?? '';

          if (!value) {
            return (
              <path
                key={i}
                d={d}
                stroke="black"
                strokeWidth={0.2}
                fill={fillColor}
              />
            );
          }

          return (
            <Tooltip
              key={i}
              label={`${feature.properties.name}: ${formatNumericValue(value)}`}
              openDelay={250}
            >
              <motion.path
                d={d}
                stroke="black"
                strokeWidth={0.2}
                fill={fillColor}
                whileHover={{
                  fill: hoverColor,
                  transition: {
                    duration: 0.2,
                    ease: 'easeOut',
                  },
                }}
              />
            </Tooltip>
          );
        })}
      </svg>
    </>
  );
};
