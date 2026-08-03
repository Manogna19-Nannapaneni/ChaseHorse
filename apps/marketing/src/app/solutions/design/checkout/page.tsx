'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatInr, type DesignLeaf } from '@/lib/design-solution';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const STORAGE_KEY = 'ch-design-solution-checkout';
const ORDERS_KEY = 'ch-design-orders';
const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? '';

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function DesignCheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<DesignLeaf[]>([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [doneId, setDoneId] = useState('');

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { items: DesignLeaf[]; total: number };
      setItems(parsed.items ?? []);
      setTotal(parsed.total ?? 0);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (orderId: string, paymentId?: string) => {
    const order = {
      id: orderId,
      name,
      email,
      phone,
      items,
      total,
      paymentId: paymentId ?? 'offline',
      createdAt: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]') as unknown[];
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...prev]));
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setDoneId(orderId);
  };

  const onPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError('Name, email, and phone are required.');
      return;
    }
    if (items.length === 0) {
      setError('No services selected.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      if (RAZORPAY_KEY) {
        const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!ok || !window.Razorpay) {
          setError('Unable to load Razorpay.');
          setBusy(false);
          return;
        }
        const orderId = `DS${Date.now().toString(36).toUpperCase()}`;
        const rzp = new window.Razorpay({
          key: RAZORPAY_KEY,
          amount: Math.round(total * 100),
          currency: 'INR',
          name: 'ChaseHorse Solutions',
          description: 'Design Your Solution package',
          prefill: { name, email, contact: phone },
          handler: (response: { razorpay_payment_id: string }) => {
            persist(orderId, response.razorpay_payment_id);
            setBusy(false);
          },
          modal: { ondismiss: () => setBusy(false) },
        });
        rzp.open();
        return;
      }
      persist(`DS${Date.now().toString(36).toUpperCase()}`);
      setBusy(false);
    } catch {
      setError('Payment failed.');
      setBusy(false);
    }
  };

  if (doneId) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center pt-28">
        <p className="text-[13px] font-medium uppercase tracking-wide text-[#3e6ae1]">
          Payment confirmed
        </p>
        <h1 className="mt-2 text-[28px] font-medium text-[#171a20]">Thank you, {name}</h1>
        <p className="mt-2 text-[14px] text-[#5c5e62]">
          Order <span className="font-medium text-[#171a20]">{doneId}</span> · {formatInr(total)}
        </p>
        <Link href="/services" className="mt-8 inline-block text-[#3e6ae1]">
          Browse services
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center pt-28">
        <h1 className="text-[28px] font-medium">No package selected</h1>
        <button
          type="button"
          className="mt-6 text-[#3e6ae1]"
          onClick={() => router.push('/solutions/design')}
        >
          Design Your Solution
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 pt-28 lg:grid-cols-2">
      <form onSubmit={onPay} className="space-y-4">
        <h1 className="text-[28px] font-medium text-[#171a20]">Checkout</h1>
        <input
          className="input-line"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="input-line"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-line"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {error && <p className="text-[13px] text-red-600">{error}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-md bg-[#171a20] py-3.5 text-[13px] font-semibold tracking-wide text-white">
          {busy ? 'Processing…' : `PAY NOW · ${formatInr(total)}`}
        </button>
      </form>
      <div className="rounded-xl border border-[#eee] bg-[#fafafa] p-6">
        <h2 className="text-[13px] font-semibold tracking-wide text-[#171a20]">
          SELECTED SERVICES
        </h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 text-[13px] text-[#5c5e62]">
              <span>{item.label}</span>
              <span className="font-medium text-[#171a20]">{formatInr(item.priceValue)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-[#ddd] pt-4 text-[15px] font-semibold">
          Total {formatInr(total)}
        </p>
      </div>
    </section>
  );
}
