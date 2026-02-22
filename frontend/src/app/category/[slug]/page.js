'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { getProductsByCategory, getCategories } from '@/lib/api';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

function CategoryContent() {
  const params = useParams();
  const slug = params.slug;
  
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCategoryData();
  }, [slug, currentPage]);

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProductsByCategory(slug, { page: currentPage, limit: 20 }),
        getCategories()
      ]);
      
      setProducts(productsData.products);
      setPagination(productsData.pagination);
      
      const cat = categoriesData.find(c => c.slug === slug);
      setCategory(cat);
    } catch (error) {
      console.error('Error fetching category products:', error);
    }
    setLoading(false);
  };

  const categoryImages = {
    'red-wine': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200',
    'white-wine': 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200',
    'rose-wine': 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=1200',
    'sparkling-wine': 'https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=1200',
    'beer': 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=1200',
    'whiskey': 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=1200',
    'rum': 'https://images.unsplash.com/photo-1614680023167-27d7d4a5bc2a?w=1200',
    'vodka': 'https://images.unsplash.com/photo-1613063087250-333946d01332?w=1200',
    'gin': 'https://images.unsplash.com/photo-1608885898957-a97c01a48fda?w=1200',
    'tequila': 'https://images.unsplash.com/photo-1618453292485-6806f15e0e34?w=1200',
    'brandy': 'https://images.unsplash.com/photo-1602632214858-93366c0c2c4e?w=1200',
    'sake': 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1200',
  };

  const heroImage = categoryImages[slug] || 'https://placehold.co/1200x400/722F37/FEFEFE?text=Category';

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden mt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vintage-dark via-vintage-dark/70 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div>
            <nav className="flex items-center gap-2 text-vintage-cream/60 text-sm mb-3">
              <Link href="/" className="hover:text-gold">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/products" className="hover:text-gold">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gold">{category?.name || slug}</span>
            </nav>
            <h1 className="font-display text-4xl md:text-5xl text-vintage-cream">
              {category?.name || slug}
            </h1>
            {category?.description && (
              <p className="text-vintage-cream/70 mt-2 max-w-xl">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <ProductGrid 
              products={products} 
              pagination={pagination}
              currentCategory={slug}
            />
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}
