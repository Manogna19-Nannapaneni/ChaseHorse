import type { Metadata } from 'next';
import { MessageCircle, ExternalLink, Truck, Users, MapPin } from 'lucide-react';
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

      {/* Target Audience Section */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="text-[28px] font-medium text-[#171a20]">Who Should Join Us?</h2>
            <p className="mt-3 text-[15px] text-[#5c5e62]">
              We are building a robust network across the logistics ecosystem.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* On-field Professionals */}
            <div className="flex flex-col rounded-2xl bg-[#f4f4f4] p-8">
              <Users className="mb-4 h-6 w-6 text-[#3e6ae1]" />
              <h3 className="text-[18px] font-medium text-[#171a20]">
                On-field Logistics Professionals
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5c5e62]">
                Join us if you are an expert on the ground ensuring smooth daily operations and execution.
              </p>
            </div>

            {/* Transportation Professionals */}
            <div className="flex flex-col rounded-2xl bg-[#f4f4f4] p-8">
              <Truck className="mb-4 h-6 w-6 text-[#3e6ae1]" />
              <h3 className="text-[18px] font-medium text-[#171a20]">
                Transportation Professionals
              </h3>
              <ul className="mt-3 space-y-1.5 text-[14px] text-[#5c5e62]">
                <li>• Transporters</li>
                <li>• Fleet Owners</li>
                <li>• Drivers</li>
                <li>• Freight Traders</li>
                <li>• Freight Financials</li>
              </ul>
            </div>

            {/* Terminal Space */}
            <div className="flex flex-col rounded-2xl bg-[#f4f4f4] p-8">
              <MapPin className="mb-4 h-6 w-6 text-[#3e6ae1]" />
              <h3 className="text-[18px] font-medium text-[#171a20]">
                Truck Terminal Space
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5c5e62]">
                Join us to integrate your truck terminal spaces and infrastructure into our growing network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
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
            <h2 className="mt-6 text-[22px] font-medium text-[#171a20]">Partner Application Form</h2>
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
              {partners?.whatsappLabel ?? 'Join WhatsApp Group'}
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