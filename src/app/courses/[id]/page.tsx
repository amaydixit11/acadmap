import { notFound } from 'next/navigation'
import { Course } from '@/types/courses'
import CoursePage from '../../../components/courses/CoursePage'
import { getCourses } from '@/lib/courses'
import { getUserSessionData } from '@/lib/auth'

// Force dynamic rendering so new courses added to DB are immediately available
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePageWrapper({ params }: PageProps) {
  const {id} = await params;
  const data = await getUserSessionData();
  const user = data?.user;

  try {
    const courses: Course[] = await getCourses()
    const course: Course | undefined = courses.find((c) => c.id === id)
    
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