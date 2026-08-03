"use client"

import { useState, useEffect } from "react";
import { Users, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/types/courses";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/utils/cn"; // Assuming you have this utility function to handle conditional class names

interface CourseSidebarProps {
  course: Course;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const [session, setSession] = useState<any>(null); // Supabase session state
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
    };

    fetchSession();

    // Optional: Subscribe to session changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-gray-100 sticky top-20">
        <CardHeader className="bg-primary/5 dark:bg-primary/10">
          <CardTitle className="flex items-center text-gray-800 dark:text-white">
            <Users className="mr-2 text-primary dark:text-primary" /> Course Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Prerequisites Section */}
          <div className="bg-gray-50 rounded-xl p-6 dark:bg-gray-800 dark:border dark:border-gray-700">
            <h3 className="font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
              <CheckCircle className="mr-2 text-green-500 dark:text-green-400" /> Prerequisites
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-muted-foreground">
              <li>{course.prerequisites}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg" disabled>
              <Users className="mr-2 h-5 w-5" /> Join Study Group (upcoming feature)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
