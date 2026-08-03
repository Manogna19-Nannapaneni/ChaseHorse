'use client';

import dynamic from 'next/dynamic';
import { Zap, Plug } from 'lucide-react';
import { TeslaButton } from '@/components/ui/tesla-button';
import { Reveal, RevealItem, RevealStagger } from '@/components/motion/reveal';

const NetworkMapCanvas = dynamic(
  () =>
    import('@/components/sections/tesla/network-map-canvas').then(
      (m) => m.NetworkMapCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] w-full animate-pulse bg-[#e8e8e8] sm:h-[520px] md:h-[640px]" />
    ),
  },
);

export function NetworkMap({
  stats,
  bullets,
}: {
  stats: { value: string; label: string }[];
  bullets: string[];
}) {
  const primaryStats = stats.slice(0, 2);

  return (
    <section className="bg-tesla-cream">
      <Reveal direction="fadeIn">
        <NetworkMapCanvas />
      </Reveal>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-8 py-14 md:grid-cols-2 md:items-start md:py-20">
        <Reveal>
          <h2 className="text-[28px] font-medium leading-tight text-tesla-black md:text-[32px]">
            Find Your Hub
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-[#5c5e62]">
            {bullets[0] ?? 'Strategic Global Network'} — ChaseHorse connects your business to
            markets worldwide through a strategically positioned logistics network.
          </p>
          <div className="tesla-cta-row mt-8 max-w-[520px]">
            <TeslaButton label="View Network" variant="dark" href="/services" compact />
            <TeslaButton label="Learn More" variant="secondary-dark" href="/contact" compact />
          </div>
        </Reveal>

        <RevealStagger className="space-y-8">
          {primaryStats.map((stat, i) => (
            <RevealItem key={stat.label} className="flex items-baseline gap-4">
              <div className="text-tesla-black">
                {i === 0 ? <Zap className="h-6 w-6" strokeWidth={1.5} /> : <Plug className="h-6 w-6" strokeWidth={1.5} />}
              </div>
              <div>
                <p className="text-[32px] font-medium leading-none text-tesla-black">{stat.value}</p>
                <p className="mt-1 text-[14px] text-[#5c5e62]">{stat.label}</p>
              </div>
            </RevealItem>
          ))}
          <RevealItem className="grid grid-cols-2 gap-6 border-t border-[#e8e8e8] pt-6">
            {stats.slice(2).map((stat) => (
              <div key={stat.label}>
                <p className="text-[24px] font-medium text-tesla-black">{stat.value}</p>
                <p className="mt-1 text-[13px] text-[#5c5e62]">{stat.label}</p>
              </div>
            ))}
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
