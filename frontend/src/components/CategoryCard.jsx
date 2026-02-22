'use client';

import Image from 'next/image';
import Link from 'next/link';

const categoryImages = {
  'red-wine': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600',
  'white-wine': 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600',
  'rose-wine': 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=600',
  'sparkling-wine': 'https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=600',
  'beer': 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600',
  'whiskey': 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600',
  'rum': 'https://images.unsplash.com/photo-1614680023167-27d7d4a5bc2a?w=600',
  'vodka': 'https://images.unsplash.com/photo-1613063087250-333946d01332?w=600',
  'gin': 'https://images.unsplash.com/photo-1608885898957-a97c01a48fda?w=600',
  'tequila': 'https://images.unsplash.com/photo-1618453292485-6806f15e0e34?w=600',
  'brandy': 'https://images.unsplash.com/photo-1602632214858-93366c0c2c4e?w=600',
  'sake': 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600',
};

export default function CategoryCard({ category }) {
  const imageUrl = categoryImages[category.slug] || 'https://placehold.co/600x400/722F37/FEFEFE?text=Category';

  return (
    <Link href={`/category/${category.slug}`} className="category-card block">
      <div className="relative h-64 md:h-80">
        <Image
          src={imageUrl}
          alt={category.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-vintage-dark via-vintage-dark/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-display text-2xl text-vintage-cream mb-2">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-vintage-cream/70 text-sm line-clamp-2">
              {category.description}
            </p>
          )}
          <span className="inline-block mt-3 text-gold text-sm uppercase tracking-widest border-b border-gold/50 pb-1">
            Explore
          </span>
        </div>
      </div>
    </Link>
  );
}
