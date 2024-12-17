// middleware.ts
import { NextResponse } from 'next/server';
import { type NextRequest } from "next/server";

import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from './utils/supabase/server';
import { getUserSessionData } from './lib/auth';
import { createProfileIfNotExist } from './lib/profile';

// export async function middleware(request: NextRequest) {
//   const supabase = await createClient()
//   const user = (await getUserSessionData())?.user
//   if (user) {
//     const { id, user_metadata: { full_name, email, avatar_url } } = user;
//     createProfileIfNotExist(id, email, full_name, avatar_url);
//   }

//   // Step 4: Continue the request to the next middleware or handler
//   return NextResponse.next();
// }

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}


// Optional: specify where this middleware should be applied
// export const config = {
//   matcher: ['/profile', '/'],
// };


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
