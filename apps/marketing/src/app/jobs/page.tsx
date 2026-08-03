import type { Metadata } from 'next';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { ProductOrderCta } from '@/components/sections/tesla/product-order-cta';
import { JobListing } from '@/components/job-listing';
import { getSiteContent } from '@/lib/content';
import { IMAGES } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Jobs',
  description: 'Join ChaseHorse — On-Field Logiworkx Lead positions across PAN India.',
};

export default function JobsPage() {
  const content = getSiteContent();

  return (
    <>
      <ProductHero
        title="Careers"
        eyebrow="Join ChaseHorse"
        subtitle="Build the future of logistics technology with us."
        image={IMAGES.jobs}
        tone="light"
        primaryCta={{ label: 'Apply Now', href: '/contact?subject=Job Application' }}
        secondaryCta={{ label: 'Contact', href: '/contact' }}
      />

      <section className="bg-[#f4f4f4] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[900px]">
          <JobListing
            title="On-Field Logiworkx Lead"
            positions="10 open positions"
            description={content.jobs.sections[0]?.body ?? ''}
            location="PAN India — ChaseHorse"
          />
        </div>
      </section>

      <ProductOrderCta
        title="Don't see the right role?"
        description="Send us your profile — we're always looking for logistics talent."
        primaryLabel="Send Application"
        secondaryLabel="Contact"
        secondaryHref="/contact?subject=Job Application"
      />
    </>
  );
}
