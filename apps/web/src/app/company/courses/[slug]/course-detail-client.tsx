'use client';

import { useParams } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { CourseDetailView } from '@/components/courses-dashboard';

export default function CompanyCourseDetailClient() {
  const params = useParams<{ slug: string }>();
  return (
    <DashboardShell role="company_admin">
      <CourseDetailView slug={params.slug} backHref="/company/courses" />
    </DashboardShell>
  );
}
