import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { LazyImage } from '@/components/ui/lazy-image';
import { getSiteContent } from '@/lib/content';
import { getInsightImage, IMAGES } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Live Market',
  description: 'Live market intelligence and logistics insights from ChaseHorse GELP.',
};

export default function LiveMarketPage() {
  const content = getSiteContent();
  const live = content.liveMarket;
  const cards =
    live?.cards ??
    content.insights.map((item) => ({
      title: item.title,
      body: item.date,
      href: `#${item.slug}`,
      image: getInsightImage(item.slug, item.image),
    }));

  return (
    <>
      <ProductHero
        title={live?.title ?? 'Live Market Intelligence'}
        eyebrow="Live Market"
        subtitle={
          live?.description ??
          'Market signals, industry insights, and GELP intelligence for decision-makers.'
        }
        image={IMAGES.featured.supplyChain}
        tone="light"
        primaryCta={{ label: 'Lets Connect', href: '/contact' }}
        secondaryCta={{ label: 'Platform', href: '/platform' }}
      />

      <section className="bg-[#f4f4f4] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href + card.title}
              id={card.href.replace('#', '')}
              href={card.href.startsWith('#') ? card.href : card.href}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[16/10]">
                <LazyImage
                  src={card.image ?? IMAGES.logistics}
                  alt={card.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  wrapperClassName="absolute inset-0"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <h2 className="text-[17px] font-medium text-[#171a20]">{card.title}</h2>
                <p className="mt-2 text-[13px] text-[#5c5e62]">{card.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
