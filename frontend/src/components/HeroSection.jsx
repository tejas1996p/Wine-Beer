'use client';

import Link from 'next/link';
import { ArrowRight, Wine, Beer, GlassWater } from 'lucide-react';

export default function HeroSection() {
  const features = [
    { icon: Wine, label: 'Premium Wines', color: 'text-wine-burgundy' },
    { icon: Beer, label: 'Craft Beers', color: 'text-amber-600' },
    { icon: GlassWater, label: 'Fine Spirits', color: 'text-gold' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-vintage-pattern opacity-5" />
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-vintage-dark via-wine-burgundy/10 to-vintage-dark" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-wine-burgundy/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Tagline */}
        <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-6 animate-fade-in">
          Est. 2024 • Premium Selection
        </p>

        {/* Main Heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-vintage-cream mb-6 leading-tight">
          Discover
          <span className="block gold-text text-shadow-gold">Extraordinary</span>
          Flavors
        </h1>

        {/* Subheading */}
        <p className="font-body text-vintage-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore our curated collection of over 4,000 premium wines, beers, and spirits 
          from the world&apos;s finest vineyards and distilleries.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/products" className="vintage-button flex items-center gap-2">
            Browse Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/category/red-wine" 
            className="px-6 py-3 font-accent uppercase tracking-wider border border-gold/30 text-vintage-cream rounded hover:border-gold hover:text-gold transition-all duration-300"
          >
            Featured Wines
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <span className="font-display text-4xl gold-text font-bold">4,000+</span>
            <p className="text-vintage-cream/50 text-sm mt-1">Products</p>
          </div>
          <div className="text-center">
            <span className="font-display text-4xl gold-text font-bold">12</span>
            <p className="text-vintage-cream/50 text-sm mt-1">Categories</p>
          </div>
          <div className="text-center">
            <span className="font-display text-4xl gold-text font-bold">50+</span>
            <p className="text-vintage-cream/50 text-sm mt-1">Countries</p>
          </div>
          <div className="text-center">
            <span className="font-display text-4xl gold-text font-bold">200+</span>
            <p className="text-vintage-cream/50 text-sm mt-1">Brands</p>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="flex items-center justify-center gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <feature.icon className={`w-8 h-8 ${feature.color}`} />
              <span className="text-vintage-cream/60 text-sm uppercase tracking-wider">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
