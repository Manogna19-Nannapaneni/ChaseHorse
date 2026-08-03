'use client';

import type { ProductSlide } from '@/types/content';
import { getHomeSlideImage } from '@/lib/images';
import { DualCardCarousel, type DualCardSlide } from './dual-card-carousel';

const EYEBROW: Record<string, string> = {
  esg: 'Sustainability',
  tier2: 'Tier 2 · 48H Scale',
  tier3: 'Tier 3 · Enterprise',
};

export function ServicesCarousel({ slides }: { slides: ProductSlide[] }) {
  const resolvedSlides: DualCardSlide[] = slides.map((slide) => ({
    id: slide.id,
    eyebrow: EYEBROW[slide.id],
    title: slide.title,
    subtitle: slide.subtitle,
    image: getHomeSlideImage(slide.id, slide.image),
    primaryCta: { label: 'Order Now', action: 'quote' },
    secondaryCta: slide.secondaryCta,
  }));

  return <DualCardCarousel slides={resolvedSlides} variant="dark" />;
}
