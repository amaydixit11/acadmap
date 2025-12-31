'use client';

import { useState, useEffect, useCallback } from 'react';
import { ResourceRequest } from '@/types/community';
import { createClient } from '@/utils/supabase/client';

export function useResourceRequests() {
  const [requests, setRequests] = useState<ResourceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
      
      const { data, error: fetchError } = await supabase
        .from('resource_requests')
        .select('*')
        .order('upvotes', { ascending: false });

      if (fetchError) throw fetchError;

      let userUpvotes = new Set<string>();
      if (user) {
        const { data: upvoteData } = await supabase
          .from('request_upvotes')
          .select('request_id')
          .eq('user_id', user.id);
        
        userUpvotes = new Set((upvoteData || []).map((u: any) => u.request_id));
      }

      const userIds = [...new Set((data || []).map((r: any) => r.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);
      
      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));

      const transformedRequests: ResourceRequest[] = (data || []).map((r: any) => {
        const profile = profileMap.get(r.user_id);
        return {
          id: r.id,
          title: r.title,
          description: r.description,
          course_code: r.course_code,
          user_id: r.user_id,
          upvotes: r.upvotes || 0,
          status: r.status,
          fulfilled_resource_url: r.fulfilled_resource_url,
          fulfilled_resource_title: r.fulfilled_resource_title,
          fulfilled_at: r.fulfilled_at,
          created_at: r.created_at,
          user_name: profile?.name || 'Anonymous',
          user_avatar: profile?.avatar_url,
          has_upvoted: userUpvotes.has(r.id),
        };
      });

      setRequests(transformedRequests);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createRequest = useCallback(async (
    title: string,
    description: string,
    courseCode?: string
  ): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in');
        return false;
      }

      const { error: insertError } = await supabase
        .from('resource_requests')
        .insert({
          title,
          description,
          course_code: courseCode || null,
          user_id: user.id,
          upvotes: 0,
          status: 'open',
        } as any);

      if (insertError) throw insertError;

      await fetchRequests();
      return true;
    } catch (err) {
      console.error('Error creating request:', err);
      setError('Failed to create request');
      return false;
    }
  }, [fetchRequests]);

  const upvoteRequest = useCallback(async (requestId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in');
        return false;
      }

      const { data: existing } = await supabase
        .from('request_upvotes')
        .select('id')
        .eq('request_id', requestId)
        .eq('user_id', user.id)
        .single();

      if (existing) {
        await supabase.from('request_upvotes').delete().eq('id', existing.id);
        await supabase.rpc('decrement_request_upvotes', { request_id: requestId });
      } else {
        await supabase.from('request_upvotes').insert({
          request_id: requestId,
          user_id: user.id,
        } as any);
        await supabase.rpc('increment_request_upvotes', { request_id: requestId });
      }

      await fetchRequests();
      return true;
    } catch (err) {
      console.error('Error upvoting:', err);
      return false;
    }
  }, [fetchRequests]);

  const markAsFulfilled = useCallback(async (
    requestId: string,
    resourceUrl: string,
    resourceTitle: string
  ): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in');
        return false;
      }

      // Only the requester can mark as fulfilled
      const request = requests.find(r => r.id === requestId);
      if (!request || request.user_id !== user.id) {
        setError('Only the requester can mark as fulfilled');
        return false;
      }

      const { error: updateError } = await supabase
        .from('resource_requests')
        .update({
          status: 'fulfilled',
          fulfilled_resource_url: resourceUrl,
          fulfilled_resource_title: resourceTitle,
          fulfilled_at: new Date().toISOString(),
        } as any)
        .eq('id', requestId);

      if (updateError) throw updateError;

      await fetchRequests();
      return true;
    } catch (err) {
      console.error('Error marking as fulfilled:', err);
      setError('Failed to update request');
      return false;
    }
  }, [fetchRequests, requests]);

  const reopenRequest = useCallback(async (requestId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const request = requests.find(r => r.id === requestId);
      if (!request || request.user_id !== user.id) return false;

      const { error: updateError } = await supabase
        .from('resource_requests')
        .update({
          status: 'open',
          fulfilled_resource_url: null,
          fulfilled_resource_title: null,
          fulfilled_at: null,
        } as any)
        .eq('id', requestId);

      if (updateError) throw updateError;

      await fetchRequests();
      return true;
    } catch (err) {
      console.error('Error reopening:', err);
      return false;
    }
  }, [fetchRequests, requests]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    isLoading,
    error,
    currentUserId,
    createRequest,
    upvoteRequest,
    markAsFulfilled,
    reopenRequest,
    refetch: fetchRequests,
  };
}

