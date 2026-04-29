import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Namma Health Card | Premium Healthcare Membership',
  description: 'Manage your healthcare membership, digital cards, and hospital visits with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
