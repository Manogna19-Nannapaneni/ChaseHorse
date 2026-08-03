'use client';

import { DashboardShell } from '@/components/layout/dashboard-shell';
import { CoursesDashboard } from '@/components/courses-dashboard';

export default function CompanyCoursesPage() {
  return (
    <DashboardShell role="company_admin">
      <CoursesDashboard basePath="/company/courses" />
    </DashboardShell>
  );
}
