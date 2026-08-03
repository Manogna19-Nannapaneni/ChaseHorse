'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { LazyImage } from '@/components/ui/lazy-image';
import { TeslaButton } from '@/components/ui/tesla-button';

interface ProductHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image: string;
  primaryCta?: { label: string; href?: string; action?: 'quote' | 'link' };
  secondaryCta?: { label: string; href: string };
  /** Dark text on light imagery vs light text on dark imagery */
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * Tesla Model Y–style product hero: full-bleed 100vh imagery with centered
 * title/subtitle near the top and dual CTAs floating above the lower third.
 */
export function ProductHero({
  title,
  subtitle,
  eyebrow,
  image,
  primaryCta,
  secondaryCta,
  tone = 'dark',
  className,
}: ProductHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isLight = tone === 'light';

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 },
    );
  }, []);

  return (
    <section
      className={cn(
        'relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden',
        className,
      )}
    >
      <LazyImage
        src={image}
        alt={title}
        fill
        priority
        parallax
        wrapperClassName="absolute inset-0"
        className="object-cover"
        sizes="100vw"
      />
      {/* Soft top/bottom vignette so type stays legible without a heavy overlay */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          isLight
            ? 'bg-gradient-to-b from-black/45 via-transparent to-black/50'
            : 'bg-gradient-to-b from-white/40 via-transparent to-white/30',
        )}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-1 flex-col items-center px-6 pb-10 pt-28 text-center sm:pt-32"
      >
        {eyebrow && (
          <p
            className={cn(
              'text-[14px] font-medium',
              isLight ? 'text-white/80' : 'text-tesla-muted',
            )}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            'tesla-hero-title',
            isLight ? 'text-white' : 'text-tesla-black',
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              'tesla-hero-subtitle mx-auto max-w-xl',
              isLight ? 'text-white/85' : 'text-tesla-muted',
            )}
          >
            {subtitle}
          </p>
        )}

        <div className="mt-auto flex w-full flex-col items-center">
          {(primaryCta || secondaryCta) && (
            <div className="tesla-cta-row mb-8">
              {primaryCta && (
                <TeslaButton
                  label={primaryCta.label}
                  variant="primary"
                  href={primaryCta.href}
                  action={primaryCta.action ?? (primaryCta.href ? 'link' : 'quote')}
                  compact
                />
              )}
              {secondaryCta && (
                <TeslaButton
                  label={secondaryCta.label}
                  variant={isLight ? 'secondary' : 'secondary-dark'}
                  href={secondaryCta.href}
                  compact
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
