'use client';

import { useParams } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { CourseDetailView } from '@/components/courses-dashboard';

export default function PortalCourseDetailClient() {
  const params = useParams<{ slug: string }>();
  return (
    <DashboardShell role="customer">
      <CourseDetailView slug={params.slug} backHref="/portal/courses" />
    </DashboardShell>
  );
}
