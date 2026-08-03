import type { Metadata } from 'next';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { ShopCatalogue } from '@/components/shop-catalogue';
import { getSiteContent } from '@/lib/content';
import { IMAGES } from '@/lib/images';

export const metadata: Metadata = {
  title: 'HSE Shop',
  description: 'ChaseHorse merchandise, PPE, and branded gear — shop online.',
};

export default function MerchandisePage() {
  const products = getSiteContent().products.map((p) => ({
    ...p,
    priceValue: p.priceValue ?? (Number(String(p.price).replace(/[^\d.]/g, '')) || 0),
    category: p.category ?? 'Apparel',
  }));

  return (
    <>
      <ProductHero
        title="HSE Shop"
        eyebrow="Merchandise & PPE"
        subtitle="Official ChaseHorse apparel, gear, and safety essentials."
        image={IMAGES.shop}
        tone="light"
        primaryCta={{ label: 'Shop now', href: '#catalogue' }}
        secondaryCta={{ label: 'Track order', href: '/merchandise/track' }}
      />
      <div id="catalogue">
        <ShopCatalogue products={products} />
      </div>
    </>
  );
}
