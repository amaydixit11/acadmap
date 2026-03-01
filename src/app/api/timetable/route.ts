import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { parseCSV } from '@/lib/time-table';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'file.csv');
    const csvContent = await fs.readFile(filePath, 'utf-8');
    const courses = await parseCSV(csvContent);
    return NextResponse.json(courses);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch timetable' }, { status: 500 });
  }
}
