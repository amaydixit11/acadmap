import { NextRequest, NextResponse } from 'next/server';
import { getRecordByEmail } from '@/lib/supabase';

/**
 * Internal User Lookup API
 * Used by the Hub to aggregate user data across microservices.
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const hubSecret = request.headers.get('X-Hub-Secret');

    // 1. Security Check: Verify Hub Secret
    const internalSecret = process.env.HUB_INTERNAL_SECRET;
    
    if (!hubSecret || hubSecret !== internalSecret) {
        return NextResponse.json(
            { status: 'error', message: 'Unauthorized' },
            { status: 401 }
        );
    }

    // 2. Validate Parameters
    if (!email) {
        return NextResponse.json(
            { status: 'error', message: 'Email parameter is required' },
            { status: 400 }
        );
    }

    try {
        // 3. Lookup User in 'profiles' table
        const profile = await getRecordByEmail('profiles', email);

        if (!profile) {
            return NextResponse.json(
                { status: 'error', message: 'User not found' },
                { status: 404 }
            );
        }

        // 4. Transform and Return Data
        // Mapping Acadmap profile fields to the standard Hub format
        return NextResponse.json({
            status: 'success',
            data: {
                identity: {
                    email: profile.email,
                    name: profile.name,
                    role: profile.role
                },
                // App-specific data for Acadmap
                acadmap: {
                    batch: profile.batch,
                    department: profile.department,
                    program: profile.program,
                    selected_courses: profile.selected_courses || [],
                    completed_courses: profile.completed_courses || [],
                    profile_image: profile.profile_image
                }
            }
        });

    } catch (error) {
        console.error('[Internal API] Error looking up user:', error);
        return NextResponse.json(
            { status: 'error', message: 'Internal server error' },
            { status: 500 }
        );
    }
}
