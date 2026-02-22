'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function FadeIn({ children, delay = 0, direction = 'up' }) {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, delay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: delay } },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }) {
  return (
    <motion.div
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

export function ParallaxSection({ children, speed = 0.5 }) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function ScrollScale({ children, scaleRange = [0.8, 1] }) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange);

  return (
    <motion.div ref={ref} style={{ scale }}>
      {children}
    </motion.div>
  );
}

export function AnimatedBackground() {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <>
      <motion.div
        style={{ y: y1, rotate }}
        className="fixed top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="fixed top-40 right-20 w-96 h-96 bg-wine-burgundy/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y3 }}
        className="fixed bottom-40 left-1/4 w-48 h-48 bg-amber-900/5 rounded-full blur-3xl pointer-events-none"
      />
    </>
  );
}
