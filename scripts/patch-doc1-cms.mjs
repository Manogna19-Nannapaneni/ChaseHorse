import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Import checklist from TS isn't trivial in plain node — duplicate compact seed here
// and keep marketing lib/design-solution.ts as runtime source of truth for the builder UI.
const designSolution = {
  currency: 'INR',
  loginArtUrl:
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
  menuThumbs: {
    platform: '/images/team-meeting.jpg',
    solutions: '/images/warehouse-scan.jpg',
    liveMarket: '/images/port-hero.jpg',
    discover: '/images/digital-transformation.jpg',
    shop: '/images/ppe-kit.jpg',
  },
  tiers: [
    {
      tier: 1,
      title: 'TIER 1 → CORE BUSINESS',
      groups: [
        {
          id: 'digital-transformation',
          label: 'Digital Transformation',
          href: '/services/digital-transformation',
          children: [
            { id: 't1-tms', label: 'Transport Management System (TMS)', priceValue: 42000 },
            { id: 't1-proc', label: 'Online Procurement', priceValue: 18000 },
            { id: 't1-rfq', label: 'Contracts – RFQ & Approvals', priceValue: 15000 },
            { id: 't1-icv', label: 'Inward Consignment Visibility', priceValue: 12000 },
            { id: 't1-mis', label: 'Data Analytics – MIS', priceValue: 20000 },
          ],
        },
        {
          id: 'ch-deploy',
          label: 'CH Deploy',
          href: '/services/ch-deploy',
          children: [
            { id: 't1-wh', label: 'Warehouse Inspection', priceValue: 12500 },
            { id: 't1-unload', label: 'Unloading Site Monitoring', priceValue: 12500 },
            { id: 't1-load', label: 'Loading Site Monitoring', priceValue: 12500 },
            { id: 't1-3pl', label: 'Audits at 3PL Warehouses', priceValue: 29000 },
            { id: 't1-gst', label: 'GST Office Coordination', priceValue: 16500 },
          ],
        },
      ],
    },
    {
      tier: 2,
      title: 'TIER 2 → STRATEGIC & GROWTH',
      groups: [
        {
          id: 'digital-advancement',
          label: 'Digital Advancement',
          href: '/services/digital-advancement',
          children: [
            { id: 't2-tms', label: 'TMS Advanced', priceValue: 35000 },
            { id: 't2-ml', label: 'Data Science & Machine Learning', priceValue: 45000 },
            { id: 't2-auto', label: 'Automations', priceValue: 28000 },
          ],
        },
      ],
    },
    {
      tier: 3,
      title: 'TIER 3 → ADVANCED TECH',
      groups: [
        {
          id: 'it-advanced-technologies',
          label: 'IT & Advanced Tech',
          href: '/services/it-advanced-technologies',
          children: [
            { id: 't3-ai', label: 'AI Deployment', priceValue: 55000 },
            { id: 't3-drone', label: 'Drone Utilization', priceValue: 48000 },
            { id: 't3-iot', label: 'IoT & Automations', priceValue: 42000 },
          ],
        },
      ],
    },
  ],
};

const sitePath = 'apps/marketing/content/site.json';
const data = JSON.parse(fs.readFileSync(sitePath, 'utf8'));

// Prefer full checklist from the marketing TS module via dynamic import of compiled data:
// fall back to reading design-solution.ts is hard — instead load from a JSON export we keep synced.
try {
  const full = require('./apps/marketing/src/lib/design-solution-seed.json');
  if (full?.tiers?.length) designSolution.tiers = full.tiers;
} catch {
  /* keep compact seed */
}

data.designSolution = designSolution;
data.login = {
  artUrl: designSolution.loginArtUrl,
  tagline: 'Logistics intelligence for every mile of your supply chain.',
};

fs.writeFileSync(sitePath, JSON.stringify(data, null, 2) + '\n');

const seedPath = 'apps/web/src/lib/cms-seed.json';
if (fs.existsSync(seedPath)) {
  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  seed.designSolution = designSolution;
  seed.login = data.login;
  seed.platform = data.platform ?? seed.platform;
  seed.navigation = data.navigation ?? seed.navigation;
  fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2) + '\n');
  console.log('cms-seed.json updated with designSolution + login');
}

console.log('site.json updated with designSolution + login');
