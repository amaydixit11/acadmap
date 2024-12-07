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

// import { Suspense } from 'react'
// import { notFound } from 'next/navigation'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'

// interface PageProps {
//   params: Promise<{ id: string }>
// }

// export default async function CoursePageWrapper({ params }: PageProps) {
//   const { id } = await params
//   const supabase = createServerComponentClient({ cookies })

//   const { data: course } = await supabase
//     .from('courses')
//     .select('*')
//     .eq('id', id)
//     .single()

//   if (!course) {
//     notFound()
//   }

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <h1>{course.title}</h1>
//       {/* Rest of your component */}
//     </Suspense>
//   )
// }

