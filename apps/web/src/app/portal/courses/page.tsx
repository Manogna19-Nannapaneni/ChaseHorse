'use client';

import { DashboardShell } from '@/components/layout/dashboard-shell';
import { CoursesDashboard } from '@/components/courses-dashboard';

export default function PortalCoursesPage() {
  return (
    <DashboardShell role="customer">
      <CoursesDashboard basePath="/portal/courses" />
    </DashboardShell>
  );
}
