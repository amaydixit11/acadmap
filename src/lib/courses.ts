import { Course, CourseSupabase } from '@/models/courses'
import { transformCourse } from '@/utils/transform'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://owjpaougwwhxprqtcgzv.supabase.co"
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "secret"
const supabase = createClient(supabaseUrl, supabaseKey)

// Fetch courses from Supabase
export async function fetchCourses(): Promise<CourseSupabase[]> {
    const { data, error } = await supabase.from('courses').select('*');
    
    
    // Handle data and error
    if (error) {
        console.error('Error fetching courses:', error.message);
        return []; // Return an empty array or handle the error as needed
    }

    // Log and return the fetched data
    if (data) {
        // console.table(data); // Optional: For debugging
    }
    return data || [];
}

// Get and transform courses
export async function getCourses(): Promise<Course[]> {
    let sortedCourses: Course[] = [];  // Declare the sortedCourses variable outside the try block

    try {
        const data = await fetchCourses();
        const transformedCourses = data.map((course) => transformCourse(course));
        sortedCourses = transformedCourses.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
        console.error("Error fetching or transforming courses:", error);
        // Handle the error gracefully and return an empty array or default value
        return sortedCourses;
    }

    return sortedCourses;
}
