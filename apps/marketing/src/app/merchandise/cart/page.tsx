import type { Metadata } from 'next';
import { CartPageClient } from '@/components/cart-page-client';

export const metadata: Metadata = { title: 'Cart' };

export default function CartPage() {
  return (
    <div className="pt-14">
      <CartPageClient />
    </div>
  );
}
