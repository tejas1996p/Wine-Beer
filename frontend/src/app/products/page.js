'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { getProducts, getCategories } from '@/lib/api';
import { SlidersHorizontal, X } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get('page')) || 1;
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: '',
    maxPrice: '',
    country: '',
    sort: 'id',
  });

  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 20,
        ...filters,
      };
      
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });

      const data = await getProducts(params);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: '',
      maxPrice: '',
      country: '',
      sort: 'id',
    });
    setCurrentPage(1);
  };

  const countries = ['France', 'Italy', 'Spain', 'USA', 'Australia', 'Argentina', 'Chile', 'Germany', 'Japan', 'Mexico', 'Scotland', 'Ireland'];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display text-4xl text-vintage-cream mb-2">
              All <span className="gold-text">Products</span>
            </h1>
            <p className="text-vintage-cream/60">
              Browse our complete collection of premium wines, beers, and spirits
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <button
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-wine-burgundy/50 rounded text-vintage-cream"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-vintage-dark/50 border border-wine-burgundy/30 rounded-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-accent text-gold text-sm uppercase tracking-widest">Filters</h2>
                  {(filters.category || filters.minPrice || filters.maxPrice || filters.country) && (
                    <button
                      onClick={clearFilters}
                      className="text-vintage-cream/60 text-sm hover:text-gold flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Clear
                    </button>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-vintage-cream/70 text-sm mb-2 block">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="select-field"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="text-vintage-cream/70 text-sm mb-2 block">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="input-field w-1/2"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="input-field w-1/2"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-vintage-cream/70 text-sm mb-2 block">Country</label>
                  <select
                    value={filters.country}
                    onChange={(e) => handleFilterChange('country', e.target.value)}
                    className="select-field"
                  >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="text-vintage-cream/70 text-sm mb-2 block">Sort By</label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="select-field"
                  >
                    <option value="id">Default</option>
                    <option value="price">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="product_name">Name: A-Z</option>
                    <option value="abv">ABV: Low to High</option>
                  </select>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
              ) : (
                <ProductGrid 
                  products={products} 
                  pagination={pagination}
                  currentCategory={filters.category}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-vintage-dark">
        <div className="pt-24 flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      </main>
    }>
      <ProductsContent />
    </Suspense>
  );
}
