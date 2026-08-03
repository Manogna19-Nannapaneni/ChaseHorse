'use client';

import { useSiteContent } from '@/components/site-content-provider';
import { HomeScroll } from '@/components/sections/tesla/home-scroll';
import { HeroCarousel } from '@/components/sections/tesla/hero-carousel';
import { ThreeTiersSection } from '@/components/sections/tesla/three-tiers-section';
import { FeatureSplit } from '@/components/sections/tesla/feature-split';
import { ProductCarousel } from '@/components/sections/tesla/product-carousel';
import { InfoCards } from '@/components/sections/tesla/info-cards';
import { NetworkMap } from '@/components/sections/tesla/network-map';
import { ServicesCarousel } from '@/components/sections/tesla/services-carousel';

export function HomeSections() {
  const content = useSiteContent();
  const { home } = content;

  return (
    <HomeScroll>
      <HeroCarousel slides={home.heroSlides} />
      <ThreeTiersSection />
      <FeatureSplit feature={home.feature} stats={content.homepageStats} />
      <div id="customers">
        <ProductCarousel services={content.featuredServices} />
      </div>
      <InfoCards cards={home.infoCards} />
      <NetworkMap stats={content.networkStats} bullets={content.networkBullets} />
      <ServicesCarousel slides={home.secondarySlides} />
    </HomeScroll>
  );
}
