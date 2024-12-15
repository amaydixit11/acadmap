import { CourseModel } from '@/models/courses'
import { Course } from '@/types/courses'
import { transformCourse } from '@/utils/transform'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://owjpaougwwhxprqtcgzv.supabase.co"
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "secret"
const supabase = createClient(supabaseUrl, supabaseKey)


export async function fetchCourses(): Promise<CourseModel[]> {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) {
        console.error('Error fetching courses:', error.message);
        return []; 
    }
    return data || [];
}


export async function getCourses(): Promise<Course[]> {
    let sortedCourses: Course[] = [];  

    try {
        const data = await fetchCourses();
        const transformedCourses = data.map((course) => transformCourse(course));
        sortedCourses = transformedCourses.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
        console.error("Error fetching or transforming courses:", error);
        
        return sortedCourses;
    }

    return sortedCourses;
}
