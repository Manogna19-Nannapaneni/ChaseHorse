import type { RuntimeSiteContent } from '@/components/site-content-provider';
import { getProductImage, IMAGES } from '@/lib/images';
import type { MegaMenuContent } from '@/components/mega-menu';

const PARTNERS_FORM = 'https://forms.gle/QmiddiuRkaRLbesEA';
const WHATSAPP_DEFAULT = 'https://wa.me/917337369111';

/** Doc1 / project44 mega-menu content builders. */
export function buildMegaMenus(content: RuntimeSiteContent): Record<string, MegaMenuContent> {
  const products = content.products ?? [];
  const courses = content.courses ?? [];
  const services = content.services ?? [];
  const insights = content.insights ?? [];
  const partners = content.partners;
  const liveMarket = content.liveMarket;
  const whatsappUrl = partners?.whatsappUrl ?? WHATSAPP_DEFAULT;
  const formUrl = partners?.formUrl ?? PARTNERS_FORM;

  const tierLinks = (tier: 1 | 2 | 3) =>
    services
      .filter((s) => s.tier === tier)
      .map((s) => ({ label: s.title, href: `/services/${s.slug}` }));

  return {
    Platform: {
      layout: 'resources',
      title: 'Platform',
      description:
        'Growth Enabler Logiworkx Platform — Human Interface + Technology + ESG + Market.',
      exploreLabel: 'Explore Platform',
      exploreHref: '/platform',
      items: [
        {
          label: 'Who We Are',
          description: 'Technology-driven logistics and supply chain transformation',
          href: '/platform#who-we-are',
          image: IMAGES.team,
        },
        {
          label: 'Why G.E.L.P?',
          description: 'Value creation · Futuristic · Practical · One transparent platform',
          href: '/platform#why-gelp',
          image: IMAGES.digital,
        },
        {
          label: 'ThunderspeedIn Onboarding',
          description: 'Tier 1 in 24h · Tier 2 in 48h',
          href: '/platform#onboarding',
          image: IMAGES.warehouse,
        },
        {
          label: 'Live Market Intelligence',
          description: 'Market signals and GELP insights for decision-makers',
          href: '/live-market',
          image: IMAGES.featured.supplyChain,
        },
      ],
      railTabs: [
        {
          label: 'Capabilities',
          links: [
            { label: 'ESG & Compliance', href: '/services/esg-sustainability' },
            { label: 'All Services', href: '/services' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          label: 'Get started',
          links: [
            { label: 'Book a Demo', href: '/contact?subject=Platform%20Demo' },
            { label: 'Lets Connect', href: '/contact' },
          ],
        },
      ],
      promo: {
        title: 'Discover GELP',
        description: 'One transparent platform for rapid business scalability.',
        ctaLabel: 'Open Platform',
        href: '/platform',
        image: IMAGES.hero,
      },
    },

    Solutions: {
      layout: 'solutions',
      title: 'Solutions',
      description: 'Get supply chain solutions tailored to your business needs.',
      exploreLabel: 'Design Your Solution',
      exploreHref: '/solutions/design',
      cards: [
        {
          title: 'Design Your Solution',
          body: 'Select Tier 1–3 services and subservices, then pay for your package.',
          href: '/solutions/design',
          image: IMAGES.digital,
        },
        {
          title: 'By Tier',
          body: 'Explore Core, Strategic Growth, and Advanced Technology catalogues.',
          href: '/services',
          image: IMAGES.tiers.tier2,
        },
        {
          title: 'Industries & Verticals',
          body: 'Consulting, operations, growth, technology — beyond courier-only.',
          href: '/platform',
          image: IMAGES.featured.warehouse,
        },
      ],
      railTabs: [
        { label: 'Tier 1', links: tierLinks(1) },
        { label: 'Tier 2', links: tierLinks(2) },
        { label: 'Tier 3', links: tierLinks(3) },
      ],
    },

    'Live Market': {
      layout: 'resources',
      title: 'Live Market',
      description: 'Market intelligence and logistics insights from ChaseHorse GELP.',
      exploreLabel: 'Explore All Insights',
      exploreHref: '/live-market',
      items: (
        liveMarket?.cards ??
        insights.map((i) => ({
          title: i.title,
          body: i.date,
          href: `/live-market#${i.slug}`,
          image: i.image,
        }))
      ).slice(0, 4).map((c) => ({
        label: c.title,
        description: c.body,
        href: c.href,
        image: c.image ?? IMAGES.logistics,
      })),
      railTabs: [
        {
          label: 'Insights',
          links: insights.map((i) => ({
            label: i.title,
            href: `/live-market#${i.slug}`,
          })),
        },
      ],
      promo: {
        title: 'Open Live Market',
        description: 'Browse market cards and GELP intelligence.',
        ctaLabel: 'Explore',
        href: '/live-market',
        image: IMAGES.featured.ship,
      },
    },

    Discover: {
      layout: 'discover',
      columns: [
        {
          title: 'Training',
          links: [
            ...courses.map((c) => ({ label: c.title, href: `/courses/${c.slug}` })),
            { label: 'All Courses', href: '/courses' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'Job Opportunities', href: '/jobs' },
            { label: 'Platform Overview', href: '/platform' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Partners', href: '/partners' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Three-Tiers Model', href: '/#tiers' },
            { label: 'Live Market', href: '/live-market' },
            { label: 'All Services', href: '/services' },
            { label: 'HSE Shop', href: '/merchandise' },
          ],
        },
      ],
    },

    'HSE Shop': {
      layout: 'shop',
      title: 'HSE Shop',
      description: 'Official ChaseHorse apparel, gear, and safety essentials.',
      products: products.slice(0, 4).map((product) => ({
        label: product.name,
        price: product.price,
        href: `/merchandise/${product.slug}`,
        image: getProductImage(product.slug, product.image),
      })),
      promo: {
        title: 'Shop all',
        description: '',
        ctaLabel: 'Open HSE Shop',
        href: '/merchandise',
      },
    },

    Partners: {
      layout: 'partners',
      title: 'Partners',
      description: 'Apply via our partner form or join the WhatsApp group for direct access.',
      actions: [
        { label: 'Partner Application Form', href: formUrl, variant: 'primary', external: true },
        {
          label: partners?.whatsappLabel ?? 'Join WhatsApp Group',
          href: whatsappUrl,
          variant: 'whatsapp',
          external: true,
        },
      ],
    },
  };
}
