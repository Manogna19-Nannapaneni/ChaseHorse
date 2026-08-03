import fs from 'fs';

const path = 'apps/marketing/content/site.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.navigation = {
  header: [
    { label: 'Platform', href: '/platform' },
    { label: 'Solutions', href: '/services' },
    { label: 'Live Market', href: '/live-market' },
    { label: 'Discover', href: '/courses' },
    { label: 'HSE Shop', href: '/merchandise' },
    { label: 'Partners', href: '/partners' },
  ],
};

data.partners = {
  title: 'Partner with ChaseHorse',
  description: 'Apply via our partner form or join the WhatsApp group for direct access.',
  formUrl: 'https://forms.gle/QmiddiuRkaRLbesEA',
  whatsappUrl: 'https://wa.me/917337369111',
  whatsappLabel: 'Join WhatsApp Group',
};

data.liveMarket = {
  title: 'Live Market Intelligence',
  description: 'Market signals, industry insights, and GELP intelligence for decision-makers.',
  cards: (data.insights || []).map((i) => ({
    title: i.title,
    body: i.date,
    href: `/live-market#${i.slug}`,
    image: i.image,
  })),
};

data.platform = {
  slug: 'platform',
  title: 'Growth Enabler Logiworkx Platform',
  description: 'Human Interface + Technology + ESG-Sustainability + Market',
  heroImage: '/images/port-hero.jpg',
  sections: [],
};

data.home.summaryLinks = [
  { label: 'Platform', href: '/platform' },
  { label: 'Services', href: '/services' },
  { label: 'Discover', href: '/courses' },
  { label: 'Customers', href: '/#customers' },
  { label: 'Benefits', href: '/platform#why-gelp' },
  { label: "What's next", href: '/contact' },
];

data.home.whatsapp = {
  number: '917337369111',
  label: 'WhatsApp',
  avatar: '/images/team-meeting.jpg',
};

data.home.tierOverview = {
  title: 'Three Tiers. One Platform.',
  description:
    'ChaseHorse organizes solutions into three connected tiers so you can start with a digital foundation, scale strategically, and advance into enterprise technology — without rebuilding your stack.',
  connection:
    'Tiers connect as a journey: Tier 1 establishes the foundation, Tier 2 scales people and process, Tier 3 layers advanced technology — combine modules across tiers as you grow.',
  howToChoose:
    'Not sure where to start? Use Design Your Solution in the Solutions menu, or talk to our team.',
  tiers: [
    {
      tier: 1,
      title: 'Core Business Services',
      subtitle: 'Digital foundation',
      audience: 'Teams establishing digital logistics operations',
      description:
        'Rapid strategy deployment — Digital Transformation, CH Deploy, complaints, PPEs, and returns.',
      href: '/services/tier-1',
    },
    {
      tier: 2,
      title: 'Strategic and Growth Services',
      subtitle: 'Scale operations',
      audience: 'Operators ready to optimize and expand',
      description:
        'Fleet and driver management, ESG, CX, optimization tools, and digital advancement.',
      href: '/services/tier-2',
    },
    {
      tier: 3,
      title: 'Advanced Ops and Technology',
      subtitle: 'Enterprise stack',
      audience: 'Enterprises needing AI, IoT, SCM, and compliance',
      description:
        'IT and advanced technologies, fleet operations, SCM process, sustainability, and governance.',
      href: '/services/tier-3',
    },
  ],
};

const videos = [
  '/videos/hero.mp4',
  'https://videos.pexels.com/video-files/4486575/4486575-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4',
];

data.home.heroSlides = [
  {
    id: 'gelp',
    title: 'Introducing GELP Platform',
    subtitle:
      'Business services, consulting, growth, technology and operations — one LaaS platform',
    image: '/images/port-hero.jpg',
    video: videos[0],
    primaryCta: { label: 'Book Now', action: 'quote' },
    secondaryCta: { label: 'Know more', href: '/platform' },
    whatsappCta: {
      label: 'WhatsApp',
      href: 'https://wa.me/917337369111',
      avatar: '/images/team-meeting.jpg',
    },
  },
  {
    id: 'tier1',
    title: 'CH Deploy and Digital Transformation',
    subtitle: 'Tier 1 core services — deploy strategy in 24 hours',
    image: '/images/warehouse-scan.jpg',
    video: videos[1],
    primaryCta: { label: 'Connect now', action: 'quote' },
    secondaryCta: { label: 'Know more', href: '/services/tier-1' },
    whatsappCta: {
      label: 'WhatsApp',
      href: 'https://wa.me/917337369111',
      avatar: '/images/team-meeting.jpg',
    },
  },
  {
    id: 'fleet',
    title: 'Solutions Across Every Vertical',
    subtitle: 'From field CX to advanced AI, IoT, SCM and governance',
    image: '/images/trucks-highway.jpg',
    video: videos[2],
    primaryCta: { label: 'Book Now', action: 'quote' },
    secondaryCta: { label: 'Know more', href: '/services' },
    whatsappCta: {
      label: 'WhatsApp',
      href: 'https://wa.me/917337369111',
      avatar: '/images/team-meeting.jpg',
    },
  },
];

data.products = (data.products || []).map((p) => ({
  ...p,
  priceValue: Number(String(p.price).replace(/[^\d.]/g, '')) || 0,
  category: p.category || 'Apparel',
}));

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');

// Mirror key fields into cms-seed
const seedPath = 'apps/web/src/lib/cms-seed.json';
if (fs.existsSync(seedPath)) {
  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  seed.navigation = data.navigation;
  seed.partners = data.partners;
  seed.liveMarket = data.liveMarket;
  seed.platform = data.platform;
  seed.home = { ...seed.home, ...data.home, heroSlides: data.home.heroSlides };
  seed.products = data.products;
  fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2) + '\n');
  console.log('cms-seed.json updated');
}

console.log('site.json updated');
