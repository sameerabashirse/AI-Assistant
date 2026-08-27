import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Balochi Digital AI Knowledge Assistant',
  description: 'Verified AI Knowledge Platform for Balochi Language & Research',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
