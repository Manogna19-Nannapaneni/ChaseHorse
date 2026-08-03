import type { Metadata } from 'next';
import { ServicesInventory } from '@/components/sections/tesla/services-inventory';
import { getServicesByTier } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Tier 3 Services',
  description:
    'Advanced Technology — IT, Operations, Fleet, SCM, Sustainability, Compliance.',
};

export default function Tier3Page() {
  return <ServicesInventory services={getServicesByTier(3)} tier={3} />;
}
