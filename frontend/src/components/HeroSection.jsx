'use client';

/* ============================================
   NEXT.JS & REACT - Routing and hooks
   ============================================ */
import Link from 'next/link';

/* ============================================
   LUCIDE REACT - Icon library
   ============================================ */
import { ArrowRight, Wine, Beer, GlassWater } from 'lucide-react';

/* ============================================
   FRAMER MOTION - Animation library
   ============================================ */
import { motion, useScroll, useTransform } from 'framer-motion';

/* ============================================
   REACT HOOKS
   ============================================ */
import { useRef } from 'react';

/* ============================================
   HERO SECTION COMPONENT - Main homepage banner
   ============================================ */
export default function HeroSection() {
  /* Reference for scroll tracking */
  const containerRef = useRef(null);
  
  /* Scroll progress for parallax effects */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  /* Transform values for parallax animation */
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  /* Feature icons configuration */
  const features = [
    { icon: Wine, label: 'Premium Wines', color: 'text-wine-burgundy' },
    { icon: Beer, label: 'Craft Beers', color: 'text-amber-600' },
    { icon: GlassWater, label: 'Fine Spirits', color: 'text-gold' },
  ];

  return (
    /* Hero section container with min height */
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      
      /* ============================================
         BACKGROUND LAYERS
         ============================================ */
      /* Background pattern overlay */
      <div className="absolute inset-0 bg-vintage-pattern opacity-5" />
      
      /* Gradient background */
      <div className="absolute inset-0 bg-gradient-to-b from-vintage-dark via-wine-burgundy/10 to-vintage-dark" />

      /* ============================================
         PARALLAX DECORATIVE ELEMENTS
         ============================================ */
      /* Gold blur orb - moves with scroll */
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" 
      />
      /* Burgundy blur orb - moves opposite direction */
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-wine-burgundy/10 rounded-full blur-3xl" 
      />

      /* ============================================
         FLOATING PARTICLES - Decorative animation
         ============================================ */
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gold/20 rounded-full"
          initial={{ 
            x: Math.random() * 1000, 
            y: Math.random() * 600 + 200,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity, 
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}

      /* ============================================
         MAIN CONTENT - Animated container
         ============================================ */
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        /* ============================================
           TAGLINE - Brand subtitle
           ============================================ */
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-6"
        >
          Est. 2024 • Premium Selection
        </motion.p>

        /* ============================================
           MAIN HEADING - Hero title with gradient
           ============================================ */
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-vintage-cream mb-6 leading-tight"
        >
          Discover
          <span className="block gold-text text-shadow-gold">Extraordinary</span>
          Flavors
        </motion.h1>

        /* ============================================
           SUBHEADING - Description text
           ============================================ */
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-body text-vintage-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Explore our curated collection of over 4,000 premium wines, beers, and spirits 
          from the world&apos;s finest vineyards and distilleries.
        </motion.p>

        /* ============================================
           CALL TO ACTION BUTTONS
           ============================================ */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          /* Primary button - Browse products
          <Link href="/products" className="vintage-button flex items-center gap-2">
            Browse Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
          /* Secondary button - Featured wines
          <Link 
            href="/featured" 
            className="px-6 py-3 font-accent uppercase tracking-wider border border-gold/30 text-vintage-cream rounded hover:border-gold hover:text-gold transition-all duration-300"
          >
            Featured Wines
          </Link>
        </motion.div>

        /* ============================================
           STATISTICS - Key metrics display
           ============================================ */
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
        >
          {[
            { value: '4,000+', label: 'Products' },
            { value: '12', label: 'Categories' },
            { value: '50+', label: 'Countries' },
            { value: '200+', label: 'Brands' },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <span className="font-display text-4xl gold-text font-bold">{stat.value}</span>
              <p className="text-vintage-cream/50 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        /* ============================================
           FEATURE ICONS - Product category preview
           ============================================ */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex items-center justify-center gap-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <feature.icon className={`w-8 h-8 ${feature.color}`} />
              <span className="text-vintage-cream/60 text-sm uppercase tracking-wider">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}
