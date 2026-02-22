'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-vintage-dark/95 backdrop-blur-md border-b border-wine-burgundy/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-accent text-2xl gold-text font-bold tracking-wider">
              VINTAGE
            </span>
            <span className="font-display text-xl text-vintage-cream">
              SPIRITS
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="nav-link font-body text-sm uppercase tracking-widest">
              All Products
            </Link>
            <Link href="/category/red-wine" className="nav-link font-body text-sm uppercase tracking-widest">
              Red Wine
            </Link>
            <Link href="/category/white-wine" className="nav-link font-body text-sm uppercase tracking-widest">
              White Wine
            </Link>
            <Link href="/category/beer" className="nav-link font-body text-sm uppercase tracking-widest">
              Beer
            </Link>
            <Link href="/category/whiskey" className="nav-link font-body text-sm uppercase tracking-widest">
              Whiskey
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 xl:w-64 px-4 py-2 bg-vintage-dark/50 border border-wine-burgundy/50 rounded-full text-vintage-cream text-sm placeholder:text-vintage-cream/40 focus:border-gold focus:w-64 transition-all duration-300 outline-none"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-vintage-cream/50" />
              </div>
            </form>

            <button className="p-2 hover:text-gold transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 hover:text-gold transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-vintage-dark text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-wine-burgundy/30 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field rounded-full"
                />
              </div>
            </form>
            <div className="flex flex-col space-y-3">
              <Link href="/products" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              <Link href="/category/red-wine" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                Red Wine
              </Link>
              <Link href="/category/white-wine" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                White Wine
              </Link>
              <Link href="/category/beer" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                Beer
              </Link>
              <Link href="/category/whiskey" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                Whiskey
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
