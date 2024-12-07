import { notFound } from 'next/navigation'
import { Course } from '@/models/courses'
import CoursePage from './CoursePage'
import { getCourses } from '@/lib/courses'

type PageProps = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CoursePageWrapper({
  params,
  searchParams,
}: PageProps) {
  try {
    const courses = await getCourses()
    const course = courses.find((c) => c.id === params.id)

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

