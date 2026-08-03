'use client';

import type { HomeFeature, HomepageStat } from '@/types/content';
import { LazyImage } from '@/components/ui/lazy-image';
import { Reveal, RevealItem, RevealStagger } from '@/components/motion/reveal';
import { TeslaButton } from '@/components/ui/tesla-button';

export function FeatureSplit({
  feature,
  stats,
}: {
  feature: HomeFeature;
  stats: HomepageStat[];
}) {
  const featureStats = feature.statLabels
    .map((label) => stats.find((s) => s.label === label))
    .filter(Boolean) as HomepageStat[];
  const heroStat = featureStats[0];

  return (
    <section className="bg-tesla-cream p-3 sm:p-4">
      <Reveal>
        <div className="overflow-hidden rounded-[6px] bg-tesla-cream-deep">
          <div className="grid md:grid-cols-2 md:items-stretch">
            <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-14">
              <h2 className="text-[28px] font-medium leading-tight text-tesla-black md:text-[32px]">
                {feature.title}
              </h2>
              <p className="mt-3 max-w-sm text-[15px] leading-[1.6] text-[#5c5e62]">
                {feature.description}
              </p>

              {heroStat && (
                <RevealStagger className="mt-8">
                  <RevealItem>
                    <p className="text-[40px] font-medium leading-none text-tesla-black">
                      {heroStat.value}
                    </p>
                  </RevealItem>
                  <RevealItem className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
                    {featureStats.map((stat) => (
                      <span key={stat.label} className="text-[13px] text-[#5c5e62]">
                        {stat.label}
                      </span>
                    ))}
                  </RevealItem>
                </RevealStagger>
              )}

              <div className="tesla-cta-row mt-8 max-w-[420px] items-stretch sm:items-center sm:justify-start">
                <TeslaButton
                  label={feature.primaryCta.label}
                  variant="dark"
                  action={feature.primaryCta.action}
                  href={feature.primaryCta.href}
                  compact
                  className="min-w-[180px] sm:min-w-[200px]"
                />
                <TeslaButton
                  label={feature.secondaryCta.label}
                  variant="secondary-dark"
                  href={feature.secondaryCta.href}
                  compact
                  className="min-w-[180px] sm:min-w-[200px]"
                />
              </div>
            </div>

            <div className="relative min-h-[280px] md:min-h-[440px]">
              <LazyImage
                src={feature.image}
                alt={feature.title}
                fill
                parallax
                wrapperClassName="absolute inset-0"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
