import PortalCourseDetailClient from './course-detail-client';

export function generateStaticParams() {
  return [
    { slug: 'warehouse-basics-training' },
    { slug: 'onfield-cx-lead' },
    { slug: 'gelp-platform-intro' },
  ];
}

export default function PortalCourseDetailPage() {
  return <PortalCourseDetailClient />;
}
