import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { ToastContainer } from '@/components/ui/toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Digifox — Digital Agency Management Platform',
    template: '%s | Digifox',
  },
  description: 'Manage your digital agency operations — leads, clients, projects, portfolio, and team — all from one premium platform.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Digifox — Digital Agency Management Platform',
    description: 'Manage your digital agency operations from one premium platform.',
    type: 'website',
    siteName: 'Digifox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digifox — Digital Agency Management Platform',
    description: 'Manage your digital agency operations from one premium platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-dvh flex flex-col antialiased`}>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
