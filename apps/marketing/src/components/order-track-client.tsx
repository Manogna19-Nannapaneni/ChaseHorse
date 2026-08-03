'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatInr } from '@/components/cart-provider';

interface StoredOrder {
  id: string;
  email: string;
  name: string;
  total: number;
  status: string;
  createdAt: string;
}

export function OrderTrackClient() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<StoredOrder | null | undefined>(undefined);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const all = JSON.parse(localStorage.getItem('ch-hse-orders') ?? '[]') as StoredOrder[];
      const found = all.find(
        (o) =>
          o.id.toLowerCase() === orderId.trim().toLowerCase() &&
          o.email.toLowerCase() === email.trim().toLowerCase(),
      );
      setOrder(found ?? null);
    } catch {
      setOrder(null);
    }
  };

  return (
    <section className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-[28px] font-medium text-[#171a20]">Track order</h1>
      <form onSubmit={onSearch} className="mt-8 space-y-3">
        <input
          className="input-line"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <input
          className="input-line"
          type="email"
          placeholder="Email used at checkout"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn-tesla-primary w-full max-w-none">
          Look up
        </button>
      </form>
      {order === null && (
        <p className="mt-6 text-[14px] text-red-600">No matching order found.</p>
      )}
      {order && (
        <div className="mt-8 rounded-2xl bg-[#f4f4f4] p-6">
          <p className="text-[14px] font-medium text-[#171a20]">{order.id}</p>
          <p className="mt-1 text-[13px] text-[#5c5e62]">
            {order.status} · {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="mt-3 text-[15px]">{formatInr(order.total)}</p>
          <Link
            href={`/merchandise/confirmation?id=${encodeURIComponent(order.id)}&email=${encodeURIComponent(order.email)}`}
            className="mt-4 inline-block text-[14px] text-[#3e6ae1]"
          >
            View details
          </Link>
        </div>
      )}
    </section>
  );
}
