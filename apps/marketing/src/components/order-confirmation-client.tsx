'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatInr } from '@/components/cart-provider';

interface StoredOrder {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  total: number;
  status: string;
  paymentId: string;
  createdAt: string;
  items: { name: string; qty: number; priceValue: number; color: string; size: string }[];
}

export function OrderConfirmationClient({
  orderId,
  email,
}: {
  orderId: string;
  email?: string;
}) {
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem('ch-hse-orders') ?? '[]') as StoredOrder[];
      const found = all.find(
        (o) =>
          o.id === orderId &&
          (!email || o.email.toLowerCase() === email.toLowerCase()),
      );
      setOrder(found ?? null);
    } catch {
      setOrder(null);
    }
  }, [orderId, email]);

  if (!order) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="text-[28px] font-medium">Order not found</h1>
        <p className="mt-3 text-[14px] text-[#5c5e62]">
          Check your order ID and email, or track below.
        </p>
        <Link href="/merchandise/track" className="mt-6 inline-block text-[#3e6ae1]">
          Track order
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-[13px] font-medium uppercase tracking-wide text-[#3e6ae1]">
        Order confirmed
      </p>
      <h1 className="mt-2 text-[32px] font-medium text-[#171a20]">Thank you, {order.name}</h1>
      <p className="mt-2 text-[14px] text-[#5c5e62]">
        Order <span className="font-medium text-[#171a20]">{order.id}</span> · {order.status}
      </p>
      <div className="mt-8 rounded-2xl bg-[#f4f4f4] p-6">
        <ul className="space-y-2 text-[14px]">
          {order.items.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>
                {item.name} ({item.color}/{item.size}) × {item.qty}
              </span>
              <span>{formatInr(item.priceValue * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-[#ddd] pt-4 font-medium">
          Total {formatInr(order.total)}
        </p>
        <p className="mt-4 text-[13px] text-[#5c5e62]">
          Confirmation sent conceptually to {order.email}. Payment ref: {order.paymentId}
        </p>
      </div>
      <div className="mt-8 flex gap-4">
        <Link href="/merchandise" className="text-[14px] font-medium text-[#3e6ae1]">
          Continue shopping
        </Link>
        <Link href="/merchandise/track" className="text-[14px] font-medium text-[#171a20]">
          Track order
        </Link>
      </div>
    </section>
  );
}
