'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderConfirmationClient } from '@/components/order-confirmation-client';

function ConfirmationInner() {
  const params = useSearchParams();
  const orderId = params.get('id') ?? '';
  const email = params.get('email') ?? undefined;
  return <OrderConfirmationClient orderId={orderId} email={email} />;
}

export default function ConfirmationPage() {
  return (
    <div className="pt-14">
      <Suspense fallback={<div className="p-16 text-center">Loading…</div>}>
        <ConfirmationInner />
      </Suspense>
    </div>
  );
}
