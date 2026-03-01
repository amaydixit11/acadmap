'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Users, CheckCircle2, XCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function JoinGroupPage() {
  const params = useParams();
  const code = params.code as string;
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'joining' | 'success' | 'error' | 'not_found'>('loading');
  const [group, setGroup] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function findGroup() {
      const supabase = createClient();
      
      try {
        const { data, error: fetchError } = await supabase
          .from('study_groups')
          .select('*')
          .eq('invite_code', code.toUpperCase())
          .single();

        if (fetchError || !data) {
          setStatus('not_found');
          return;
        }

        setGroup(data);
        setStatus('joining');
      } catch (err) {
        setStatus('not_found');
      }
    }

    findGroup();
  }, [code]);

  const handleJoin = async () => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Redirect to login with return URL
        router.push(`/auth?redirect=/groups/join/${code}`);
        return;
      }

      // Check if already a member
      const { data: existing } = await supabase
        .from('study_group_members')
        .select('id')
        .eq('group_id', group.id)
        .eq('user_id', user.id)
        .single();

      if (existing) {
        // Already a member, redirect to groups
        router.push('/groups');
        return;
      }

      // Join the group
      const { error: joinError } = await supabase
        .from('study_group_members')
        .insert({
          group_id: group.id,
          user_id: user.id,
          role: 'member',
        } as any);

      if (joinError) throw joinError;

      // Increment member count
      await supabase.rpc('increment_group_members', { group_id: group.id });

      setStatus('success');
      
      // Redirect after short delay
      setTimeout(() => {
        router.push('/groups');
      }, 2000);
    } catch (err) {
      console.error('Error joining group:', err);
      setError('Failed to join group. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900">
        <CardContent className="p-8">
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Finding group...</p>
            </div>
          )}

          {status === 'not_found' && (
            <div className="flex flex-col items-center text-center">
              <XCircle className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Invalid Invite Link
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This invite link is invalid or has expired.
              </p>
              <Link href="/groups">
                <Button variant="outline">Browse Groups</Button>
              </Link>
            </div>
          )}

          {status === 'joining' && group && (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Join {group.name}?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {group.description}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {group.member_count} members
              </p>
              <Button onClick={handleJoin} className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Join Group
              </Button>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Joined Successfully!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Redirecting to your groups...
              </p>
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center text-center">
              <XCircle className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Failed to Join
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error}
              </p>
              <Button onClick={handleJoin}>Try Again</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
