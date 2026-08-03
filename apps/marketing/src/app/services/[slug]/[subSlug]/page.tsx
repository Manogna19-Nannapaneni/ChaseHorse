import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { ServiceWorkflow } from '@/components/sections/tesla/service-workflow';
import { ProductOrderCta } from '@/components/sections/tesla/product-order-cta';
import { getPage, getService, getSiteContent, getSubservice } from '@/lib/content';
import { enrichService } from '@/lib/enrich-services';
import { getServiceHero } from '@/lib/images';

export async function generateStaticParams() {
  const services = getSiteContent().services;
  const params: { slug: string; subSlug: string }[] = [];
  for (const raw of services) {
    const service = enrichService(raw);
    const page = getPage(raw.slug);
    const modules = page?.sections.find((s) => s.type === 'modules')?.modules ?? [];
    if (modules.length > 0) {
      for (const m of modules) {
        params.push({
          slug: raw.slug,
          subSlug: m.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
        });
      }
    } else {
      for (const sub of service.subservices ?? []) {
        params.push({ slug: raw.slug, subSlug: sub.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const sub = getSubservice(slug, subSlug);
  return {
    title: sub?.title ?? 'Sub-service',
    description: sub?.description,
  };
}

export default async function SubservicePage({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}) {
  const { slug, subSlug } = await params;
  const raw = getService(slug);
  if (!raw) notFound();
  const service = enrichService(raw);
  const sub = getSubservice(slug, subSlug);
  if (!sub) notFound();

  return (
    <>
      <ProductHero
        title={sub.title}
        eyebrow={`${service.title} · Tier ${service.tier}`}
        subtitle={sub.description}
        image={getServiceHero(slug)}
        tone="light"
        primaryCta={{ label: 'Book Now', action: 'quote' }}
        secondaryCta={{ label: 'Parent service', href: `/services/${slug}` }}
      />

      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <nav className="text-[13px] text-[#5c5e62]">
            <Link href="/services" className="hover:text-[#171a20]">
              Services
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/services/tier-${service.tier}`} className="hover:text-[#171a20]">
              Tier {service.tier}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/services/${slug}`} className="hover:text-[#171a20]">
              {service.title}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#171a20]">{sub.title}</span>
          </nav>
          {sub.body && (
            <p className="mt-8 text-[15px] leading-relaxed text-[#393c41]">{sub.body}</p>
          )}
          {sub.audience && (
            <p className="mt-4 text-[14px] text-[#5c5e62]">
              <span className="font-medium text-[#171a20]">For:</span> {sub.audience}
            </p>
          )}
        </div>
      </section>

      {(sub.problems?.length || sub.features?.length || sub.benefits?.length) && (
        <section className="bg-[#f4f4f4] px-6 py-14">
          <div className="mx-auto grid max-w-[1000px] gap-8 md:grid-cols-3">
            {sub.problems && (
              <div>
                <h2 className="text-[18px] font-medium text-[#171a20]">Problems</h2>
                <ul className="mt-3 space-y-2 text-[13px] text-[#393c41]">
                  {sub.problems.map((p) => (
                    <li key={p} className="rounded-lg bg-white px-3 py-2">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sub.features && (
              <div>
                <h2 className="text-[18px] font-medium text-[#171a20]">Features</h2>
                <ul className="mt-3 space-y-2 text-[13px] text-[#393c41]">
                  {sub.features.map((p) => (
                    <li key={p} className="rounded-lg bg-white px-3 py-2">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sub.benefits && (
              <div>
                <h2 className="text-[18px] font-medium text-[#171a20]">Benefits</h2>
                <ul className="mt-3 space-y-2 text-[13px] text-[#393c41]">
                  {sub.benefits.map((p) => (
                    <li key={p} className="rounded-lg bg-white px-3 py-2">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <ServiceWorkflow steps={sub.workflow ?? service.workflow ?? []} />

      <ProductOrderCta
        title={`Enquire about ${sub.title}`}
        description="Book a consult for this sub-service workflow."
        primaryLabel="Book Now"
        secondaryLabel={service.title}
        secondaryHref={`/services/${slug}`}
      />
    </>
  );
}
