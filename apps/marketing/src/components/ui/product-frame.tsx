'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/lib/images';
import { useSafeReducedMotion } from '@/lib/use-safe-reduced-motion';

type AspectPreset = 'hero' | 'product' | 'square' | 'wide';

const aspectClass: Record<AspectPreset, string> = {
  hero: 'aspect-[16/9]',
  product: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
};

interface ProductFrameProps {
  src?: string;
  alt?: string;
  aspect?: AspectPreset;
  fit?: 'cover' | 'contain';
  priority?: boolean;
  /** Subtle scroll-driven drift on the image inside its frame. */
  parallax?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Tesla Shop-style contained product shot: cream/white inner surface, a subtle
 * warm border and rounded corners. The image is always rendered (no opacity
 * gate) so it can never disappear behind an animation.
 */
export function ProductFrame({
  src,
  alt = '',
  aspect = 'hero',
  fit = 'cover',
  priority = false,
  parallax = false,
  className,
  children,
}: ProductFrameProps) {
  const [imgSrc, setImgSrc] = useState(src || IMAGES.logistics);
  const frameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useSafeReducedMotion();

  useEffect(() => {
    setImgSrc(src || IMAGES.logistics);
  }, [src]);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const active = parallax && !reducedMotion;
  const y = useTransform(scrollYProgress, [0, 1], active ? ['-6%', '6%'] : ['0%', '0%']);

  return (
    <div ref={frameRef} className={cn('product-frame relative', aspectClass[aspect], className)}>
      <motion.img
        src={imgSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onError={() => {
          if (imgSrc !== IMAGES.logistics) setImgSrc(IMAGES.logistics);
        }}
        style={parallax ? { y, scale: 1.14 } : undefined}
        className={cn('h-full w-full', fit === 'contain' ? 'object-contain p-6' : 'object-cover')}
      />
      {children}
    </div>
  );
}
