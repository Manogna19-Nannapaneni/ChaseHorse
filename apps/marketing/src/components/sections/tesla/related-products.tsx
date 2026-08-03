'use client';

import Link from 'next/link';
import type { TierService } from '@/types/content';
import { getServiceHero } from '@/lib/images';
import { LazyImage } from '@/components/ui/lazy-image';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';

interface RelatedProductsProps {
  title?: string;
  services: TierService[];
}

/**
 * Tesla "Explore other models" style row — image cards with Learn / Order links.
 */
export function RelatedProducts({
  title = 'Explore Other Services',
  services,
}: RelatedProductsProps) {
  if (services.length === 0) return null;

  return (
    <section className="bg-[#f4f4f4] py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="text-center text-[28px] font-medium text-tesla-black md:text-[32px]">
            {title}
          </h2>
        </Reveal>
        <RevealStagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.slug} className="group text-center">
              <Link href={`/services/${service.slug}`} className="block">
                <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-white">
                  <LazyImage
                    src={getServiceHero(service.slug)}
                    alt={service.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    wrapperClassName="absolute inset-0"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-[17px] font-medium text-tesla-black">{service.title}</p>
              </Link>
              <div className="mt-2 flex items-center justify-center gap-4 text-[14px]">
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
  );
}
