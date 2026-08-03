'use client';

import Link from 'next/link';
import { useCart, formatInr } from '@/components/cart-provider';
import { LazyImage } from '@/components/ui/lazy-image';

export function CartPageClient() {
  const { items, updateQty, removeItem, totalValue, itemKey, totalCount } = useCart();

  if (totalCount === 0) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="text-[28px] font-medium text-[#171a20]">Your cart is empty</h1>
        <Link
          href="/merchandise"
          className="mt-8 inline-flex rounded-lg bg-[#3e6ae1] px-6 py-3 text-[14px] font-medium text-white"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-[28px] font-medium text-[#171a20]">Cart</h1>
      <ul className="mt-8 space-y-4">
        {items.map((item) => {
          const key = itemKey(item);
          return (
            <li
              key={key}
              className="flex gap-4 rounded-2xl border border-[#eee] bg-white p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f4f4f4]">
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  wrapperClassName="absolute inset-0"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#171a20]">{item.name}</p>
                <p className="text-[13px] text-[#5c5e62]">
                  {item.color} · {item.size}
                </p>
                <p className="mt-1 text-[14px]">{formatInr(item.priceValue)}</p>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    className="h-8 w-8 rounded border"
                    onClick={() => updateQty(key, item.qty - 1)}
                  >
                    −
                  </button>
                  <span className="text-[14px]">{item.qty}</span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded border"
                    onClick={() => updateQty(key, item.qty + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="ml-auto text-[13px] text-red-600"
                    onClick={() => removeItem(key)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 flex items-center justify-between border-t border-[#eee] pt-6">
        <p className="text-[18px] font-medium text-[#171a20]">
          Total {formatInr(totalValue)}
        </p>
        <Link
          href="/merchandise/checkout"
          className="rounded-lg bg-[#3e6ae1] px-6 py-3 text-[14px] font-medium text-white"
        >
          Checkout
        </Link>
      </div>
    </section>
  );
}
