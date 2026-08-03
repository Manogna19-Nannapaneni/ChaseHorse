import type { TierService, WorkflowStep, SubserviceContent } from '@/types/content';

const DEFAULT_WORKFLOW: WorkflowStep[] = [
  {
    number: '01',
    title: 'Discovery & Scoping',
    body: 'We map your current operations, constraints, and success metrics with stakeholders.',
  },
  {
    number: '02',
    title: 'Solution Design',
    body: 'GELP modules are configured to your tier requirements with clear deliverables.',
  },
  {
    number: '03',
    title: 'On-Field / Platform Deploy',
    body: 'Rapid deployment with CX leads, integrations, and operational readiness checks.',
  },
  {
    number: '04',
    title: 'Measure & Optimize',
    body: 'KPI tracking, feedback loops, and continuous improvement against agreed outcomes.',
  },
];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Ensures every service has workflow, audience, problems, and at least one subservice. */
export function enrichService(service: TierService): TierService {
  const workflow = service.workflow?.length ? service.workflow : DEFAULT_WORKFLOW;
  const audience =
    service.audience ??
    (service.tier === 1
      ? 'Teams establishing a digital logistics foundation'
      : service.tier === 2
        ? 'Operators scaling fleet, CX, and growth programs'
        : 'Enterprises adopting advanced tech, SCM, and governance');

  const problems = service.problems?.length
    ? service.problems
    : [
        `Fragmented processes around ${service.title.toLowerCase()}`,
        'Limited visibility across stakeholders and field teams',
        'Slow deployment cycles and unclear ownership',
      ];

  const features = service.features?.length
    ? service.features
    : [
        'GELP-aligned deployment playbooks',
        'On-field and platform coordination',
        'Transparent KPI and compliance tracking',
      ];

  const benefits = service.benefits?.length
    ? service.benefits
    : [
        'Faster time-to-value with plug-and-play modules',
        'Clear ownership from consult to delivery',
        'Scalable path into adjacent GELP tiers',
      ];

  const outcomes = service.outcomes?.length
    ? service.outcomes
    : [
        'Documented operating model for the service scope',
        'Live dashboards and handoff packages',
        'Measurable improvement against agreed KPIs',
      ];

  let subservices: SubserviceContent[] = service.subservices ?? [];
  if (subservices.length === 0) {
    subservices = [
      {
        slug: 'consult',
        title: `${service.title} Consult`,
        description: `Discovery and design for ${service.title}.`,
        body: `Structured consultation to define scope, constraints, and success criteria for ${service.title}.`,
        workflow: workflow.slice(0, 2),
        audience,
        problems,
        features: features.slice(0, 2),
        benefits: benefits.slice(0, 2),
        outcomes: outcomes.slice(0, 2),
      },
      {
        slug: 'deploy',
        title: `${service.title} Deploy`,
        description: `Implementation and go-live for ${service.title}.`,
        body: `Hands-on deployment of ${service.title} with field and platform resources.`,
        workflow: workflow.slice(1, 4),
        audience,
        features,
        benefits,
        outcomes,
      },
      {
        slug: 'optimize',
        title: `${service.title} Optimize`,
        description: `Continuous improvement for ${service.title}.`,
        body: `Post-go-live optimization, KPI reviews, and expansion into related GELP modules.`,
        workflow: [
          workflow[3] ?? workflow[0],
          {
            number: '05',
            title: 'Expand',
            body: 'Identify adjacent modules across tiers for the next growth cycle.',
          },
        ],
        audience,
        benefits,
        outcomes,
      },
    ].map((s) => ({ ...s, slug: s.slug || slugify(s.title) }));
  }

  return {
    ...service,
    audience,
    problems,
    features,
    benefits,
    outcomes,
    workflow,
    subservices,
  };
}

export function enrichServices(services: TierService[]): TierService[] {
  return services.map(enrichService);
}
