import { NextResponse } from 'next/server';
import { curriculumData } from '@/data/curriculumData';

export async function GET() {
  try {
    return NextResponse.json(curriculumData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch curriculum' }, { status: 500 });
  }
}
