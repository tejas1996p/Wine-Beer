'use client';

import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductGrid({ products, pagination, currentCategory }) {
  const { page, limit, total, pages } = pagination || { page: 1, limit: 20, total: 0, pages: 0 };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-vintage-cream/60 text-lg">No products found.</p>
        <Link href="/products" className="text-gold hover:underline mt-4 inline-block">
          View all products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-vintage-cream/60">
          Showing {((page - 1) * limit) + 1} - {Math.min(page * limit, total)} of {total} products
        </p>
        {currentCategory && (
          <Link href="/products" className="text-gold text-sm hover:underline">
            View all products
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <Link
            href={page > 1 ? `?page=${page - 1}` : '#'}
            className={`p-3 rounded border border-wine-burgundy/50 transition-colors ${
              page > 1 
                ? 'hover:border-gold hover:text-gold text-vintage-cream' 
                : 'text-vintage-cream/30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>

          {Array.from({ length: Math.min(5, pages) }, (_, i) => {
            let pageNum;
            if (pages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= pages - 2) {
              pageNum = pages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <Link
                key={pageNum}
                href={`?page=${pageNum}`}
                className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
                  page === pageNum
                    ? 'bg-gold text-vintage-dark font-bold'
                    : 'border border-wine-burgundy/50 hover:border-gold hover:text-gold text-vintage-cream'
                }`}
              >
                {pageNum}
              </Link>
            );
          })}

          <Link
            href={page < pages ? `?page=${page + 1}` : '#'}
            className={`p-3 rounded border border-wine-burgundy/50 transition-colors ${
              page < pages 
                ? 'hover:border-gold hover:text-gold text-vintage-cream' 
                : 'text-vintage-cream/30 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
}
