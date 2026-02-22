'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { searchProducts } from '@/lib/api';
import { Search } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchSearchResults(query, 1);
    }
  }, [query]);

  const fetchSearchResults = async (q, page) => {
    if (!q) return;
    
    setLoading(true);
    try {
      const data = await searchProducts(q, { page, limit: 20 });
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error searching products:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchSearchResults(searchQuery, 1);
      setCurrentPage(1);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display text-4xl text-vintage-cream mb-4">
              Search <span className="gold-text">Products</span>
            </h1>
            
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for wines, beers, spirits..."
                  className="input-field pr-12 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-wine-burgundy rounded-full hover:bg-gold hover:text-vintage-dark transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {query && (
            <div>
              <p className="text-vintage-cream/60 mb-6">
                {loading ? 'Searching...' : 
                  pagination ? `Found ${pagination.total} results for "${query}"` : 
                  'No results found'}
              </p>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
              ) : products.length > 0 ? (
                <ProductGrid 
                  products={products} 
                  pagination={pagination}
                />
              ) : (
                <div className="text-center py-20">
                  <p className="text-vintage-cream/60 text-lg mb-4">
                    No products found matching your search.
                  </p>
                  <p className="text-vintage-cream/40">
                    Try different keywords or browse our categories.
                  </p>
                </div>
              )}
            </div>
          )}

          {!query && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-wine-burgundy/30 mx-auto mb-4" />
              <p className="text-vintage-cream/60 text-lg">
                Enter a search term to find products
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
