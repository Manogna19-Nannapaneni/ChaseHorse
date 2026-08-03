'use client';

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

type RevealDirection = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight';

const variantMap: Record<RevealDirection, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0 },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'fadeUp',
  once = true,
}: RevealProps) {
  // Always render the same motion.div on server and client — branching on
  // useReducedMotion() (which can only resolve on the client) causes a
  // hydration mismatch that leaves the server-rendered `hidden` variant
  // (opacity: 0) stuck in the DOM forever. Reduced-motion is instead handled
  // globally via <MotionConfig reducedMotion="user"> in smooth-scroll.tsx,
  // which collapses these transitions to near-instant without hiding content.
  //
  // Visibility is driven by useScrollReveal (real scroll-position geometry)
  // rather than `whileInView`, whose IntersectionObserver recalculation can be
  // unreliable after programmatic/smooth scrolling and leave content stuck
  // hidden — see use-scroll-reveal.ts for details.
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ margin: 80, once });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variantMap[direction]}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface RevealStaggerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  once?: boolean;
}

export function RevealStagger({ children, className, once = true, ...props }: RevealStaggerProps) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ margin: 40, once });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div className={className} variants={staggerItem} {...props}>
      {children}
    </motion.div>
  );
}
