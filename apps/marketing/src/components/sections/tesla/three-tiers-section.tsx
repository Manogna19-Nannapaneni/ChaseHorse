'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';
import { useSiteContent } from '@/components/site-content-provider';

const DEFAULT_TIERS = [
  {
    tier: 1 as const,
    title: 'Core Business Services',
    subtitle: 'Digital foundation',
    audience: 'Teams establishing digital logistics operations',
    description:
      'Rapid strategy deployment — Digital Transformation, CH Deploy, complaints, PPEs, and returns.',
    href: '/services/tier-1',
  },
  {
    tier: 2 as const,
    title: 'Strategic & Growth Services',
    subtitle: 'Scale operations',
    audience: 'Operators ready to optimize and expand',
    description:
      'Fleet & driver management, ESG, CX, optimization tools, and digital advancement.',
    href: '/services/tier-2',
  },
  {
    tier: 3 as const,
    title: 'Advanced Ops & Technology',
    subtitle: 'Enterprise stack',
    audience: 'Enterprises needing AI, IoT, SCM, and compliance',
    description:
      'IT & advanced technologies, fleet operations, SCM process, sustainability, and governance.',
    href: '/services/tier-3',
  },
];

const TIER_HEADERS: Record<number, string> = {
  1: 'TIER 1 → CORE BUSINESS',
  2: 'TIER 2 → STRATEGIC & GROWTH',
  3: 'TIER 3 → ADVANCED TECH',
};

export function ThreeTiersSection() {
  const content = useSiteContent();
  const overview = content.home.tierOverview;
  const tiers = overview?.tiers?.length ? overview.tiers : DEFAULT_TIERS;

  return (
    <section id="tiers" className="bg-[#fafafa] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#3e6ae1]">
            Service Model
          </p>
          <h2 className="mt-2 text-[28px] font-medium text-[#171a20] md:text-[36px]">
            {overview?.title ?? 'Three Tiers. One Platform.'}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5c5e62]">
            {overview?.description ??
              'ChaseHorse organizes solutions into three connected tiers so you can start with a digital foundation, scale strategically, and advance into enterprise technology — without rebuilding your stack.'}
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <RevealItem key={tier.tier}>
              <Link
                href={tier.href}
                className="group flex h-full flex-col overflow-hidden rounded-b-xl border border-[#e5e5e5] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="bg-[#171a20] px-4 py-3 text-center text-[11px] font-semibold tracking-[0.06em] text-white sm:text-[12px]">
                  {TIER_HEADERS[tier.tier] ?? `TIER ${tier.tier}`}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[18px] font-medium text-[#171a20]">{tier.title}</h3>
                  <p className="mt-1 text-[13px] font-medium text-[#5c5e62]">{tier.subtitle}</p>
                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-[#393c41]">
                    {tier.description}
                  </p>
                  <p className="mt-4 text-[12px] text-[#8e8e8e]">
                    <span className="font-medium text-[#171a20]">For:</span> {tier.audience}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-[14px] font-medium text-[#171a20] group-hover:text-[#3e6ae1]">
                    Explore Tier {tier.tier}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-[14px] leading-relaxed text-[#393c41]">
            {overview?.connection ??
              'Tiers connect as a journey: Tier 1 establishes the foundation, Tier 2 scales people and process, Tier 3 layers advanced technology — combine modules across tiers as you grow.'}
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-[#5c5e62]">
            {overview?.howToChoose ??
              'Not sure where to start? Use Design Your Solution in the Solutions menu, or talk to our team.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/solutions/design"
              className="inline-flex items-center gap-2 rounded-md bg-[#171a20] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-[#393c41]"
            >
              Design Your Solution <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-md border border-[#171a20] px-6 py-3 text-[14px] font-medium text-[#171a20] transition hover:bg-[#171a20]/5"
            >
              View full catalogue
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
