import type { Metadata } from 'next';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { IMAGES } from '@/lib/images';
import { getSiteContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Partner with ChaseHorse — apply via form or join WhatsApp.',
};

const FORM = 'https://forms.gle/QmiddiuRkaRLbesEA';
const WA = 'https://wa.me/917337369111';

export default function PartnersPage() {
  const partners = getSiteContent().partners;
  const formUrl = partners?.formUrl ?? FORM;
  const whatsappUrl = partners?.whatsappUrl ?? WA;

  return (
    <>
      <ProductHero
        title={partners?.title ?? 'Partner with ChaseHorse'}
        eyebrow="Partners"
        subtitle={
          partners?.description ??
          'Apply through our partner form or join the WhatsApp group for direct access.'
        }
        image={IMAGES.team}
        tone="light"
        primaryCta={{ label: 'Open Form', href: formUrl }}
        secondaryCta={{ label: 'Contact', href: '/contact' }}
      />

      <section className="bg-[#f4f4f4] px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3e6ae1] text-white">
              <ExternalLink className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-[22px] font-medium text-[#171a20]">Partner Application</h2>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#5c5e62]">
              Submit the Google Form to start your partnership with ChaseHorse.
            </p>
            <span className="mt-6 text-[14px] font-medium text-[#3e6ae1]">Open form →</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
              <MessageCircle className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-[22px] font-medium text-[#171a20]">
              {partners?.whatsappLabel ?? 'WhatsApp Group'}
            </h2>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#5c5e62]">
              Join the partner WhatsApp group for immediate coordination and updates.
            </p>
            <span className="mt-6 text-[14px] font-medium text-[#25D366]">Open WhatsApp →</span>
          </a>
        </div>
      </section>
    </>
  );
}
