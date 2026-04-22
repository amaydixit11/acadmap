"use client"

import { useDiscussions } from "@/hooks/useDiscussions";
import { CommentThread } from "@/components/comments/CommentThread";
import { MessageSquare, Users, Info } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CourseDiscussionsProps {
  courseCode: string;
  user: User | null | undefined;
}

export function CourseDiscussions({ courseCode, user }: CourseDiscussionsProps) {
  const { comments, isLoading, addComment } = useDiscussions(courseCode);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Academic Discourse</h3>
          <p className="text-sm text-slate-500 font-medium">Join the community conversation for {courseCode}.</p>
        </div>
        <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl">
          <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
            {comments.length} Participants
          </span>
        </div>
      </div>

      <Alert className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-2xl">
        <Info className="h-4 w-4 text-indigo-600" />
        <AlertTitle className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Professional Conduct</AlertTitle>
        <AlertDescription className="text-xs text-slate-500 font-medium">
          Maintain academic integrity. Share insights, clarify doubts, and help your peers excel in {courseCode}.
        </AlertDescription>
      </Alert>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm">
        <CommentThread 
          comments={comments}
          onAddComment={addComment}
          currentUserId={user?.id}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
