'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductById, getProducts } from '@/lib/api';
import { ShoppingCart, Heart, ChevronRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';

function ProductContent() {
  const params = useParams();
  const id = params.id;
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const [productData, related] = await Promise.all([
        getProductById(id),
        productData.category ? getProducts({ limit: 4, category: productData.category }) : Promise.resolve({ products: [] })
      ]);
      
      setProduct(productData);
      
      if (productData.category) {
        const relatedData = await getProducts({ limit: 4, category: productData.category });
        setRelatedProducts(relatedData.products.filter(p => p.id !== parseInt(id)).slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl text-vintage-cream mb-4">Product Not Found</h1>
          <Link href="/products" className="text-gold hover:underline">
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-vintage-cream/60 text-sm mb-8">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-gold">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/category/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-gold">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold truncate max-w-[200px]">{product.product_name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="relative aspect-[3/4] bg-vintage-dark/50 rounded-xl overflow-hidden border border-wine-burgundy/30">
              <Image
                src={product.image_url || 'https://placehold.co/600x800/722F37/FEFEFE?text=Product'}
                alt={product.product_name}
                fill
                className="object-contain p-8"
                priority
              />
              {product.abv && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-gold/20 backdrop-blur-sm rounded text-gold font-body">
                  {product.abv}% ABV
                </div>
              )}
            </div>

            <div>
              <p className="text-gold text-sm uppercase tracking-wider mb-2">{product.brand_name}</p>
              <h1 className="font-display text-3xl md:text-4xl text-vintage-cream mb-4">
                {product.product_name}
              </h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${star <= 4 ? 'text-gold fill-gold' : 'text-vintage-cream/30'}`} 
                    />
                  ))}
                </div>
                <span className="text-vintage-cream/60 text-sm">(42 reviews)</span>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl gold-text font-bold">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>

              <div className="mb-8">
                <h3 className="font-accent text-gold text-sm uppercase tracking-widest mb-3">
                  Description
                </h3>
                <p className="text-vintage-cream/70 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-vintage-dark/50 p-4 rounded border border-wine-burgundy/30">
                  <p className="text-vintage-cream/50 text-xs uppercase mb-1">Category</p>
                  <p className="text-vintage-cream">{product.category}</p>
                </div>
                {product.subcategory && (
                  <div className="bg-vintage-dark/50 p-4 rounded border border-wine-burgundy/30">
                    <p className="text-vintage-cream/50 text-xs uppercase mb-1">Type</p>
                    <p className="text-vintage-cream">{product.subcategory}</p>
                  </div>
                )}
                {product.country && (
                  <div className="bg-vintage-dark/50 p-4 rounded border border-wine-burgundy/30">
                    <p className="text-vintage-cream/50 text-xs uppercase mb-1">Country</p>
                    <p className="text-vintage-cream">{product.country}</p>
                  </div>
                )}
                {product.region && (
                  <div className="bg-vintage-dark/50 p-4 rounded border border-wine-burgundy/30">
                    <p className="text-vintage-cream/50 text-xs uppercase mb-1">Region</p>
                    <p className="text-vintage-cream">{product.region}</p>
                  </div>
                )}
                {product.abv && (
                  <div className="bg-vintage-dark/50 p-4 rounded border border-wine-burgundy/30">
                    <p className="text-vintage-cream/50 text-xs uppercase mb-1">ABV</p>
                    <p className="text-vintage-cream">{product.abv}%</p>
                  </div>
                )}
                <div className="bg-vintage-dark/50 p-4 rounded border border-wine-burgundy/30">
                  <p className="text-vintage-cream/50 text-xs uppercase mb-1">Availability</p>
                  <p className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-wine-burgundy/50 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-vintage-cream hover:text-gold"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-vintage-cream border-x border-wine-burgundy/50">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-3 text-vintage-cream hover:text-gold"
                  >
                    +
                  </button>
                </div>
                <button className="vintage-button flex-1 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="p-3 border border-wine-burgundy/50 rounded hover:border-gold hover:text-gold transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-wine-burgundy/30">
                <div className="text-center">
                  <Truck className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-vintage-cream/60 text-xs">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-vintage-cream/60 text-xs">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-vintage-cream/60 text-xs">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-display text-2xl text-vintage-cream mb-8">
                Related <span className="gold-text">Products</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    }>
      <ProductContent />
    </Suspense>
  );
}
