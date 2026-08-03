import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductHero } from '@/components/sections/tesla/product-hero';
import { ProductOrderCta } from '@/components/sections/tesla/product-order-cta';
import { getSiteContent } from '@/lib/content';
import { IMAGES } from '@/lib/images';
import { LazyImage } from '@/components/ui/lazy-image';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'ChaseHorse training courses — Warehouse Basics and more.',
};

export default function CoursesPage() {
  const courses = getSiteContent().courses;

  return (
    <>
      <ProductHero
        title="Courses"
        eyebrow="Training & Development"
        subtitle="On-job technology training for a future-prepared manpower matrix."
        image={IMAGES.warehouse}
        tone="light"
        primaryCta={{ label: 'Start Learning', href: '/courses/warehouse-basics-training' }}
        secondaryCta={{ label: 'Contact', href: '/contact' }}
      />

      <section className="bg-[#f4f4f4] py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-center text-[28px] font-medium text-[#171a20] md:text-[32px]">
            All Courses
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course.slug} className="group text-center">
                <Link href={`/courses/${course.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-white">
                    <LazyImage
                      src={course.image ?? IMAGES.warehouse}
                      alt={course.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      wrapperClassName="absolute inset-0"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-[17px] font-medium text-[#171a20]">{course.title}</p>
                  <p className="mt-1 text-[13px] text-[#5c5e62]">{course.level}</p>
                </Link>
                <div className="mt-2 flex items-center justify-center gap-3 text-[14px]">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="font-medium text-[#3e6ae1] underline-offset-2 hover:underline"
                  >
                    Learn
                  </Link>
                  <span className="text-[#d0d1d2]">|</span>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Course Enquiry: ${course.title}`)}`}
                    className="font-medium text-[#3e6ae1] underline-offset-2 hover:underline"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductOrderCta
        title="Train your team on GELP"
        description="Custom warehouse and logistics training programs for your workforce."
        primaryLabel="Enquire"
        secondaryLabel="Contact"
        secondaryHref="/contact?subject=Course Enquiry"
      />
    </>
  );
}
