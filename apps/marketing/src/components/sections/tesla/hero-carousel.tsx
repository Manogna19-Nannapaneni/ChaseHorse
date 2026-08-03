'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import type { HeroSlide } from '@/types/content';
import { getHomeSlideImage } from '@/lib/images';
import { cn } from '@/lib/utils';
import { LazyImage } from '@/components/ui/lazy-image';
import { TeslaButton } from '@/components/ui/tesla-button';
import { CarouselDots } from '@/components/ui/carousel-dots';
import { useLeadForm } from '@/components/lead-form-provider';
import { useSiteContent } from '@/components/site-content-provider';

const DEFAULT_SUMMARY = [
  { label: 'Platform', href: '/platform' },
  { label: 'Services', href: '/services' },
  { label: 'Discover', href: '/courses' },
  { label: 'Customers', href: '/#customers' },
  { label: 'Benefits', href: '/platform#why-gelp' },
  { label: "What's next", href: '/contact' },
];

const DEFAULT_WA = 'https://wa.me/917337369111';

/** Homepage hero: 3 cinematic slides, CTAs, WhatsApp, summary nav — 450px under header. */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const content = useSiteContent();
  const { openForm } = useLeadForm();
  const summaryLinks = content.home.summaryLinks?.length
    ? content.home.summaryLinks
    : DEFAULT_SUMMARY;
  const wa =
    content.home.whatsapp?.number
      ? `https://wa.me/${content.home.whatsapp.number.replace(/\D/g, '')}`
      : DEFAULT_WA;
  const waAvatar = content.home.whatsapp?.avatar ?? '/images/team-meeting.jpg';

  const heroSlides = slides.slice(0, 3).map((slide) => ({
    ...slide,
    image: getHomeSlideImage(slide.id, slide.image),
  }));

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', duration: reducedMotion ? 0 : 45 },
    reducedMotion ? [] : [Autoplay({ delay: 7000, stopOnInteraction: true })],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (heroSlides.length === 0) return null;

  return (
    <section className="relative mt-[56px] w-full overflow-hidden bg-[#171a20]">
      <div className="relative h-[450px] w-full">
        <div ref={emblaRef} className="h-full w-full overflow-hidden">
          <div className="flex h-full">
            {heroSlides.map((slide, index) => (
              <div key={slide.id} className="relative h-full min-w-0 flex-[0_0_100%]">
                {slide.video ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={slide.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={slide.image}
                  />
                ) : (
                  <LazyImage
                    src={slide.image!}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    wrapperClassName="absolute inset-0"
                    className="object-cover"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.45)_100%)]" />

                <div
                  className={cn(
                    'absolute inset-0 z-10 flex flex-col items-center px-6 py-8 transition-opacity duration-500 sm:py-10',
                    index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none',
                  )}
                >
                  <div className="flex flex-col items-center text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                    <h1 className="max-w-3xl text-[26px] font-medium leading-[1.15] text-white sm:text-[34px]">
                      {slide.title}
                    </h1>
                    {slide.subtitle && (
                      <p className="mt-2 max-w-xl text-[14px] text-white/95 sm:text-[16px]">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex w-full max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                    <TeslaButton
                      label={slide.secondaryCta.label || 'Know more'}
                      variant="secondary"
                      href={slide.secondaryCta.href}
                      compact
                    />
                    {slide.primaryCta.action === 'quote' ? (
                      <TeslaButton
                        label={slide.primaryCta.label || 'Book Now'}
                        variant="primary"
                        action="quote"
                        compact
                      />
                    ) : (
                      <TeslaButton
                        label={slide.primaryCta.label || 'Connect now'}
                        variant="primary"
                        href={slide.primaryCta.href ?? '/contact'}
                        compact
                      />
                    )}
                    <a
                      href={slide.whatsappCta?.href ?? wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-[4px] bg-[#25D366] px-4 text-[14px] font-medium text-white shadow-lg shadow-black/25 transition hover:bg-[#1ebe57]"
                    >
                      <span className="relative h-7 w-7 overflow-hidden rounded-full bg-white/20 ring-1 ring-white/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slide.whatsappCta?.avatar ?? waAvatar}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <MessageCircle className="h-4 w-4" />
                      {slide.whatsappCta?.label ?? 'WhatsApp'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {heroSlides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[4px] bg-white/40 text-[#171a20] sm:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[4px] bg-white/40 text-[#171a20] sm:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <CarouselDots
              count={heroSlides.length}
              activeIndex={activeIndex}
              onSelect={(i) => emblaApi?.scrollTo(i)}
              className="absolute bottom-3 left-0 right-0 z-20"
              light
            />
          </>
        )}
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 bg-[#171a20] px-4 py-3">
        {summaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[12px] font-medium text-white/75 transition hover:text-white sm:text-[13px]"
          >
            {link.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={openForm}
          className="text-[12px] font-medium text-[#7eb0ff] transition hover:text-white sm:text-[13px]"
        >
          Book Now
        </button>
      </nav>
    </section>
  );
}
