import type { Metadata } from 'next';
import { ServicesInventory } from '@/components/sections/tesla/services-inventory';
import { getServicesByTier } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Tier 2 Services',
  description:
    'Strategic & Growth — Digital Advancement, Optimization, Fleet & Driver, ESG, CX.',
};

export default function Tier2Page() {
  return <ServicesInventory services={getServicesByTier(2)} tier={2} />;
}
