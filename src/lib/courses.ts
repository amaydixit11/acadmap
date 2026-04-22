import { CourseModel } from '@/models/courses'
import { Course } from '@/types/courses'
import { transformCourse } from '@/utils/transform'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://owjpaougwwhxprqtcgzv.supabase.co"
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "secret"
const supabase = createClient(supabaseUrl, supabaseKey)


export async function fetchCourses(): Promise<CourseModel[]> {
    const { data: courses, error: coursesError } = await supabase.from('courses').select('*');
    
    if (coursesError) {
        console.error('Error fetching courses:', coursesError.message);
        return []; 
    }

    // Fetch resource counts for all courses
    const { data: resourceData, error: resourceError } = await supabase
        .from('resources')
        .select('course_code');

    if (resourceError) {
        console.error('Error fetching resource counts:', resourceError.message);
        return courses || [];
    }

    // Aggregate counts
    const countsMap: Record<string, number> = {};
    resourceData?.forEach(r => {
        const code = r.course_code.toUpperCase();
        countsMap[code] = (countsMap[code] || 0) + 1;
    });

    // Merge counts into courses
    const mergedCourses = (courses || []).map(course => ({
        ...course,
        resourceCount: countsMap[course.course_code.toUpperCase()] || 0
    }));

    return mergedCourses;
}


export async function getCourses(): Promise<Course[]> {
    let sortedCourses: Course[] = [];  

    try {
        const data = await fetchCourses();
        const transformedCourses = data.map((course) => transformCourse(course));
        
        // Ensure resourceCount is mapping correctly from CourseModel to Course type
        // if transformCourse doesn't handle it yet.
        sortedCourses = transformedCourses.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
        console.error("Error fetching or transforming courses:", error);
        return sortedCourses;
    }

    return sortedCourses;
}
