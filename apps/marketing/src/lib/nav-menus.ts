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
  const partners = content.partners;

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
      description: 'Growth Enabler Logiworkx Platform — Human Interface + Technology + ESG + Market.',
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
      description: 'Market intelligence, live execution, and logistics insights from ChaseHorse GELP.',
      exploreLabel: 'Explore Live Market',
      exploreHref: '/live-market',
      items: [
        {
          label: 'Book Truck Now',
          description: 'Instant booking and dispatch for full and part truck loads.',
          href: '/live-market/book-truck',
          image: IMAGES.logistics,
        },
        {
          label: 'Book Truck Terminal Space',
          description: 'Reserve dedicated bay, parking, and terminal space instantly.',
          href: '/live-market/terminal-space',
          image: IMAGES.warehouse,
        },
        {
          label: 'Deploy On-field Lead',
          description: 'Assign verified on-ground logistics professionals for seamless operations.',
          href: '/live-market/deploy-lead',
          image: IMAGES.team,
        },
        {
          label: 'Secure Trip Finance',
          description: 'Fast, reliable working capital and fuel finance for active trips.',
          href: '/live-market/trip-finance',
          image: IMAGES.digital,
        },
        {
          label: 'Today Freight Index',
          description: 'Real-time spot rates, lane trends, and market benchmark indices.',
          href: '/live-market/freight-index',
          image: IMAGES.featured.supplyChain,
        },
      ],
      railTabs: [
        {
          label: 'Quick Access',
          links: [
            { label: 'Book Truck Now', href: '/live-market/book-truck' },
            { label: 'Terminal Space', href: '/live-market/terminal-space' },
            { label: 'Freight Index', href: '/live-market/freight-index' },
            { label: 'Trip Finance', href: '/live-market/trip-finance' },
          ],
        },
      ],
      promo: {
        title: 'Live Market Hub',
        description: 'Access real-time freight indices, terminal booking, and trip finance.',
        ctaLabel: 'Open Market',
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
      description: 'Join our growing network of on-field logistics experts, transportation professionals, and terminal operators. Apply via our partner form or join the WhatsApp group for direct access.',
      targetAudience: [
        {
          title: 'Join us - onfield logistics professionals',
          description: 'Join us if you are an expert on the ground ensuring smooth daily operations and execution.',
          icon: 'users',
        },
        {
          title: 'Join us - Transportation professionals',
          roles: [
            'Transporters',
            'Fleet owners',
            'Drivers',
            'Freight traders',
            'Freight financials'
          ],
          icon: 'truck',
        },
        {
          title: 'Join us - Truck terminal space',
          description: 'Join us to integrate your truck terminal spaces and infrastructure into our growing network.',
          icon: 'map-pin',
        },
      ],
      actions: [
        {
          label: 'Partner Application Form',
          href: formUrl,
          variant: 'primary',
          external: true,
        },
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