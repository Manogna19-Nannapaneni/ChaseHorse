'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DESIGN_SOLUTION_TIERS,
  formatInr,
  type DesignLeaf,
  type DesignTierColumn,
} from '@/lib/design-solution';
import { useSiteContent } from '@/components/site-content-provider';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'ch-design-solution-checkout';

export function DesignSolutionBuilder() {
  const router = useRouter();
  const content = useSiteContent();
  const tiers: DesignTierColumn[] = content.designSolution?.tiers?.length
    ? (content.designSolution.tiers as DesignTierColumn[])
    : DESIGN_SOLUTION_TIERS;
  const [selected, setSelected] = useState<Record<string, DesignLeaf>>({});

  const selectedList = useMemo(() => Object.values(selected), [selected]);
  const total = useMemo(
    () => selectedList.reduce((sum, item) => sum + item.priceValue, 0),
    [selectedList],
  );

  const toggleLeaf = (leaf: DesignLeaf) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[leaf.id]) delete next[leaf.id];
      else next[leaf.id] = leaf;
      return next;
    });
  };

  const toggleGroup = (children: DesignLeaf[], checked: boolean) => {
    setSelected((prev) => {
      const next = { ...prev };
      for (const child of children) {
        if (checked) next[child.id] = child;
        else delete next[child.id];
      }
      return next;
    });
  };

  const groupState = (children: DesignLeaf[]) => {
    const n = children.filter((c) => selected[c.id]).length;
    if (n === 0) return false;
    if (n === children.length) return true;
    return 'indeterminate' as const;
  };

  const onPay = () => {
    if (selectedList.length === 0) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: selectedList, total }),
      );
    } catch {
      /* ignore */
    }
    router.push('/solutions/design/checkout');
  };

  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 lg:grid-cols-[1fr_340px] lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((col) => (
          <div
            key={col.tier}
            className="overflow-hidden rounded-b-xl border border-[#e5e5e5] bg-white shadow-sm"
          >
            <div className="bg-[#171a20] px-4 py-3 text-center text-[12px] font-semibold tracking-wide text-white">
              {col.title}
            </div>
            <div className="max-h-[70vh] space-y-4 overflow-y-auto p-4">
              {col.groups.map((group) => {
                const state = groupState(group.children);
                return (
                  <div key={group.id}>
                    <label className="flex cursor-pointer items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 accent-[#171a20]"
                        checked={state === true}
                        ref={(el) => {
                          if (el) el.indeterminate = state === 'indeterminate';
                        }}
                        onChange={(e) => toggleGroup(group.children, e.target.checked)}
                      />
                      <span className="text-[14px] font-semibold text-[#171a20]">
                        {group.href ? (
                          <Link href={group.href} className="hover:underline">
                            {group.label}
                          </Link>
                        ) : (
                          group.label
                        )}
                      </span>
                    </label>
                    <ul className="mt-2 space-y-1.5 pl-6">
                      {group.children.map((leaf) => (
                        <li key={leaf.id}>
                          <label className="flex cursor-pointer items-start gap-2">
                            <input
                              type="checkbox"
                              className="mt-0.5 h-3.5 w-3.5 accent-[#171a20]"
                              checked={Boolean(selected[leaf.id])}
                              onChange={() => toggleLeaf(leaf)}
                            />
                            <span className="text-[13px] leading-snug text-[#393c41]">
                              {leaf.label}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-center text-[13px] font-semibold tracking-[0.12em] text-[#171a20]">
          SELECTED SERVICES
        </h2>
        <div className="mt-4 border-t border-[#eee]" />
        <ul className="mt-4 max-h-[40vh] space-y-3 overflow-y-auto">
          {selectedList.length === 0 && (
            <li className="text-center text-[13px] text-[#8e8e8e]">
              Select services from the tiers
            </li>
          )}
          {selectedList.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-3 text-[13px] text-[#5c5e62]"
            >
              <span className="leading-snug">{item.label}</span>
              <span className="shrink-0 font-medium text-[#171a20]">
                {formatInr(item.priceValue)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-[#171a20] pt-4">
          <div className="flex items-center justify-between text-[14px] font-semibold text-[#171a20]">
            <span>Total amount for selected service-</span>
            <span>{formatInr(total)}</span>
          </div>
        </div>
        <button
          type="button"
          disabled={selectedList.length === 0}
          onClick={onPay}
          className={cn(
            'mt-6 w-full rounded-md bg-[#171a20] py-3.5 text-[13px] font-semibold tracking-[0.14em] text-white transition',
            selectedList.length === 0
              ? 'cursor-not-allowed opacity-40'
              : 'hover:bg-[#393c41]',
          )}
        >
          PAY NOW
        </button>
      </aside>
    </div>
  );
}
