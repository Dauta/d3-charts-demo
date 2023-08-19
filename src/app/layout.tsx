import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './Providers';
import { ClientLayout } from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'D3 Charts Demo',
  description: 'Interactive charts using d3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          style={{
            height: '100svh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background:
              'linear-gradient(to right bottom, #161a33, #181d35, #1a2036, #1c2338, #1e2639, #1f2b3d, #212f42, #223446, #213c4e, #204456, #1e4c5d, #1c5463)',
          }}
        >
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </div>
      </body>
    </html>
  );
}
