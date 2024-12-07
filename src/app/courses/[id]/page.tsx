import { Course } from '@/models/courses';
import CoursePage from './CoursePage';
import { getCourses } from '@/lib/courses';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function CoursePageWrapper({ params, searchParams }: Props) {
  try {
    const courses = await getCourses();
    const course = courses.find((c) => c.id === params.id);

    if (!course) {
      notFound();
    }

    return <CoursePage course={course} />;
  } catch (error) {
    throw error;
  }
}

// Option 1: Using Promise.resolve
export async function generateStaticParams() {
  const courses = await getCourses();
  
  return Promise.resolve(
    courses.map((course) => ({
      id: course.id,
    }))
  );
}

// Option 2: Using async/await (alternative approach)
/*
export async function generateStaticParams() {
  const courses = await getCourses();
  
  const params = courses.map((course) => ({
    id: course.id,
  }));
  
  return params;
}
*/