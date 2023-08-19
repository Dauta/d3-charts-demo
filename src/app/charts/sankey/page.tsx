import type { Metadata } from 'next/types';
import { Sankey } from '@/components/charts/sankey';
import data from './data.json';
import { ChartContainer } from '@/components/chart-container';

export const metadata: Metadata = {
  title: 'Sankey - D3 Charts Demo',
  description: 'Interactive Sankey chart using d3',
};

export default function Page() {
  return (
    <ChartContainer>
      <Sankey data={data} />
    </ChartContainer>
  );
}
