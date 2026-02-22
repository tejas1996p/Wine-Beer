'use client';

/* ============================================
   COMPONENT IMPORTS
   ============================================ */
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import Footer from '@/components/Footer';

/* ============================================
   ANIMATION IMPORTS - Scroll animation components
   ============================================ */
import { FadeIn, StaggerContainer, StaggerItem, AnimatedBackground } from '@/components/ScrollAnimation';

/* ============================================
   API IMPORTS - Data fetching functions
   ============================================ */
import { getCategories, getProducts } from '@/lib/api';

/* ============================================
   NEXT.JS - Link component
   ============================================ */
import Link from 'next/link';

/* ============================================
   DATA FETCHING - Server-side data loading
   ============================================ */
async function getData() {
  try {
    /* Fetch categories and products in parallel */
    const [categories, productsData] = await Promise.all([
      getCategories(),
      getProducts({ limit: 8 })
    ]);
    return { categories, products: productsData.products };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { categories: [], products: [] };
  }
}

/* ============================================
   HOME PAGE - Main landing page
   ============================================ */
export default async function HomePage() {
  /* Fetch data on server side */
  const { categories, products } = await getData();

  return (
    <main className="min-h-screen relative">
      /* Animated background orbs
      <AnimatedBackground />
      
      // Navigation bar
      <Navbar />
      
      // Hero section with main banner
      <HeroSection />

      /* ============================================
         CATEGORIES SECTION - Browse by category
         ============================================ */
      <section className="py-20 bg-vintage-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-vintage-cream mb-4">
                Explore Our <span className="gold-text">Categories</span>
              </h2>
              <p className="text-vintage-cream/60 max-w-2xl mx-auto">
                From fine wines to premium spirits, discover our carefully curated selection 
                across all your favorite categories.
              </p>
            </div>
          </FadeIn>

          /* Category grid with staggered animation
          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.slice(0, 8).map((category) => (
                <StaggerItem key={category.id}>
                  <CategoryCard category={category} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      /* ============================================
         FEATURED PRODUCTS SECTION - Highlight products
         ============================================ */
      <section className="py-20 bg-gradient-to-b from-vintage-dark to-vintage-dark/95 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-vintage-cream mb-4">
                Featured <span className="gold-text">Products</span>
              </h2>
              <p className="text-vintage-cream/60 max-w-2xl mx-auto">
                Handpicked selections from our expert curators
              </p>
            </div>
          </FadeIn>

          /* Product grid with staggered animation
          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <StaggerItem key={product.id}>
                  <Link href={`/product/${product.id}`}>
                    <div className="vintage-card group">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-wine-burgundy/30 to-gold/10" />
                        <div className="relative h-full flex items-center justify-center p-4">
                          <img
                            src={product.image_url || 'https://placehold.co/400x600/722F37/FEFEFE?text=Product'}
                            alt={product.product_name}
                            className="object-contain h-full w-full product-image"
                          />
                        </div>
                        /* ABV badge if available
                        {product.abv && (
                          <div className="absolute top-3 left-3 px-2 py-1 bg-gold/20 backdrop-blur-sm rounded text-gold text-xs">
                            {product.abv}% ABV
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-gold text-xs uppercase tracking-wider mb-1">
                          {product.brand_name}
                        </p>
                        <h3 className="font-display text-vintage-cream text-lg leading-tight line-clamp-2">
                          {product.product_name}
                        </h3>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-body text-gold text-xl font-bold">
                            ${Number(product.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <a href="/products" className="vintage-button inline-flex items-center gap-2">
                View All Products
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      /* ============================================
         NEWSLETTER SECTION - Email subscription
         ============================================ */
      <section className="py-20 bg-gradient-to-r from-wine-burgundy/20 via-vintage-dark to-gold/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl text-vintage-cream mb-4">
                Stay Updated with <span className="gold-text">Vintage Spirits</span>
              </h2>
              <p className="text-vintage-cream/60 mb-8">
                Subscribe to receive exclusive offers, new arrivals, and expert recommendations.
              </p>
              /* Newsletter signup form
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field flex-1"
                />
                <button type="submit" className="vintage-button whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      // Footer
      <Footer />
    </main>
  );
}
