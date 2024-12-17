// middleware.ts
import { NextResponse } from 'next/server';
import { type NextRequest } from "next/server";

import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from './utils/supabase/server';
import { getUserSessionData } from './lib/auth';
import { createProfileIfNotExist } from './lib/profile';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
