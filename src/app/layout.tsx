import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/ui/smooth-scroll';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter_Tight({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'KRMTech | Beyond Premium',
  description: 'A cutting-edge tech organization pushing the boundaries of innovation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-obsidian text-foreground antialiased`}>
        <div className="noise-bg" />
        <CustomCursor />
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
