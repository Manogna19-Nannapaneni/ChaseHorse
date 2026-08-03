'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, formatInr } from '@/components/cart-provider';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const ORDERS_KEY = 'ch-hse-orders';
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

export function CheckoutClient() {
  const router = useRouter();
  const { items, totalValue, clear, totalCount } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (totalCount === 0) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="text-[28px] font-medium">Cart is empty</h1>
        <Link href="/merchandise" className="mt-6 inline-block text-[#3e6ae1]">
          Back to shop
        </Link>
      </section>
    );
  }

  const persistOrder = (orderId: string, paymentId?: string) => {
    const order = {
      id: orderId,
      email,
      name,
      phone,
      address,
      items,
      total: totalValue,
      status: 'paid',
      paymentId: paymentId ?? 'offline',
      createdAt: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]') as unknown[];
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...prev]));
    } catch {
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order]));
    }
    clear();
    router.push(
      `/merchandise/confirmation?id=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`,
    );
  };

  const onPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !phone) {
      setError('Name, email, and phone are required.');
      return;
    }
    setBusy(true);
    try {
      if (RAZORPAY_KEY) {
        const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!ok || !window.Razorpay) {
          setError('Unable to load Razorpay. Try again.');
          setBusy(false);
          return;
        }
        const orderId = `order_${Date.now().toString(36)}`;
        const rzp = new window.Razorpay({
          key: RAZORPAY_KEY,
          amount: Math.round(totalValue * 100),
          currency: 'INR',
          name: 'ChaseHorse HSE Shop',
          description: 'Merchandise order',
          order_id: undefined,
          prefill: { name, email, contact: phone },
          handler: (response: { razorpay_payment_id: string }) => {
            persistOrder(orderId, response.razorpay_payment_id);
          },
          modal: { ondismiss: () => setBusy(false) },
        });
        rzp.open();
        return;
      }
      // Offline / demo confirmation when Razorpay key is not configured
      const orderId = `CH${Date.now().toString(36).toUpperCase()}`;
      persistOrder(orderId);
    } catch {
      setError('Payment failed. Please try again.');
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 lg:grid-cols-2">
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
        <textarea
          className="input-line min-h-[100px]"
          placeholder="Shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && <p className="text-[13px] text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="btn-tesla-primary w-full max-w-none"
        >
          {busy ? 'Processing…' : `Pay ${formatInr(totalValue)}`}
        </button>
        {!RAZORPAY_KEY && (
          <p className="text-[12px] text-[#8e8e8e]">
            Razorpay key not set — demo checkout will confirm the order locally.
          </p>
        )}
      </form>
      <div className="rounded-2xl bg-[#f4f4f4] p-6">
        <h2 className="text-[18px] font-medium text-[#171a20]">Order summary</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={`${item.slug}-${item.color}-${item.size}`} className="flex justify-between text-[14px]">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{formatInr(item.priceValue * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-[#ddd] pt-4 text-[16px] font-medium">
          Total {formatInr(totalValue)}
        </p>
      </div>
    </section>
  );
}
