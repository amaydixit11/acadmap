'use client';

import { useStudyGroups } from '@/hooks/useStudyGroups';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CourseStudyGroupsProps {
  courseCode: string;
}

export function CourseStudyGroups({ courseCode }: CourseStudyGroupsProps) {
  const { groups, isLoading, joinGroup, isMember } = useStudyGroups(courseCode);
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const handleJoin = async (groupId: string) => {
    setJoiningId(groupId);
    await joinGroup(groupId);
    setJoiningId(null);
  };

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            Study Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2].map(i => (
              <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            Study Groups
          </CardTitle>
          <Link href={`/groups?course=${courseCode}`}>
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {groups.length === 0 ? (
          <div className="text-center py-6">
            <Users className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-3">No study groups for this course yet</p>
            <Link href="/groups">
              <Button size="sm" variant="outline">
                Create One
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.slice(0, 3).map((group) => {
              const memberStatus = isMember(group.id);
              const isJoining = joiningId === group.id;
              
              return (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {group.name}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Users className="w-3 h-3" />
                      {group.member_count} members
                    </p>
                  </div>
                  
                  {memberStatus ? (
                    <Link href="/groups">
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Joined
                      </Badge>
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleJoin(group.id)}
                      disabled={isJoining}
                    >
                      {isJoining ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <UserPlus className="w-3 h-3 mr-1" />
                          Join
                        </>
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
            
            {groups.length > 3 && (
              <Link href={`/groups?course=${courseCode}`}>
                <Button variant="ghost" size="sm" className="w-full text-gray-500">
                  +{groups.length - 3} more groups
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
