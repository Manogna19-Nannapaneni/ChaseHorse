/**
 * Design Your Solution checklist — Doc1 tier/subservice tree with INR prices.
 */
export interface DesignLeaf {
  id: string;
  label: string;
  priceValue: number;
  href?: string;
}

export interface DesignGroup {
  id: string;
  label: string;
  href?: string;
  children: DesignLeaf[];
}

export interface DesignTierColumn {
  tier: 1 | 2 | 3;
  title: string;
  groups: DesignGroup[];
}

export const DESIGN_SOLUTION_TIERS: DesignTierColumn[] = [
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
      {
        id: '8d-customer-complaints',
        label: '8D Customer Complaints',
        href: '/services/8d-customer-complaints',
        children: [
          { id: 't1-eway', label: 'Ewaybill Management', priceValue: 10000 },
          { id: 't1-stake', label: 'Stakeholder Collaboration', priceValue: 12000 },
          { id: 't1-close', label: 'Time Based Closure', priceValue: 9000 },
          { id: 't1-rca', label: 'Deep Research & Root Cause Analysis', priceValue: 18000 },
          { id: 't1-cx', label: 'Linked to Customer Experience (CX)', priceValue: 14000 },
          { id: 't1-kpi', label: 'KPI Tracker & Analytics', priceValue: 16000 },
        ],
      },
      {
        id: 'merchandise-ppes',
        label: 'Merchandise & PPEs',
        href: '/services/merchandise-ppes',
        children: [
          { id: 't1-ppe', label: 'On-site PPE Outlet', priceValue: 8000 },
          { id: 't1-hse', label: 'HSE Compliance Checklist', priceValue: 7000 },
        ],
      },
      {
        id: 'returns-management',
        label: 'Returns Management',
        href: '/services/returns-management',
        children: [
          { id: 't1-ret', label: 'Sales Returns Processing', priceValue: 11000 },
          { id: 't1-dmg', label: 'Transit Damages Workflow', priceValue: 10000 },
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
          { id: 't2-ai', label: 'Generic AI Utilization', priceValue: 32000 },
          { id: 't2-train', label: 'On-job Tech Training', priceValue: 15000 },
        ],
      },
      {
        id: 'optimization-tools',
        label: 'Optimization Tools',
        href: '/services/optimization-tools',
        children: [
          { id: 't2-fr', label: 'Freight Optimization', priceValue: 22000 },
          { id: 't2-route', label: 'Routes / Lanes Rationalization', priceValue: 20000 },
          { id: 't2-sup', label: 'Supplier Integration', priceValue: 18000 },
          { id: 't2-cap', label: 'Load & Capacity Optimization', priceValue: 19000 },
          { id: 't2-bill', label: 'Freight Bills Authentication', priceValue: 14000 },
        ],
      },
      {
        id: 'deploy-cdx-pro',
        label: 'DEPLOY – CDX Pro',
        href: '/services/deploy-cdx-pro',
        children: [
          { id: 't2-tech', label: 'Technical On-field Leads', priceValue: 25000 },
          { id: 't2-inc', label: 'On-field Incident Support', priceValue: 18000 },
          { id: 't2-prog', label: 'Training Programs', priceValue: 12000 },
          { id: 't2-stock', label: 'Stock Taking', priceValue: 10000 },
          { id: 't2-qa', label: 'Quality Testing', priceValue: 14000 },
        ],
      },
      {
        id: 'fleet-driver-management',
        label: 'Fleet & Driver Management',
        href: '/services/fleet-driver-management',
        children: [
          { id: 't2-acc', label: 'Accessories for Drivers & Trucks', priceValue: 9000 },
          { id: 't2-maint', label: 'Maintenance', priceValue: 16000 },
          { id: 't2-plan', label: 'Planning & Scheduling', priceValue: 18000 },
        ],
      },
      {
        id: 'esg-sustainability',
        label: 'ESG – Sustainability',
        href: '/services/esg-sustainability',
        children: [
          { id: 't2-esg', label: 'Framework Setup', priceValue: 22000 },
          { id: 't2-dash', label: 'Sustainability Dashboard', priceValue: 20000 },
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
          { id: 't3-ml', label: 'Data Science & Machine Learning', priceValue: 50000 },
        ],
      },
      {
        id: 'operational-advancement',
        label: 'Operational Advancement',
        href: '/services/operational-advancement',
        children: [
          { id: 't3-lash', label: 'Cargo Lashing Techniques', priceValue: 15000 },
          { id: 't3-pal', label: 'Palletized Movement', priceValue: 14000 },
          { id: 't3-bar', label: 'Bar Coding & CAMS', priceValue: 18000 },
          { id: 't3-rob', label: 'Robotics', priceValue: 60000 },
        ],
      },
      {
        id: 'fleet-operations',
        label: 'Fleet Operations',
        href: '/services/fleet-operations',
        children: [
          { id: 't3-truck', label: 'Truck Deployment', priceValue: 22000 },
          { id: 't3-inc', label: 'Incident Management', priceValue: 18000 },
          { id: 't3-exp', label: 'Special Express Delivery', priceValue: 20000 },
          { id: 't3-trans', label: 'Transhipment', priceValue: 16000 },
        ],
      },
      {
        id: 'scm-process',
        label: 'SCM & Process',
        href: '/services/scm-process',
        children: [
          { id: 't3-scm', label: 'Standardizing SCM', priceValue: 25000 },
          { id: 't3-mkt', label: 'Market Report', priceValue: 12000 },
          { id: 't3-vend', label: 'Vendor Sourcing', priceValue: 18000 },
          { id: 't3-proc', label: 'Procurement', priceValue: 20000 },
        ],
      },
    ],
  },
];

export function formatInr(value: number) {
  return `₹ ${value.toLocaleString('en-IN')}`;
}
