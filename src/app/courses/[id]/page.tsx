import { notFound } from 'next/navigation'
import { Course } from '@/models/courses'
import CoursePage from './CoursePage'
import { getCourses } from '@/lib/courses'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePageWrapper({ params }: PageProps) {
  const {id} = await params;

  try {
    const courses = await getCourses()
    const course = courses.find((c) => c.id === id)

    if (!course) {
      notFound()
    }

    return <CoursePage course={course} />
  } catch (error) {
    throw error
  }
}

export async function generateStaticParams() {
  const courses = await getCourses()
  
  return courses.map((course) => ({
    id: course.id,
  }))
}