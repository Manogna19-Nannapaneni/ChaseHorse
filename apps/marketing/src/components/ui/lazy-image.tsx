'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/lib/images';
import { useSafeReducedMotion } from '@/lib/use-safe-reduced-motion';

type LazyImageProps = Omit<ImageProps, 'placeholder'> & {
  wrapperClassName?: string;
  fallbackSrc?: string;
  fit?: 'cover' | 'contain';
  framed?: boolean;
  /** Subtle scroll-driven drift — best on full-bleed banner images (requires `fill`). */
  parallax?: boolean;
};

/** Reliable image for static export — always visible, no opacity-gated reveal. */
export function LazyImage({
  className,
  wrapperClassName,
  fallbackSrc = IMAGES.logistics,
  fit = 'cover',
  framed = false,
  parallax = false,
  alt,
  src,
  ...props
}: LazyImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useSafeReducedMotion();

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });
  const active = parallax && !reducedMotion;
  const y = useTransform(scrollYProgress, [0, 1], active ? ['-6%', '6%'] : ['0%', '0%']);

  const image = (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      unoptimized
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
      className={cn(fit === 'contain' ? 'object-contain' : 'object-cover', className)}
    />
  );

  return (
    <div
      ref={wrapperRef}
      className={cn('relative overflow-hidden', framed && 'product-frame', wrapperClassName)}
    >
      {parallax ? (
        <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
          {image}
        </motion.div>
      ) : (
        image
      )}
    </div>
  );
}
