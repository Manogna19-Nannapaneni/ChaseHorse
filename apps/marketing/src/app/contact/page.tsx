import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { ProductOrderCta } from '@/components/sections/tesla/product-order-cta';
import { ContactForm } from '@/components/contact-form';
import { Reveal } from '@/components/motion/reveal';
import { getSiteContent } from '@/lib/content';
import { IMAGES } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact ChaseHorse — letsconnect@chasehorse.com | +91 7337369111 | Bangalore, India',
};

const CONTACT_ITEMS = [
  { icon: MapPin, label: 'Regional HQ', value: 'Bangalore, India', href: undefined },
  {
    icon: Mail,
    label: 'Direct Link',
    value: 'letsconnect@chasehorse.com',
    href: 'mailto:letsconnect@chasehorse.com',
  },
  {
    icon: Phone,
    label: 'Operations',
    value: '+91 7337369111',
    href: 'tel:+917337369111',
  },
] as const;

export default function ContactPage() {
  const content = getSiteContent();

  return (
    <>
      <ProductHero
        title="Contact Us"
        subtitle={content.contact.sections[0]?.body}
        image={IMAGES.contact}
        tone="light"
        primaryCta={{ label: 'Order Now', action: 'quote' }}
        secondaryCta={{ label: 'Email Us', href: 'mailto:letsconnect@chasehorse.com' }}
      />

      <section className="bg-[#f4f4f4] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-[28px] font-medium text-[#171a20] md:text-[32px]">
              We&apos;d love to hear from you
            </h2>
            <div className="mt-8 rounded-[4px] bg-white p-8">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-[4px] bg-[#f4f4f4]" />}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-[28px] font-medium text-[#171a20] md:text-[32px]">
              Come say hello
            </h2>
            <div className="mt-8 space-y-3">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex gap-4 rounded-[4px] bg-white p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#171a20]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#5c5e62]">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-[15px] text-[#171a20] transition-colors hover:text-[#3e6ae1]"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15px] text-[#171a20]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ProductOrderCta
        title="Ready to get started?"
        description="Request a quote and our team will respond within 1–2 business days."
        primaryLabel="Request a Quote"
        secondaryLabel="All Services"
        secondaryHref="/services"
      />
    </>
  );
}
