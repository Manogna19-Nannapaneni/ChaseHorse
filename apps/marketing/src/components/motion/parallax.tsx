'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total travel distance in pixels across the scroll range. Higher = stronger. */
  strength?: number;
}

/**
 * Subtle scroll-driven parallax. The inner layer is intentionally oversized so
 * the vertical drift never reveals an empty edge.
 *
 * Always renders the same motion.div on server and client — branching the
 * element type on useReducedMotion() (client-only) causes a hydration
 * mismatch that can leave content stuck mid-transform. Reduced motion is
 * instead handled globally via <MotionConfig reducedMotion="user">, which
 * clamps the drift to near-zero without changing the DOM shape.
 */
export function Parallax({ children, className, strength = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Safe to read post-hydration: it only scales a numeric transform input,
  // it never changes which elements get rendered.
  const reducedMotion = useReducedMotion();
  const effectiveStrength = reducedMotion ? 0 : strength;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-effectiveStrength, effectiveStrength]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}
