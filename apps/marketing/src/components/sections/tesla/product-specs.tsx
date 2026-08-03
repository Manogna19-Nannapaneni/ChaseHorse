'use client';

import { Check } from 'lucide-react';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

export interface SpecStat {
  value: string;
  label: string;
}

interface ProductSpecsProps {
  title?: string;
  stats?: SpecStat[];
  modules?: { number: string; title: string; body: string }[];
  benefits?: { title?: string; items: string[] };
  className?: string;
}

/**
 * Tesla product specs block — large numeric stats, module cards, and benefit list.
 */
export function ProductSpecs({
  title = 'Service Highlights',
  stats,
  modules,
  benefits,
  className,
}: ProductSpecsProps) {
  return (
    <section className={cn('bg-white py-16 md:py-24', className)}>
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="text-center text-[28px] font-medium text-tesla-black md:text-[36px]">
            {title}
          </h2>
        </Reveal>

        {stats && stats.length > 0 && (
          <RevealStagger className="mt-12 grid grid-cols-2 gap-8 border-y border-[#eeeeee] py-10 md:grid-cols-4 md:gap-4">
            {stats.map((stat) => (
              <RevealItem key={stat.label} className="text-center">
                <p className="text-[32px] font-medium leading-none text-tesla-black md:text-[40px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] text-[#5c5e62] md:text-[14px]">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        )}

        {modules && modules.length > 0 && (
          <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <RevealItem
                key={mod.number}
                className="rounded-[4px] bg-[#f4f4f4] p-8 transition duration-300 hover:bg-[#eeeeee]"
              >
                <span className="text-[13px] font-medium text-[#8e8e8e]">{mod.number}</span>
                <h3 className="mt-2 text-[17px] font-medium text-tesla-black">{mod.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#393c41]">{mod.body}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        )}

        {benefits && benefits.items.length > 0 && (
          <div className="mx-auto mt-16 max-w-2xl">
            {benefits.title && (
              <Reveal>
                <h3 className="text-center text-[22px] font-medium text-tesla-black">
                  {benefits.title}
                </h3>
              </Reveal>
            )}
            <RevealStagger className="mt-8 space-y-3">
              {benefits.items.map((item) => (
                <RevealItem
                  key={item}
                  className="flex gap-3 rounded-[4px] bg-[#f4f4f4] px-5 py-4 text-[14px] leading-relaxed text-[#393c41]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[#3e6ae1]">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  {item}
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        )}
      </div>
    </section>
  );
}
