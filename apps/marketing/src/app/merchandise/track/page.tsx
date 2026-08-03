import type { Metadata } from 'next';
import { OrderTrackClient } from '@/components/order-track-client';

export const metadata: Metadata = { title: 'Track Order' };

export default function TrackPage() {
  return (
    <div className="pt-14">
      <OrderTrackClient />
    </div>
  );
}
