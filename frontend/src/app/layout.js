import { Playfair_Display, Inter, Cinzel } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ScrollProgress';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
});

export const metadata = {
  title: 'Vintage Spirits - Premium Wine & Beer Store',
  description: 'Discover our curated selection of fine wines, premium beers, and exceptional spirits from around the world.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${cinzel.variable} font-body bg-vintage-dark text-vintage-cream`}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
