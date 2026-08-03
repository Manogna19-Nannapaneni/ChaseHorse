'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const COURSES = [
  {
    slug: 'warehouse-basics-training',
    title: 'Warehouse Basics Training',
    level: 'Basic',
    description:
      'Foundational warehouse operations covering inbound, sorting, storage, and outbound processes.',
    progress: 0,
  },
  {
    slug: 'onfield-cx-lead',
    title: 'On-Field CX Lead Orientation',
    level: 'Intermediate',
    description: 'Field leadership, PPE compliance, and customer experience checklists.',
    progress: 0,
  },
  {
    slug: 'gelp-platform-intro',
    title: 'GELP Platform Introduction',
    level: 'Basic',
    description: 'Overview of Growth Enabler Logiworkx Platform modules and onboarding.',
    progress: 0,
  },
];

export function CoursesDashboard({ basePath }: { basePath: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Courses</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Training available for your team. Progress is saved on this device for now.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {COURSES.map((course) => (
          <Link
            key={course.slug}
            href={`${basePath}/${course.slug}`}
            className="rounded-2xl border border-border/80 bg-muted/40 p-5 transition hover:border-primary/30 hover:bg-muted/70 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
              <BookOpen className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {course.level}
            </p>
            <h2 className="mt-1 text-lg font-medium">{course.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{course.progress}% complete</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CourseDetailView({
  slug,
  backHref,
}: {
  slug: string;
  backHref: string;
}) {
  const course = COURSES.find((c) => c.slug === slug) ?? COURSES[0];
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href={backHref} className="text-sm text-primary hover:underline">
        ← All courses
      </Link>
      <div className="rounded-xl border border-border bg-card p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {course.level}
        </p>
        <h1 className="mt-2 text-2xl font-semibold">{course.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{course.description}</p>
        <ol className="mt-8 space-y-3 text-sm">
          <li className="rounded-lg bg-muted/50 px-4 py-3">1. Watch orientation module</li>
          <li className="rounded-lg bg-muted/50 px-4 py-3">2. Complete checklist exercises</li>
          <li className="rounded-lg bg-muted/50 px-4 py-3">3. Mark progress and request certificate</li>
        </ol>
        <button
          type="button"
          className="mt-8 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          onClick={() => {
            try {
              const key = `ch-course-progress:${course.slug}`;
              localStorage.setItem(key, '25');
              alert('Progress started (25%). Full LMS coming soon.');
            } catch {
              /* ignore */
            }
          }}
        >
          Start / continue
        </button>
      </div>
    </div>
  );
}
