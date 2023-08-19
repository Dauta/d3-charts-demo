import { Choropleth } from '@/components/charts/choropleth';
import type { Metadata } from 'next/types';
import { FeatureCollection, Geometry } from 'geojson';
import type {
  CountryCode,
  CountryName,
} from '@/components/charts/choropleth/helpers';
import { generateRandomData } from './helpers/generateRandomData';
import worldGeoJson from './geo/world.json';
import { ChartContainer } from '@/components/chart-container';

export const metadata: Metadata = {
  title: 'Choropleth - D3 Charts Demo',
  description: 'Interactive Choropleth chart using d3',
};

export default function Page() {
  const features = worldGeoJson as FeatureCollection<
    Geometry,
    { alpha2: CountryCode; name: CountryName }
  >;

  const data = generateRandomData();
  return (
    <ChartContainer>
      <Choropleth features={features} data={data} />;
    </ChartContainer>
  );
}
