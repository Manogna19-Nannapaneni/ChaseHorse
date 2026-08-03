import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceProductPage } from '@/components/sections/tesla/service-product-page';
import { getPage, getService, getSiteContent } from '@/lib/content';

export async function generateStaticParams() {
  return getSiteContent().services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  const page = getPage(slug);
  return {
    title: service?.title ?? page?.title ?? 'Service',
    description: service?.description ?? page?.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  const page = getPage(slug);
  if (!service) notFound();

  const allServices = getSiteContent().services;

  return (
    <ServiceProductPage service={service} page={page} allServices={allServices} />
  );
}
