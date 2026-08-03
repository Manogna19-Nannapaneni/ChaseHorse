'use client';

import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';

export interface WorkflowStepView {
  number: string;
  title: string;
  body: string;
}

export function ServiceWorkflow({
  title = 'How it works',
  steps,
}: {
  title?: string;
  steps: WorkflowStepView[];
}) {
  if (!steps.length) return null;

  return (
    <section className="bg-[#f4f4f4] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <h2 className="text-center text-[28px] font-medium text-[#171a20] md:text-[32px]">
            {title}
          </h2>
        </Reveal>
        <RevealStagger className="mt-12 space-y-4">
          {steps.map((step) => (
            <RevealItem
              key={step.number + step.title}
              className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm md:gap-8 md:p-8"
            >
              <span className="shrink-0 text-[28px] font-medium leading-none text-[#3e6ae1] md:text-[36px]">
                {step.number}
              </span>
              <div>
                <h3 className="text-[18px] font-medium text-[#171a20]">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#5c5e62]">{step.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
