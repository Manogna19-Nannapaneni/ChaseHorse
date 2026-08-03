import type { Metadata } from 'next';
import { ServicesInventory } from '@/components/sections/tesla/services-inventory';
import { getServicesByTier } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Tier 1 Services',
  description:
    'Core Business Services — Digital Transformation, CH Deploy, 8D Complaints, PPEs, Returns.',
};

export default function Tier1Page() {
  return <ServicesInventory services={getServicesByTier(1)} tier={1} />;
}
