import { NextResponse } from 'next/server';
import { Department } from '@/types/courses';

export async function GET() {
  try {
    const departments = Object.entries(Department).map(([key, value]) => ({
      shortName: key,
      fullName: value
    }));
    return NextResponse.json(departments);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}
