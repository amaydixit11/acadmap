'use client';

import { useStudyGroups } from '@/hooks/useStudyGroups';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Loader2, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CourseStudyGroupsProps {
  courseCode: string;
}

export function CourseStudyGroups({ courseCode }: CourseStudyGroupsProps) {
  const { groups, isLoading, joinGroup, isMember } = useStudyGroups(courseCode);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const handleJoin = async (groupId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be signed in to join a study group.",
        action: (
          <Link href="/sign-in">
            <ToastAction altText="Sign In">Sign In</ToastAction>
          </Link>
        ),
      });
      return;
    }
    setJoiningId(groupId);
    await joinGroup(groupId);
    setJoiningId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Active Collectives</h3>
          <p className="text-sm text-slate-500 font-medium font-sans">Connect with peers taking this curriculum.</p>
        </div>
        <Link href={`/groups?course=${courseCode}`}>
          <Button variant="outline" size="sm" className="rounded-xl border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest h-10 px-4">
            Browse All <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] animate-pulse" />
          ))
        ) : groups.length === 0 ? (
          <div className="col-span-full py-12 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4">
               <Users className="w-8 h-8 text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-slate-500 font-bold mb-6">Autonomous group formation is available.</p>
            <Link href="/groups">
              <Button className="rounded-2xl h-12 bg-indigo-600 px-8 font-black uppercase tracking-widest text-xs">
                Launch First Group
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {groups.slice(0, 3).map((group) => {
              const memberStatus = isMember(group.id);
              const isJoining = joiningId === group.id;
              
              return (
                <motion.div
                  key={group.id}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                       <MessageCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    {memberStatus ? (
                      <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 font-black px-3 py-1 rounded-lg uppercase tracking-tight text-[10px]">Active Member</Badge>
                    ) : (
                      <Badge variant="outline" className="border-slate-100 text-slate-400 font-bold rounded-lg px-2 text-[10px] uppercase">Recruiting</Badge>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2 truncate">
                    {group.name}
                  </h4>
                  
                  <div className="flex items-center gap-2 mb-8">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-500">{group.member_count} Scholars</span>
                  </div>

                  {memberStatus ? (
                    <Link href={`/groups/${group.id}`} className="block">
                      <Button className="w-full rounded-2xl h-12 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        Enter Workspace
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full rounded-2xl h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-500/20"
                      onClick={() => handleJoin(group.id)}
                      disabled={isJoining}
                    >
                      {isJoining ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>Request Access</>
                      )}
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
