'use client';

import { cn } from '@/lib/utils';
import { LazyImage } from '@/components/ui/lazy-image';
import { TeslaButton } from '@/components/ui/tesla-button';
import { Reveal } from '@/components/motion/reveal';

export interface FeatureViewportProps {
  title: string;
  description?: string;
  image: string;
  /** Overlay text on imagery (Tesla interior/feature panels) */
  variant?: 'overlay' | 'split';
  /** For split: image on left or right */
  imageSide?: 'left' | 'right';
  tone?: 'dark' | 'light';
  primaryCta?: { label: string; href?: string; action?: 'quote' | 'link' };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

/**
 * Tesla product-page feature panel — either a full-viewport image with centered
 * copy, or a cream split (copy + image) matching Model Y interior sections.
 */
export function FeatureViewport({
  title,
  description,
  image,
  variant = 'overlay',
  imageSide = 'right',
  tone = 'light',
  primaryCta,
  secondaryCta,
  className,
}: FeatureViewportProps) {
  if (variant === 'split') {
    const imageFirst = imageSide === 'left';
    return (
      <section
        className={cn(
          'grid min-h-[100svh] bg-[#f4f4f4] lg:grid-cols-2',
          className,
        )}
      >
        <div
          className={cn(
            'relative min-h-[45vh] lg:min-h-full',
            imageFirst ? 'order-1' : 'order-1 lg:order-2',
          )}
        >
          <LazyImage
            src={image}
            alt={title}
            fill
            parallax
            sizes="(max-width:1024px) 100vw, 50vw"
            wrapperClassName="absolute inset-0"
            className="object-cover"
          />
        </div>
        <div
          className={cn(
            'flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 lg:py-24',
            imageFirst ? 'order-2' : 'order-2 lg:order-1',
          )}
        >
          <Reveal>
            <h2 className="text-[28px] font-medium leading-tight text-tesla-black md:text-[36px]">
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#393c41]">
                {description}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta && (
                  <TeslaButton
                    label={primaryCta.label}
                    variant="primary"
                    href={primaryCta.href}
                    action={primaryCta.action ?? 'quote'}
                    compact
                  />
                )}
                {secondaryCta && (
                  <TeslaButton
                    label={secondaryCta.label}
                    variant="secondary-dark"
                    href={secondaryCta.href}
                    compact
                  />
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>
    );
  }

  const isLight = tone === 'light';

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden px-6 pb-12 pt-24 text-center',
        className,
      )}
    >
      <LazyImage
        src={image}
        alt={title}
        fill
        parallax
        sizes="100vw"
        wrapperClassName="absolute inset-0"
        className="object-cover"
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          isLight
            ? 'bg-gradient-to-b from-black/50 via-black/10 to-black/45'
            : 'bg-gradient-to-b from-white/50 via-transparent to-white/40',
        )}
      />
      <Reveal className="relative z-10 max-w-2xl">
        <h2
          className={cn(
            'text-[28px] font-medium leading-tight md:text-[40px]',
            isLight ? 'text-white' : 'text-tesla-black',
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mx-auto mt-3 max-w-lg text-[15px] leading-relaxed md:text-[17px]',
              isLight ? 'text-white/85' : 'text-tesla-muted',
            )}
          >
            {description}
          </p>
        )}
      </Reveal>
      {(primaryCta || secondaryCta) && (
        <div className="relative z-10 mt-auto tesla-cta-row">
          {primaryCta && (
            <TeslaButton
              label={primaryCta.label}
              variant="primary"
              href={primaryCta.href}
              action={primaryCta.action ?? 'quote'}
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
    </section>
  );
}
