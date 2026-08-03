import type { Metadata } from 'next';
import { DesignSolutionBuilder } from '@/components/design-solution-builder';

export const metadata: Metadata = {
  title: 'Design Your Solution',
  description:
    'Select ChaseHorse Tier 1–3 services and subservices, review pricing, and pay.',
};

export default function DesignSolutionPage() {
  return (
    <div className="bg-[#fafafa] pt-16">
      <div className="border-b border-[#eee] bg-white px-6 py-10 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#3e6ae1]">
          Solutions
        </p>
        <h1 className="mt-2 text-[32px] font-medium text-[#171a20] md:text-[40px]">
          Design Your Solution
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[15px] text-[#5c5e62]">
          Select the services you need across Tier 1–3. Nested modules expand under each
          service — review your package and pay securely.
        </p>
      </div>
      <DesignSolutionBuilder />
    </div>
  );
}
