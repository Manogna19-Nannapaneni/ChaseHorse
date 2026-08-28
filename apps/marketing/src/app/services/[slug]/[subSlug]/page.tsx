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
      <section className="bg-white px-6 py-14">
  <div className="mx-auto max-w-4xl text-center">
    <h2 className="text-[24px] font-semibold text-[#171a20]">
      Objective: {sub.slug === 'contracts-rfq-approvals'
  ? 'Digitize Contract & Procurement Governance'
  : sub.slug === 'inward-consignment-visibility'
    ? 'Improve Inward Consignment Visibility'
    : sub.slug === 'data-analytics-mis'
      ? 'Transform Data Into Actionable Intelligence'
      : sub.slug === 'online-procurement'
        ? 'Digitize Procurement Operations'
        : 'Digitize Transport Operations'}
    </h2>

    <p className="mt-6 text-[16px] leading-relaxed text-[#393c41]">
  {sub.slug === 'contracts-rfq-approvals'
  ? 'Establish a secure, automated framework for managing vendor relationships. This module digitizes document handling, standardizes the Request for Quotation (RFQ) process, and enforces strict hierarchical approval matrices to ensure compliance and mitigate contract risks.'
  : sub.slug === 'inward-consignment-visibility'
    ? 'Eliminate blind spots in your inbound supply chain. This module provides real-time tracking, dynamic ETAs, and proactive warehouse notifications to optimize dock scheduling, reduce wait times, and ensure seamless receipt of goods.'
    : sub.slug === 'data-analytics-mis'
      ? 'Transform operational data into meaningful business intelligence through real-time dashboards, performance reports, and analytical insights. The solution enables organizations to monitor logistics performance, identify trends, optimize resources, and make faster, data-driven decisions.'
      : sub.slug === 'online-procurement'
      ? 'The Online Procurement system digitizes and centralizes purchasing operations, transforming manual buying processes into a streamlined digital workflow. It improves supplier coordination, strengthens approval controls, increases purchasing visibility, and supports efficient procurement decision-making.'
      : 'The TMS is designed to completely overhaul and digitize manual logistics processes. By systematically integrating workflow analysis, data management, and real-time monitoring, the system reduces operational friction, lowers freight costs, and provides total visibility into the supply chain lifecycle.'}
</p>
  </div>
</section>

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

      <ServiceWorkflow
  title={
  sub.slug === 'contracts-rfq-approvals' ||
  sub.slug === 'inward-consignment-visibility' ||
  sub.slug === 'data-analytics-mis'
    ? 'Process Workflow'
    : 'How it works'
}
  steps={
    sub.slug === 'contracts-rfq-approvals'
      ? [
          {
            number: '01',
            title: 'Collect Contract Templates',
            body: 'Gather and digitize all existing legal and procurement contract templates to create a standardized baseline for future vendor agreements.',
          },
          {
            number: '02',
            title: 'Configure Approval Hierarchy',
            body: 'Map out the organizational structure to route documents to the correct stakeholders based on departmental roles and responsibilities.',
          },
          {
            number: '03',
            title: 'Upload Vendor Contracts',
            body: 'Migrate active and legacy vendor contracts into the secure digital repository, indexing them with metadata for easy search and retrieval.',
          },
          {
            number: '04',
            title: 'Create RFQ Templates',
            body: 'Design standardized Request for Quotation forms to ensure vendors submit bids in a uniform format, allowing for accurate side-by-side comparisons.',
          },
          {
            number: '05',
            title: 'Define Approval Levels',
            body: 'Establish financial thresholds that trigger specific managerial or executive sign-offs before a contract or RFQ is finalized.',
          },
          {
            number: '06',
            title: 'Automate Notifications',
            body: 'Set up system triggers that automatically email approvers and vendors when action is required, reducing bottlenecks and idle time.',
          },
          {
            number: '07',
            title: 'Maintain Expiry Alerts',
            body: 'Activate automated timeline alerts to notify the procurement team before a vendor contract expires or requires renewal.',
          },
        ]
      : sub.slug === 'inward-consignment-visibility'
        ? [
            {
              number: '01',
              title: 'Register Suppliers',
              body: 'Onboard vendors and transporters into the portal to ensure standardized communication and mandatory compliance for dispatch reporting.',
            },
            {
              number: '02',
              title: 'Capture Dispatch Info',
              body: 'Log Advance Shipping Notices, vehicle numbers, driver contact details, and precise material quantities at the point of origin.',
            },
            {
              number: '03',
              title: 'Track Shipment Movement',
              body: 'Monitor the geographical progression of the consignment in transit through GPS providers or milestone-based check-ins.',
            },
            {
              number: '04',
              title: 'Update ETA',
              body: 'Dynamically recalculate the Estimated Time of Arrival based on real-time transit data, traffic conditions, and historical routing patterns.',
            },
            {
              number: '05',
              title: 'Notify Warehouse Before Arrival',
              body: 'Trigger automated alerts to the receiving team to prepare loading docks, allocate labor, and stage necessary handling equipment.',
            },
            {
              number: '06',
              title: 'Record Goods Receipt',
              body: 'Log the physical arrival of the vehicle, conduct initial quality and quantity checks, and process the Goods Receipt Note.',
            },
            {
              number: '07',
              title: 'Generate Visibility Reports',
              body: 'Analyze transit times, identify chronic delays, evaluate supplier reliability, and export comprehensive inbound logistics metrics.',
            },
          ]
        : sub.slug === 'data-analytics-mis'
  ? [
            {
        number: '01',
        title: 'Identify KPIs',
        body: 'Collaborate with key stakeholders to define critical success factors, such as freight spend, on-time delivery rates, procurement cycle times, and vendor performance metrics.',
      },
      {
        number: '02',
        title: 'Collect Operational Data',
        body: 'Integrate with all systemic touchpoints (TMS, Procurement workflows, WMS) to automatically aggregate raw, real-time transactional data into a centralized warehouse.',
      },
      {
        number: '03',
        title: 'Clean Data',
        body: 'Perform data sanitization routines. Remove duplicates, resolve missing values, and standardize formatting to ensure absolute accuracy and integrity for all reporting outputs.',
      },
      {
        number: '04',
        title: 'Build Dashboards',
        body: 'Design and deploy interactive visual interfaces that allow users to drill down into specific metrics, filter by custom date ranges, and analyze long-term operational trends.',
      },
      {
        number: '05',
        title: 'Schedule Automatic Reports',
        body: 'Configure the system to autonomously generate and distribute daily, weekly, or monthly tabular and visual reports directly to targeted stakeholder email lists.',
      },
      {
        number: '06',
        title: 'Review with Management',
        body: 'Facilitate structured monthly meetings using the generated MIS reports to analyze performance gaps, align on business strategies, and adjust ongoing operations.',
      },
    ]
: sub.workflow?.length
  ? sub.workflow
  : service.subservices?.find((s) => s.slug === subSlug)?.workflow ?? []
  }
