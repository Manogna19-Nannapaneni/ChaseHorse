import type { Metadata } from 'next';
import { CheckoutClient } from '@/components/checkout-client';

export const metadata: Metadata = { title: 'Checkout' };

export default function CheckoutPage() {
  return (
    <div className="pt-14">
      <CheckoutClient />
    </div>
  );
}
