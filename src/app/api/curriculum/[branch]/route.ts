import { NextResponse } from 'next/server';
import { curriculumData } from '@/data/curriculumData';
import { Department } from '@/types/courses';

export async function GET(
  request: Request,
  { params }: { params: { branch: string } }
) {
  try {
    const { branch } = params;
    const branchUpper = branch.toUpperCase();
    
    // Check if the input matches any Department key (e.g., "CSE")
    const departmentFullName = (Department as any)[branchUpper];
    
    const branchCurriculum = curriculumData.filter((c) => {
      const curriculumBranchLower = c.branch.toLowerCase();
      const searchLower = branch.toLowerCase();
      
      return (
        curriculumBranchLower.includes(searchLower) ||
        searchLower.includes(curriculumBranchLower) ||
        (departmentFullName && c.branch === departmentFullName)
      );
    });

    if (branchCurriculum.length === 0) {
      return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
    }

    return NextResponse.json(branchCurriculum);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch branch curriculum' }, { status: 500 });
  }
}
