'use client';

import type { InfoCard } from '@/types/content';
import { getInfoCardImage } from '@/lib/images';
import { TeslaButton } from '@/components/ui/tesla-button';
import { LazyImage } from '@/components/ui/lazy-image';
import { RevealStagger, RevealItem } from '@/components/motion/reveal';

export function InfoCards({ cards }: { cards: InfoCard[] }) {
  return (
    <section className="bg-tesla-cream p-3 sm:p-4">
      <RevealStagger className="grid items-stretch gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <RevealItem
            key={card.title}
            className="relative flex min-h-[190px] overflow-hidden rounded-[6px] bg-tesla-cream-deep p-6 sm:min-h-[220px] md:p-7"
          >
            <div className="relative z-10 flex max-w-[62%] flex-col justify-center sm:max-w-[58%]">
              <h3 className="text-[20px] font-medium leading-tight text-tesla-black sm:text-[22px]">
                {card.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#5c5e62]">{card.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {card.ctas.map((cta) => (
                  <TeslaButton
                    key={cta.label}
                    label={cta.label}
                    variant={cta.variant === 'outline' ? 'secondary-dark' : 'dark'}
                    action={cta.action}
                    href={cta.href}
                    className="min-w-[120px] px-5"
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 right-4 h-[90px] w-[124px] overflow-hidden rounded-[4px] shadow-sm sm:bottom-5 sm:right-5 sm:h-[110px] sm:w-[152px]">
              <LazyImage
                src={getInfoCardImage(card.title, card.image)}
                fallbackSrc={getInfoCardImage(card.title)}
                alt={card.title}
                fill
                wrapperClassName="absolute inset-0"
                className="object-cover"
                sizes="160px"
              />
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
