import { NextResponse } from 'next/server';
import { fetchCourses } from '@/lib/courses';

export async function GET() {
  try {
    const courses = await fetchCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
