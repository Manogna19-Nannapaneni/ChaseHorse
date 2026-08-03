import CompanyCourseDetailClient from './course-detail-client';

export function generateStaticParams() {
  return [
    { slug: 'warehouse-basics-training' },
    { slug: 'onfield-cx-lead' },
    { slug: 'gelp-platform-intro' },
  ];
}

export default function CompanyCourseDetailPage() {
  return <CompanyCourseDetailClient />;
}
