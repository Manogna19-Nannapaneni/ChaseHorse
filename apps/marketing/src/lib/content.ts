import type { SiteContent, SubserviceContent } from '@/types/content';
import siteData from '@content/site.json';
import { enrichService } from '@/lib/enrich-services';

export function getSiteContent(): SiteContent {
  return siteData as SiteContent;
}

export function getPage(slug: string) {
  const content = getSiteContent();
  return content.pages[slug] ?? null;
}

export function getService(slug: string) {
  return getSiteContent().services.find((s) => s.slug === slug);
}

export function getProduct(slug: string) {
  return getSiteContent().products.find((p) => p.slug === slug);
}

export function getCourse(slug: string) {
  return getSiteContent().courses.find((c) => c.slug === slug);
}

export function getServicesByTier(tier: 1 | 2 | 3) {
  return getSiteContent().services.filter((s) => s.tier === tier);
}

function moduleSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getSubservice(slug: string, subSlug: string): SubserviceContent | null {
  const raw = getService(slug);
  if (!raw) return null;
  const service = enrichService(raw);
  const page = getPage(slug);
  const modules = page?.sections.find((s) => s.type === 'modules')?.modules ?? [];

  const subservice = service.subservices?.find(
  (s) => s.slug === subSlug
);

if (subservice) {
  return {
    ...subservice,
    workflow: subservice.workflow ?? service.workflow,
  };
}

const fromModule = modules.find((m) => moduleSlug(m.title) === subSlug);

if (fromModule) {
  return {
    slug: subSlug,
    title: fromModule.title,
    description: fromModule.body,
    body: fromModule.body,
    workflow: fromModule.workflow ?? service.workflow,
    audience: service.audience,
    problems: service.problems,
    features: [fromModule.title],
    benefits: service.benefits,
    outcomes: service.outcomes,
  };
}

return null;
}
