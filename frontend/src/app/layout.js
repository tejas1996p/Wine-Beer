/* ============================================
   GOOGLE FONTS - Import custom fonts from Google Fonts
   ============================================ */
import { Playfair_Display, Inter, Cinzel } from 'next/font/google';

/* Global CSS imports */
import './globals.css';

/* Component imports */
import ScrollProgress from '@/components/ScrollProgress';

/* ============================================
   FONT CONFIGURATION - Setup Google Fonts
   ============================================ */
/* Playfair Display - Elegant serif font for headings */
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

/* Inter - Clean sans-serif font for body text */
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

/* Cinzel - Classic font for accents and special text */
const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
});

/* ============================================
   PAGE METADATA - SEO configuration
   ============================================ */
export const metadata = {
  title: 'Vintage Spirits - Premium Wine & Beer Store',
  description: 'Discover our curated selection of fine wines, premium beers, and exceptional spirits from around the world.',
};

/* ============================================
   ROOT LAYOUT - Main layout wrapper for all pages
   ============================================ */
export default function RootLayout({ children }) {
  return (
    /* HTML document structure */
    <html lang="en">
      /* Body with custom fonts and theme colors */
      <body className={`${playfair.variable} ${inter.variable} ${cinzel.variable} font-body bg-vintage-dark text-vintage-cream`}>
        /* Scroll progress indicator at top of page */
        <ScrollProgress />
        /* Page content */
        {children}
      </body>
    </html>
  );
}
