import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://besoaesthetics.com'),
  title: {
    default: 'Beso Intelligence Network',
    template: '%s | Beso Intelligence Network',
  },
  description:
    'Expert-guided procedure, recovery, and complication content for injectable lip filler treatments.',
  openGraph: {
    siteName: 'Beso Intelligence Network',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
