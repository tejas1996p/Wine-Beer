'use client';

/* ============================================
   FRAMER MOTION - Animation library for React
   ============================================ */
import { motion, useScroll, useSpring } from 'framer-motion';

/* ============================================
   SCROLL PROGRESS COMPONENT - Visual indicator at top of page
   ============================================ */
export default function ScrollProgress() {
  /* Track scroll progress across the entire page */
  const { scrollYProgress } = useScroll();
  
  /* Apply spring physics for smooth animation */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    /* Progress bar - fixed at top, gradient colored */
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-wine-burgundy via-gold to-wine-burgundy z-50 origin-left"
      style={{ scaleX }}
    />
  );
}
