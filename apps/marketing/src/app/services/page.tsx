import type { Metadata } from 'next';
import { ServicesInventory } from '@/components/sections/tesla/services-inventory';
import { getServicesByTier } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services',
  description: 'ChaseHorse GELP service tiers — Core, Strategic, and Advanced operations.',
};

export default function ServicesPage() {
  const services = [
    ...getServicesByTier(1),
    ...getServicesByTier(2),
    ...getServicesByTier(3),
  ];

  return <ServicesInventory services={services} />;
}
