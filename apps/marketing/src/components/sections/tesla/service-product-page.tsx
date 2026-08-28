'use client';

import Link from 'next/link';
import type { PageContent, TierService } from '@/types/content';
import { getServiceHero } from '@/lib/images';
import {
  buildServiceFeatures,
  buildServiceStats,
  getRelatedServices,
} from '@/lib/service-product';
import { enrichService } from '@/lib/enrich-services';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { FeatureViewport } from '@/components/sections/tesla/feature-viewport';
import { ProductSpecs } from '@/components/sections/tesla/product-specs';
import { RelatedProducts } from '@/components/sections/tesla/related-products';
import { ProductOrderCta } from '@/components/sections/tesla/product-order-cta';
import { ServiceWorkflow } from '@/components/sections/tesla/service-workflow';
import { Reveal } from '@/components/motion/reveal';

interface ServiceProductPageProps {
  service: TierService;
  page: PageContent | null;
  allServices: TierService[];
}

export function ServiceProductPage({
  service: raw,
  page,
  allServices,
}: ServiceProductPageProps) {
  const service = enrichService(raw);
  const heroImage = getServiceHero(service.slug);
  const textSection = page?.sections.find((s) => s.type === 'text');
  const modulesSection = page?.sections.find((s) => s.type === 'modules');
  const listSection = page?.sections.find((s) => s.type === 'list');
  const features = buildServiceFeatures(service, page);
  const stats = buildServiceStats(service);
  const related = getRelatedServices(service, allServices);

  // Prefer page modules as named subservices when present
  const moduleSubs =
    modulesSection?.modules?.map((m) => ({
      slug: m.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      title: m.title,
      description: m.body,
    })) ?? [];

  const subservices =
    moduleSubs.length > 0
      ? moduleSubs
      : (service.subservices ?? []).map((s) => ({
          slug: s.slug,
          title: s.title,
          description: s.description,
        }));

  return (
    <>
      <ProductHero
        title={service.title}
        eyebrow={`Tier ${service.tier}`}
        subtitle={textSection?.subtitle ?? service.description}
        image={heroImage}
        tone="light"
        primaryCta={{ label: 'Book Now', action: 'quote' }}
        secondaryCta={{ label: 'View Workflow', href: '#workflow' }}
      />

      <section className="bg-white px-6 py-14">
        <div className="mx-auto grid max-w-[1000px] gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="text-[22px] font-medium text-[#171a20]">Overview</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#393c41]">
              {textSection?.body ?? service.description}
            </p>
            {service.audience && (
              <p className="mt-4 text-[14px] text-[#5c5e62]">
                <span className="font-medium text-[#171a20]">Designed for:</span> {service.audience}
              </p>
            )}
          </Reveal>
          <Reveal>
            <h2 className="text-[22px] font-medium text-[#171a20]">Problems we solve</h2>
            <ul className="mt-3 space-y-2">
              {(service.problems ?? []).map((p) => (
                <li key={p} className="rounded-lg bg-[#f4f4f4] px-4 py-3 text-[14px] text-[#393c41]">
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {features.map((feature, i) => (
        <FeatureViewport
          key={`${feature.title}-${i}`}
          title={feature.title}
          description={feature.description}
          image={feature.image}
          variant={feature.variant}
          imageSide={feature.imageSide}
          tone={feature.tone}
        />
      ))}

      {subservices.length > 0 && (
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="text-center text-[28px] font-medium text-[#171a20]">Sub-services</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subservices.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/services/${service.slug}/${sub.slug}`}
                  className="rounded-2xl border border-[#eee] p-6 transition hover:border-[#3e6ae1]/40 hover:shadow-md"
                >
                  <h3 className="text-[16px] font-medium text-[#171a20]">{sub.title}</h3>
                  <p className="mt-2 line-clamp-3 text-[13px] text-[#5c5e62]">{sub.description}</p>
                  <span className="mt-4 inline-block text-[13px] font-medium text-[#3e6ae1]">
                    Open workflow →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {(service.deliverables?.length ?? 0) > 0 && (
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="text-center text-[28px] font-medium text-[#171a20]">
              Key Deliverables
              </h2>
              
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {service.deliverables!.map((deliverable) => (
                  <div
                  key={deliverable}
                  className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4"
                  >
                    <p className="text-[14px] text-[#393c41]">
                      {deliverable}
                      </p>
                      </div>
                    ))}
                 </div>
                </div>
              </section>
            )}
      <div id="highlights">
        <ProductSpecs
          title="Features & Benefits"
          stats={stats}
          modules={modulesSection?.modules}
          benefits={{
            title: listSection?.title ?? 'Key benefits',
            items: listSection?.items ?? service.benefits ?? service.features ?? [],
          }}
        />
      </div>

      <div id="workflow">
        <ServiceWorkflow steps={service.workflow ?? []} />
      </div>

      {(service.outcomes?.length ?? 0) > 0 && (
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[28px] font-medium text-[#171a20]">Expected outcomes</h2>
            <ul className="mt-6 space-y-2 text-left">
              {service.outcomes!.map((o) => (
                <li key={o} className="rounded-lg bg-[#f4f4f4] px-4 py-3 text-[14px] text-[#393c41]">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <RelatedProducts services={related} />

      <ProductOrderCta
        title={`Ready for ${service.title}?`}
        description="Book a consult or request a quote — we will map the right GELP workflow."
        primaryLabel="Book Now"
        secondaryLabel="All Services"
        secondaryHref="/services"
      />
    </>
  );
}
