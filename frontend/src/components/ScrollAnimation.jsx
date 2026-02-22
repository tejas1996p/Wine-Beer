'use client';

/* ============================================
   FRAMER MOTION & REACT HOOKS - Animation utilities
   ============================================ */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ============================================
   FADE IN COMPONENT - Fade in animation from direction
   ============================================ */
export function FadeIn({ children, delay = 0, direction = 'up' }) {
  /* Direction configurations for different entrance animations */
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      /* Initial state - hidden and offset in chosen direction */
      initial={{ opacity: 0, ...directions[direction] }}
      /* Animate to visible position when in viewport */
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      /* Only animate once when element enters viewport */
      viewport={{ once: true, margin: "-100px" }}
      /* Smooth animation with custom delay */
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================
   STAGGER CONTAINER - Staggered children animation
   ============================================ */
export function StaggerContainer({ children, delay = 0.1 }) {
  return (
    <motion.div
      /* Initial hidden state */
      initial="hidden"
      /* Animate to visible when in viewport */
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      /* Stagger children animation with specified delay */
      variants={{
        visible: { transition: { staggerChildren: delay } },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================
   STAGGER ITEM - Individual staggered animation child
   ============================================ */
export function StaggerItem({ children }) {
  return (
    <motion.div
      /* Animation variants for stagger effect */
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 30 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================
   PARALLAX SECTION - Parallax scroll effect
   ============================================ */
export function ParallaxSection({ children, speed = 0.5 }) {
  const ref = useRef(null);
  
  /* Track scroll progress for this section */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Transform Y progress */
  const position based on scroll y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

/* ============================================
   SCROLL SCALE - Scale animation on scroll
   ============================================ */
export function ScrollScale({ children, scaleRange = [0.8, 1] }) {
  const ref = useRef(null);
  
  /* Track scroll progress */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Scale based on scroll position */
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange);

  return (
    <motion.div ref={ref} style={{ scale }}>
      {children}
    </motion.div>
  );
}

/* ============================================
   ANIMATED BACKGROUND - Floating decorative orbs
   ============================================ */
export function AnimatedBackground() {
  const { scrollY } = useScroll();
  
  /* Create different scroll-based transforms for each orb */
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <>
      {/* Gold orb - top left */}
      <motion.div
        style={{ y: y1, rotate }}
        className="fixed top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none"
      />
      {/* Burgundy orb - top right */}
      <motion.div
        style={{ y: y2 }}
        className="fixed top-40 right-20 w-96 h-96 bg-wine-burgundy/10 rounded-full blur-3xl pointer-events-none"
      />
      {/* Amber orb - bottom left */}
      <motion.div
        style={{ y: y3 }}
        className="fixed bottom-40 left-1/4 w-48 h-48 bg-amber-900/5 rounded-full blur-3xl pointer-events-none"
      />
    </>
  );
}
