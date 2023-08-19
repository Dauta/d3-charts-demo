import {
  CountryCode,
  alpha2ToName,
} from '@/components/charts/choropleth/helpers';

export const generateRandomData = () => {
  const values = Array.from(
    Object.keys(alpha2ToName).map((alpha2) => [
      alpha2,
      Math.floor(Math.random() * 10000),
    ])
  ) as [CountryCode, number][];

  return new Map(values);
};
