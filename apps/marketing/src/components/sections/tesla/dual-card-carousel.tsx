'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LazyImage } from '@/components/ui/lazy-image';
import { TeslaButton } from '@/components/ui/tesla-button';
import { CarouselDots } from '@/components/ui/carousel-dots';
import { Reveal } from '@/components/motion/reveal';

export interface DualCardSlide {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  primaryCta: { label: string; action?: 'quote' | 'link'; href?: string };
  secondaryCta?: { label: string; href: string };
}

interface DualCardCarouselProps {
  slides: DualCardSlide[];
  /** `light` = Tesla "Model Y / Model 3" style card (white info panel under photo).
   *  `dark` = Tesla "Solar / Powerwall" style card (text overlaid on the photo). */
  variant?: 'light' | 'dark';
  autoplayDelay?: number;
  className?: string;
}

function DualCard({
  slide,
  variant,
  size,
  onAdvance,
  priority,
}: {
  slide: DualCardSlide;
  variant: 'light' | 'dark';
  size: 'primary' | 'secondary';
  onAdvance?: () => void;
  priority?: boolean;
}) {
  const isDark = variant === 'dark';

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[6px]',
        isDark ? 'bg-tesla-black' : 'bg-tesla-cream-deep',
      )}
    >
      <div
        className={cn(
          'relative w-full',
          size === 'primary' ? 'aspect-[16/10]' : 'aspect-[4/5]',
          isDark && 'min-h-[280px] sm:min-h-[320px]',
        )}
      >
        <LazyImage
          src={slide.image}
          alt={slide.title}
          fill
          parallax
          priority={priority}
          wrapperClassName="absolute inset-0"
          className="object-cover"
          sizes={size === 'primary' ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 35vw'}
        />
        {isDark && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        )}

        {slide.eyebrow && (
          <span
            className={cn(
              'absolute left-4 top-4 z-10 rounded-[3px] px-2 py-1 text-[11px] font-medium tracking-wide',
              isDark ? 'bg-white/15 text-white backdrop-blur-sm' : 'bg-white/80 text-tesla-black',
            )}
          >
            {slide.eyebrow}
          </span>
        )}

        {size === 'secondary' && onAdvance && (
          <button
            type="button"
            aria-label="Next"
            onClick={onAdvance}
            className={cn(
              'absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border transition',
              isDark
                ? 'border-white/40 bg-black/30 text-white hover:bg-black/50'
                : 'border-tesla-black/20 bg-white/90 text-tesla-black hover:bg-white',
            )}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        )}

        {isDark && (
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
            <CardBody slide={slide} isDark size={size} />
          </div>
        )}
      </div>

      {!isDark && (
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <CardBody slide={slide} isDark={false} size={size} />
        </div>
      )}
    </article>
  );
}

function CardBody({
  slide,
  isDark,
  size,
}: {
  slide: DualCardSlide;
  isDark: boolean;
  size: 'primary' | 'secondary';
}) {
  return (
    <>
      <h3
        className={cn(
          'font-medium leading-tight',
          size === 'primary' ? 'text-[22px] sm:text-[24px]' : 'text-[18px] sm:text-[20px]',
          isDark ? 'text-white' : 'text-tesla-black',
        )}
      >
        {slide.title}
      </h3>
      {slide.subtitle && (
        <p
          className={cn(
            'mt-1.5 text-[14px] leading-snug',
            isDark ? 'text-white/75' : 'text-[#5c5e62]',
          )}
        >
          {slide.subtitle}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <TeslaButton
          label={slide.primaryCta.label}
          variant="primary"
          action={slide.primaryCta.action ?? 'link'}
          href={slide.primaryCta.href}
          className="min-w-[140px] flex-none px-5"
        />
        {slide.secondaryCta && (
          <TeslaButton
            label={slide.secondaryCta.label}
            variant={isDark ? 'secondary' : 'secondary-dark'}
            href={slide.secondaryCta.href}
            className="min-w-[140px] flex-none px-5"
          />
        )}
      </div>
    </>
  );
}

export function DualCardCarousel({
  slides,
  variant = 'light',
  autoplayDelay = 6500,
  className,
}: DualCardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = slides.length;

  const advance = () => setActiveIndex((i) => (i + 1) % count);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % count), autoplayDelay);
    return () => clearInterval(id);
  }, [count, autoplayDelay]);

  if (count === 0) return null;

  const primary = slides[activeIndex];
  const secondary = count > 1 ? slides[(activeIndex + 1) % count] : undefined;

  return (
    <section className={cn('bg-tesla-cream p-3 sm:p-4', className)}>
      <Reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          <div className="md:flex-[0_0_62%]">
            <DualCard slide={primary} variant={variant} size="primary" priority />
          </div>
          {secondary && (
            <div className="md:flex-[0_0_38%]">
              <DualCard slide={secondary} variant={variant} size="secondary" onAdvance={advance} />
            </div>
          )}
        </div>

        {count > 1 && (
          <CarouselDots
            count={count}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            light={false}
            className="mt-4"
          />
        )}
      </Reveal>
    </section>
  );
}
