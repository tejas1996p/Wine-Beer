import Link from 'next/link';
import { Wine, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-vintage-dark border-t border-wine-burgundy/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Wine className="w-8 h-8 text-gold" />
              <div>
                <span className="font-accent text-xl gold-text font-bold">VINTAGE</span>
                <span className="font-display text-lg text-vintage-cream block">SPIRITS</span>
              </div>
            </div>
            <p className="text-vintage-cream/60 text-sm leading-relaxed">
              Your premier destination for fine wines, craft beers, and premium spirits. 
              Curated selections from the world&apos;s finest vineyards and distilleries.
            </p>
          </div>

          <div>
            <h3 className="font-accent text-gold text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['All Products', 'Red Wine', 'White Wine', 'Beer', 'Whiskey', 'Rum'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'All Products' ? '/products' : `/category/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-vintage-cream/70 hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-accent text-gold text-sm uppercase tracking-widest mb-6">
              Categories
            </h3>
            <ul className="space-y-3">
              {['Vodka', 'Gin', 'Tequila', 'Brandy', 'Sake', 'Sparkling Wine'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/category/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-vintage-cream/70 hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-accent text-gold text-sm uppercase tracking-widest mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-vintage-cream/70 text-sm">
                <MapPin className="w-4 h-4 text-gold" />
                <span>123 Vintage Lane, Wine Country, CA 94558</span>
              </li>
              <li className="flex items-center space-x-3 text-vintage-cream/70 text-sm">
                <Phone className="w-4 h-4 text-gold" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-vintage-cream/70 text-sm">
                <Mail className="w-4 h-4 text-gold" />
                <span>info@vintagespirits.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-wine-burgundy/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-vintage-cream/50 text-sm">
            &copy; {new Date().getFullYear()} Vintage Spirits. All rights reserved.
          </p>
          <p className="text-vintage-cream/50 text-sm mt-4 md:mt-0">
            Must be 21+ to purchase. Please drink responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
