'use client';

import Link from 'next/link';
import type { TierService } from '@/types/content';
import { getServiceHero, IMAGES } from '@/lib/images';
import { LazyImage } from '@/components/ui/lazy-image';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';
import { ProductOrderCta } from '@/components/sections/tesla/product-order-cta';

const TIER_META: Record<
  1 | 2 | 3,
  { title: string; subtitle: string; image: string; deploy: string }
> = {
  1: {
    title: 'Tier 1 — Core Business',
    subtitle: 'Digital foundation — strategy deployment in 24 hours.',
    image: IMAGES.tiers.tier1,
    deploy: 'Deploy in 24 Hours',
  },
  2: {
    title: 'Tier 2 — Strategic Growth',
    subtitle: 'Optimization and fleet management — scale in 48 hours.',
    image: IMAGES.tiers.tier2,
    deploy: 'Scale in 48 Hours',
  },
  3: {
    title: 'Tier 3 — Advanced Technology',
    subtitle: 'AI, IoT, SCM, and enterprise compliance.',
    image: IMAGES.tiers.tier3,
    deploy: 'Enterprise Stack',
  },
};

interface ServicesInventoryProps {
  /** All services, or a single tier subset */
  services: TierService[];
  /** When set, page is a tier landing; otherwise full catalogue */
  tier?: 1 | 2 | 3;
}

/**
 * Tesla inventory / category landing — hero + vehicle-style product grid
 * with Learn | Order links under each service.
 */
export function ServicesInventory({ services, tier }: ServicesInventoryProps) {
  const meta = tier ? TIER_META[tier] : null;

  return (
    <>
      <ProductHero
        title={meta?.title ?? 'Our Services'}
        eyebrow={meta ? `Tier ${tier}` : 'GELP Platform'}
        subtitle={
          meta?.subtitle ??
          'Growth Enabler Logiworkx Platform — three tiers of logistics excellence.'
        }
        image={meta?.image ?? IMAGES.pages.services}
        tone="light"
        primaryCta={{ label: 'Order Now', action: 'quote' }}
        secondaryCta={{
          label: tier ? 'All Services' : 'Contact Us',
          href: tier ? '/services' : '/contact',
        }}
      />

      {/* Category cards — Tesla 2-up energy-style when showing all tiers */}
      {!tier && (
        <section className="bg-white px-4 py-6 sm:px-6">
          <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-3">
            {([1, 2, 3] as const).map((t) => {
              const m = TIER_META[t];
              return (
                <Link
                  key={t}
                  href={`/services/tier-${t}`}
                  className="group relative aspect-[16/10] overflow-hidden rounded-[12px]"
                >
                  <LazyImage
                    src={m.image}
                    alt={m.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    wrapperClassName="absolute inset-0"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[14px] font-medium text-white/80">Tier {t}</p>
                    <p className="mt-1 text-[22px] font-medium text-white">
                      {m.title.replace(/^Tier \d — /, '')}
                    </p>
                    <p className="mt-1 text-[13px] text-white/75">{m.deploy}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="bg-[#f4f4f4] py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <h2 className="text-center text-[28px] font-medium text-tesla-black md:text-[32px]">
              {tier ? TIER_META[tier].title.replace(/^Tier \d — /, '') : 'Full Catalogue'}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-[15px] text-[#5c5e62]">
              {tier
                ? TIER_META[tier].subtitle
                : 'Every GELP module — from rapid Tier 1 deploy to enterprise Tier 3.'}
            </p>
          </Reveal>

          <RevealStagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.slug} className="group text-center">
                <Link href={`/services/${service.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-white">
                    <LazyImage
                      src={getServiceHero(service.slug)}
                      alt={service.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      wrapperClassName="absolute inset-0"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-[17px] font-medium text-[#171a20]">{service.title}</p>
                  <p className="mt-1 line-clamp-2 px-2 text-[13px] text-[#5c5e62]">
                    {service.description}
                  </p>
                </Link>
                <div className="mt-3 flex items-center justify-center gap-3 text-[14px]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-medium text-[#3e6ae1] underline-offset-2 hover:underline"
                  >
                    Learn
                  </Link>
                  <span className="text-[#d0d1d2]">|</span>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Enquiry: ${service.title}`)}`}
                    className="font-medium text-[#3e6ae1] underline-offset-2 hover:underline"
                  >
                    Order
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <ProductOrderCta
        title={tier ? `Ready for Tier ${tier}?` : 'Need a custom logistics solution?'}
        description="Our team will map the right GELP tier and modules for your operations."
        primaryLabel="Get a Quote"
        secondaryLabel={tier ? 'Compare Tiers' : 'Contact Us'}
        secondaryHref={tier ? '/services' : '/contact'}
      />
    </>
  );
}
