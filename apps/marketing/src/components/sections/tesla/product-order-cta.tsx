'use client';

import { TeslaButton } from '@/components/ui/tesla-button';
import { Reveal } from '@/components/motion/reveal';

interface ProductOrderCtaProps {
  title: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/** Tesla bottom "Order Now" band — minimal white section with dual CTAs. */
export function ProductOrderCta({
  title,
  description,
  primaryLabel = 'Order Now',
  secondaryLabel = 'View Inventory',
  secondaryHref = '/services',
}: ProductOrderCtaProps) {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-[28px] font-medium text-tesla-black md:text-[36px]">{title}</h2>
        {description && (
          <p className="mt-4 text-[15px] leading-relaxed text-[#393c41]">{description}</p>
        )}
        <div className="tesla-cta-row mx-auto mt-10">
          <TeslaButton label={primaryLabel} variant="primary" action="quote" compact />
          <TeslaButton
            label={secondaryLabel}
            variant="secondary-dark"
            href={secondaryHref}
            compact
          />
        </div>
      </Reveal>
    </section>
  );
}
