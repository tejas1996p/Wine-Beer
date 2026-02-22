'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import axios from 'axios';

export default function FeaturedPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedWines();
  }, []);

  const fetchFeaturedWines = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/featured?limit=50`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching featured wines:', error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display text-4xl text-vintage-cream mb-2">
              Featured <span className="gold-text">Wines</span>
            </h1>
            <p className="text-vintage-cream/60">
              Explore our handpicked selection of premium wines - Red, White, Rosé & Sparkling
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
