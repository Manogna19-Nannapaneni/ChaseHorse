import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { ProductOrderCta } from '@/components/sections/tesla/product-order-cta';
import { IMAGES } from '@/lib/images';
import { getSiteContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Platform — GELP',
  description:
    'Growth Enabler Logiworkx Platform — Human Interface + Technology + ESG + Market.',
};

export default function PlatformPage() {
  const content = getSiteContent();
  const platform = content.platform;

  return (
    <>
      <ProductHero
        title={platform?.title ?? 'Growth Enabler Logiworkx Platform'}
        eyebrow="Platform"
        subtitle={
          platform?.description ??
          'Human Interface + Technology + ESG-Sustainability + Market'
        }
        image={platform?.heroImage ?? IMAGES.hero}
        tone="light"
        primaryCta={{ label: 'Lets Connect', href: '/contact' }}
        secondaryCta={{ label: 'View Solutions', href: '/services' }}
      />

      <section id="who-we-are" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[28px] font-medium text-[#171a20] md:text-[36px]">Who We Are</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-[#393c41] md:text-[17px]">
            CHASEHORSE is a technology-driven logistics and supply chain transformation company
            delivering innovative solutions across industries globally. As a growth enabling partner,
            we orchestrated need-of-the-hour solutions engineered with futuristic capabilities. We
            pioneer a first-of-its-kind Logistics-as-a-Service (LaaS) Platform — offering a
            simplified, plug-and-play model equipped with pre-integrated, deployment-ready resources.
          </p>
        </div>
      </section>

      <section id="why-gelp" className="bg-[#f4f4f4] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[28px] font-medium text-[#171a20] md:text-[36px]">
            Why ChaseHorse G.E.L.P?
          </h2>
          <p className="mt-3 text-[15px] text-[#5c5e62]">
            Value Creation · Futuristic · Practical · One Transparent Platform
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-[#393c41] md:text-[17px]">
            The Growth Enabler Logiworkx Platform engineered a paradigm shift by delivering rapid
            business scalability coupled with immediately accessible plug &amp; play resources.
            Backed by live market intelligence, flexible finance options, and highly feasible cost
            models, the framework drives profound operational efficiency across systems.
          </p>
        </div>
      </section>

      <section id="onboarding" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-[28px] font-medium text-[#171a20] md:text-[36px]">
            ThunderspeedIn Onboarding
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/services/tier-1"
              className="rounded-2xl bg-[#f4f4f4] p-8 transition hover:bg-[#eee]"
            >
              <p className="text-[13px] font-medium text-[#3e6ae1]">Tier 1</p>
              <p className="mt-2 text-[24px] font-medium text-[#171a20]">24 Hours</p>
              <p className="mt-2 text-[14px] text-[#5c5e62]">Strategy deployment ready</p>
            </Link>
            <Link
              href="/services/tier-2"
              className="rounded-2xl bg-[#f4f4f4] p-8 transition hover:bg-[#eee]"
            >
              <p className="text-[13px] font-medium text-[#3e6ae1]">Tier 2</p>
              <p className="mt-2 text-[24px] font-medium text-[#171a20]">48 Hours</p>
              <p className="mt-2 text-[14px] text-[#5c5e62]">Operations scale ready</p>
            </Link>
          </div>
        </div>
      </section>

      <ProductOrderCta
        title="Ready to deploy GELP?"
        description="Schedule a demo and map the right tier for your operations."
        primaryLabel="Book a Demo"
        secondaryLabel="All Services"
        secondaryHref="/services"
      />
    </>
  );
}
