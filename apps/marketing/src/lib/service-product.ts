import type { PageContent, TierService } from '@/types/content';
import { getServiceHero, IMAGES } from '@/lib/images';
import type { SpecStat } from '@/components/sections/tesla/product-specs';

const TIER_DEPLOY: Record<1 | 2 | 3, { value: string; label: string }> = {
  1: { value: '24h', label: 'Strategy Deploy' },
  2: { value: '48h', label: 'Operations Scale' },
  3: { value: 'Enterprise', label: 'Tech Stack' },
};

const FEATURE_IMAGES = [
  IMAGES.featured.truck,
  IMAGES.featured.warehouse,
  IMAGES.featured.ship,
  IMAGES.featured.supplyChain,
  IMAGES.digital,
  IMAGES.fleet,
];

export interface ServiceFeaturePanel {
  title: string;
  description: string;
  image: string;
  variant: 'overlay' | 'split';
  imageSide?: 'left' | 'right';
  tone?: 'dark' | 'light';
}

/**
 * Builds Tesla-style feature panels for a service from CMS modules / body copy,
 * with sensible defaults when detail pages only have a short text section.
 */
export function buildServiceFeatures(
  service: TierService,
  page: PageContent | null,
): ServiceFeaturePanel[] {
  const modules = page?.sections.find((s) => s.type === 'modules')?.modules ?? [];
  const text = page?.sections.find((s) => s.type === 'text');
  const hero = getServiceHero(service.slug);

  if (modules.length > 0) {
    return modules.slice(0, 3).map((mod, i) => ({
      title: mod.title,
      description: mod.body,
      image: i === 0 ? hero : FEATURE_IMAGES[i % FEATURE_IMAGES.length],
      variant: (i % 2 === 0 ? 'overlay' : 'split') as 'overlay' | 'split',
      imageSide: (i % 2 === 0 ? 'right' : 'left') as 'left' | 'right',
      tone: 'light' as const,
    }));
  }

  const body = text?.body ?? service.description;
  return [
    {
      title: text?.subtitle ?? `${service.title} in Action`,
      description: body,
      image: hero,
      variant: 'overlay',
      tone: 'light',
    },
    {
      title: 'Built for Scale',
      description:
        'Plug-and-play deployment with live market intelligence, flexible finance options, and highly feasible cost models — engineered for rapid business scalability.',
      image: FEATURE_IMAGES[service.tier % FEATURE_IMAGES.length],
      variant: 'split',
      imageSide: 'right',
    },
    {
      title: 'Operational Readiness',
      description:
        'From on-field CX leads to compliance dashboards, every module is pre-integrated so your team can go live without lengthy implementation cycles.',
      image: FEATURE_IMAGES[(service.tier + 2) % FEATURE_IMAGES.length],
      variant: 'split',
      imageSide: 'left',
    },
  ];
}

export function buildServiceStats(service: TierService): SpecStat[] {
  const deploy = TIER_DEPLOY[service.tier];
  return [
    { value: `Tier ${service.tier}`, label: 'Service Level' },
    { value: deploy.value, label: deploy.label },
    { value: 'GELP', label: 'Platform' },
    { value: '24/7', label: 'Support' },
  ];
}

export function getRelatedServices(
  service: TierService,
  all: TierService[],
  limit = 3,
): TierService[] {
  return all.filter((s) => s.tier === service.tier && s.slug !== service.slug).slice(0, limit);
}
