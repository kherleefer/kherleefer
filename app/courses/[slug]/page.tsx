import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, type StoredCourse } from "@/lib/courseData";
import { type Course } from "@/lib/portfolioData";
import CourseDetailClient from "@components/CourseDetailClient";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kherleefer.netlify.app";
const OG_IMAGE_URL = `${SITE_URL}/img/courseOg.png`;

async function findCourse(slug: string) {
  try {
    return await getCourseBySlug(slug);
  } catch {
    return undefined;
  }
}

function toClientCourse(course: StoredCourse): Course {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    category: course.category,
    level: course.level,
    price: course.price,
    currency: course.currency,
  };
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await findCourse(slug);
  const url = `${SITE_URL}/courses/${slug}`;
  if (!course) {
    return {
      title: "Course not found | Learn with Kherleefer",
      description: "This course could not be found or may have been removed.",
      robots: { index: false },
    };
  }

  return {
    title: `${course.title} | Learn with Kherleefer`,
    description: course.description,
    keywords: [
      "Course",
      course.category,
      course.level,
      "Learn with Kherleefer",
      "Kherleefer",
      "Nigeria",
    ],
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: course.title,
      description: course.description,
      url,
      type: "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1000,
          height: 1000,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
      images: [OG_IMAGE_URL],
      site: "@kherleefer_kk",
    },
    other: {
      "og:image:width": "1000",
      "og:image:height": "1000",
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await findCourse(slug);
  if (!course) notFound();

  return (
    <>
      <CourseDetailClient course={toClientCourse(course)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.description,
            url: `${SITE_URL}/courses/${course.slug}`,
            image: OG_IMAGE_URL,
            category: course.category,
            educationalLevel: course.level,
            offers: {
              "@type": "Offer",
              price: course.price,
              priceCurrency: course.currency,
              availability: "https://schema.org/InStock",
            },
            provider: {
              "@type": "Organization",
              name: "Kherleefer",
              url: SITE_URL,
            },
          }),
        }}
      />
    </>
  );
}