/>

      {(sub.slug === 'contracts-rfq-approvals' ||
  sub.slug === 'inward-consignment-visibility' ||
  sub.slug === 'data-analytics-mis' ||
  (sub.deliverables?.length ?? 0) > 0) && (
  <section className="bg-white px-6 py-14">
    <div className="mx-auto max-w-[1000px]">
      <h2 className="text-center text-[28px] font-medium text-[#171a20]">
        Final Deliverables
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {sub.slug === 'contracts-rfq-approvals' ? (
          <>
            <div className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4">
              <h3 className="text-[16px] font-medium text-[#171a20]">
                Digital Contracts
              </h3>
              <p className="mt-2 text-[14px] text-[#393c41]">
                A secure, searchable, and centralized repository for all active
                and archived vendor agreements.
              </p>
            </div>

            <div className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4">
              <h3 className="text-[16px] font-medium text-[#171a20]">
                Approval Matrix
              </h3>
              <p className="mt-2 text-[14px] text-[#393c41]">
                An automated, rule-based routing engine that enforces
                hierarchical and financial sign-off protocols.
              </p>
            </div>

            <div className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4">
              <h3 className="text-[16px] font-medium text-[#171a20]">
                RFQ Portal
              </h3>
              <p className="mt-2 text-[14px] text-[#393c41]">
                A dedicated interface for generating quotation requests and
                managing standardized vendor bid submissions.
              </p>
            </div>
          </>
          ) : sub.slug === 'inward-consignment-visibility' ? (
  <>
    <div className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4">
      <h3 className="text-[16px] font-medium text-[#171a20]">
        Live Tracking
      </h3>
      <p className="mt-2 text-[14px] text-[#393c41]">
        A geospatial interface showing the real-time location and status of all active inbound shipments.
      </p>
    </div>

    <div className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4">
      <h3 className="text-[16px] font-medium text-[#171a20]">
        ETA Reports
      </h3>
      <p className="mt-2 text-[14px] text-[#393c41]">
        Dynamic forecasting dashboards predicting arrival times to optimize warehouse labor and dock planning.
      </p>
    </div>

    <div className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4">
      <h3 className="text-[16px] font-medium text-[#171a20]">
        Receiving Dashboard
      </h3>
      <p className="mt-2 text-[14px] text-[#393c41]">
        A centralized hub for warehouse managers to process arrivals, log delays, and finalize goods receipts.
      </p>
    </div>
  </>
) : sub.slug === 'data-analytics-mis' ? (
  <>
    <div className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4">
      <h3 className="text-[16px] font-medium text-[#171a20]">
        KPI Dashboard
      </h3>
      <p className="mt-2 text-[14px] text-[#393c41]">
        An interactive, real-time visual interface tracking core operational metrics and high-level business performance.
      </p>
    </div>

    <div className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4">
      <h3 className="text-[16px] font-medium text-[#171a20]">
        MIS Reports
      </h3>
      <p className="mt-2 text-[14px] text-[#393c41]">
        Detailed, granular data summaries designed for mid-level management and departmental tracking and accountability.
      </p>
    </div>

    <div className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4">
      <h3 className="text-[16px] font-medium text-[#171a20]">
        Executive Reports
      </h3>
      <p className="mt-2 text-[14px] text-[#393c41]">
        High-level, strategic overview summaries tailored specifically for C-suite decision-making and long-term planning.
      </p>
    </div>
  </>
) : (
  sub.deliverables?.map((deliverable) => (
            <div
              key={deliverable}
              className="rounded-xl border border-[#eee] bg-[#f8f8f8] px-5 py-4"
            >
              <p className="text-[14px] text-[#393c41]">
                {deliverable}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  </section>
)}
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
