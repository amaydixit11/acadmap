import { notFound } from 'next/navigation'
import { Course, demoCourse } from '@/models/courses'
import CoursePage from './CoursePage'
import { getCourses } from '@/lib/courses'
import { getUserSessionData } from '@/lib/auth'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePageWrapper({ params }: PageProps) {
  const {id} = await params;
  const data = await getUserSessionData();
  const user = data?.user;

  try {
    const courses: Course[] = await getCourses()
    const course: Course = courses.find((c) => c.id === id) ?? demoCourse

    if (!course) {
      notFound()
    }

    return <CoursePage course={course} user={user} />
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