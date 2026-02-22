'use client';

/* ============================================
   NEXT.JS & REACT - Routing
   ============================================ */
import Link from 'next/link';

/* ============================================
   LUCIDE REACT - Icon library
   ============================================ */
import { ShoppingCart, Heart } from 'lucide-react';

/* ============================================
   FRAMER MOTION - Animation library
   ============================================ */
import { motion } from 'framer-motion';

/* ============================================
   PRODUCT CARD COMPONENT - Display individual product
   ============================================ */
export default function ProductCard({ product }) {
  /* ============================================
     CATEGORY COLORS - Gradient colors based on product category
     ============================================ */
  const categoryColors = {
    'Red Wine': 'from-red-900/50 to-wine-burgundy/30',
    'White Wine': 'from-yellow-900/50 to-gold/20',
    'Rosé Wine': 'from-pink-900/50 to-rose-900/30',
    'Sparkling Wine': 'from-amber-900/50 to-yellow-600/30',
    'Beer': 'from-amber-900/50 to-orange-900/30',
    'Whiskey': 'from-amber-800/50 to-yellow-700/30',
    'Rum': 'from-amber-900/50 to-orange-800/30',
    'Vodka': 'from-slate-800/50 to-slate-600/30',
    'Gin': 'from-emerald-900/50 to-teal-800/30',
    'Tequila': 'from-amber-700/50 to-yellow-600/30',
    'Brandy': 'from-amber-900/50 to-orange-900/30',
    'Sake': 'from-stone-800/50 to-stone-600/30',
  };

  /* Get gradient class based on product category */
  const gradientClass = categoryColors[product.category] || 'from-gray-900/50 to-wine-burgundy/30';

  return (
    /* Card container with hover effect */
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="vintage-card group"
    >
      /* ============================================
         PRODUCT IMAGE SECTION
         ============================================ */
      <div className="relative aspect-[3/4] overflow-hidden">
        /* Background gradient based on category
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />
        
        /* Product image container with zoom effect
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="relative h-full flex items-center justify-center p-6"
        >
          <img
            src={product.image_url || 'https://placehold.co/400x600/722F37/FEFEFE?text=Product'}
            alt={product.product_name}
            className="h-full w-full object-contain product-image"
          />
        </motion.div>

        /* ============================================
           OVERLAY ACTIONS - Wishlist and cart buttons
           ============================================ */
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute top-3 right-3 flex flex-col gap-2"
        >
          /* Wishlist button
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-vintage-dark/80 backdrop-blur-sm rounded-full hover:bg-gold hover:text-vintage-dark transition-colors"
          >
            <Heart className="w-4 h-4" />
          </motion.button>
          /* Add to cart button
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-vintage-dark/80 backdrop-blur-sm rounded-full hover:bg-gold hover:text-vintage-dark transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </motion.div>

        /* ============================================
           ABV BADGE - Alcohol by volume indicator
           ============================================ */
        {product.abv && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-gold/20 backdrop-blur-sm rounded text-gold text-xs font-body">
            {product.abv}% ABV
          </div>
        )}
      </div>

      /* ============================================
         PRODUCT INFO SECTION
         ============================================ */
      <div className="p-4">
        /* Brand name
        <p className="text-gold text-xs uppercase tracking-wider mb-1">
          {product.brand_name}
        </p>
        /* Product name - clickable link
        <Link href={`/product/${product.id}`}>
          <h3 className="font-display text-vintage-cream text-lg leading-tight hover:text-gold transition-colors line-clamp-2">
            {product.product_name}
          </h3>
        </Link>
        
        /* Country/Region display
        {(product.country || product.region) && (
          <p className="text-vintage-cream/50 text-xs mt-1">
            {product.region ? `${product.region}, ` : ''}{product.country}
          </p>
        )}
        
        /* Price and stock status
        <div className="flex items-center justify-between mt-3">
          /* Price
          <span className="font-body text-gold text-xl font-bold">
            ${Number(product.price).toFixed(2)}
          </span>
          /* Stock status badge
          <span className={`text-xs px-2 py-1 rounded ${
            product.stock > 50 ? 'bg-green-900/30 text-green-400' : 
            product.stock > 0 ? 'bg-yellow-900/30 text-yellow-400' : 
            'bg-red-900/30 text-red-400'
          }`}>
            {product.stock > 50 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
