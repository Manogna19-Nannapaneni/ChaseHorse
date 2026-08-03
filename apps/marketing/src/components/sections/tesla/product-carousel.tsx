'use client';

import type { FeaturedService } from '@/types/content';
import { getFeaturedServiceImage } from '@/lib/images';
import { DualCardCarousel, type DualCardSlide } from './dual-card-carousel';

const EYEBROW: Record<FeaturedService['icon'], string> = {
  truck: 'Road · Nationwide',
  ship: 'FCL & LCL',
  plane: 'Express Air',
  warehouse: '3PL Storage',
  'file-check': 'Cross-Border',
  network: 'End-to-End',
};

export function ProductCarousel({ services }: { services: FeaturedService[] }) {
  const slides: DualCardSlide[] = services.slice(0, 4).map((service) => ({
    id: service.slug,
    eyebrow: EYEBROW[service.icon],
    title: service.title,
    subtitle: service.description,
    image: getFeaturedServiceImage(service.icon),
    primaryCta: { label: 'Order Now', action: 'quote' },
    secondaryCta: { label: 'Learn More', href: `/services/${service.slug}` },
  }));

  return <DualCardCarousel slides={slides} variant="light" />;
}
