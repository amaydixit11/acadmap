'use client';

import { useState, useEffect, useCallback } from 'react';
import { GroupResource, StudySession } from '@/types/community';
import { createClient } from '@/utils/supabase/client';

// Group Resources Hook
export function useGroupResources(groupId: string) {
  const [resources, setResources] = useState<GroupResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResources = useCallback(async () => {
    if (!groupId) return;
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data } = await supabase
        .from('group_resources')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      const userIds = [...new Set((data || []).map((r: any) => r.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);
      
      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));

      const transformed: GroupResource[] = (data || []).map((r: any) => {
        const profile = profileMap.get(r.user_id);
        return {
          ...r,
          user_name: profile?.name || 'Anonymous',
          user_avatar: profile?.avatar_url,
        };
      });

      setResources(transformed);
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  const addResource = useCallback(async (
    title: string,
    url: string,
    description?: string
  ): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { error } = await supabase
        .from('group_resources')
        .insert({
          group_id: groupId,
          user_id: user.id,
          title,
          url,
          description: description || null,
        } as any);

      if (error) throw error;
      await fetchResources();
      return true;
    } catch (err) {
      console.error('Error adding resource:', err);
      return false;
    }
  }, [groupId, fetchResources]);

  const deleteResource = useCallback(async (resourceId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { error } = await supabase
        .from('group_resources')
        .delete()
        .eq('id', resourceId);

      if (error) throw error;
      await fetchResources();
      return true;
    } catch (err) {
      console.error('Error deleting resource:', err);
      return false;
    }
  }, [fetchResources]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return { resources, isLoading, addResource, deleteResource, refetch: fetchResources };
}

// Study Sessions Hook
export function useStudySessions(groupId: string) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    if (!groupId) return;
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('group_id', groupId)
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true });

      const userIds = [...new Set((data || []).map((s: any) => s.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);
      
      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));

      const transformed: StudySession[] = (data || []).map((s: any) => {
        const profile = profileMap.get(s.user_id);
        return {
          ...s,
          user_name: profile?.name || 'Anonymous',
          user_avatar: profile?.avatar_url,
        };
      });

      setSessions(transformed);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  const createSession = useCallback(async (
    title: string,
    scheduledAt: Date,
    durationMinutes: number,
    description?: string,
    location?: string,
    meetingLink?: string
  ): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { error } = await supabase
        .from('study_sessions')
        .insert({
          group_id: groupId,
          user_id: user.id,
          title,
          description: description || null,
          scheduled_at: scheduledAt.toISOString(),
          duration_minutes: durationMinutes,
          location: location || null,
          meeting_link: meetingLink || null,
        } as any);

      if (error) throw error;
      await fetchSessions();
      return true;
    } catch (err) {
      console.error('Error creating session:', err);
      return false;
    }
  }, [groupId, fetchSessions]);

  const deleteSession = useCallback(async (sessionId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { error } = await supabase
        .from('study_sessions')
        .delete()
        .eq('id', sessionId);

      if (error) throw error;
      await fetchSessions();
      return true;
    } catch (err) {
      console.error('Error deleting session:', err);
      return false;
    }
  }, [fetchSessions]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, isLoading, createSession, deleteSession, refetch: fetchSessions };
}

// Pinned Messages (Announcements) Hook
export function useGroupAnnouncements(groupId: string) {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnnouncements = useCallback(async () => {
    if (!groupId) return;
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data } = await supabase
        .from('group_messages')
        .select('*')
        .eq('group_id', groupId)
        .eq('is_pinned', true)
        .order('created_at', { ascending: false });

      const userIds = [...new Set((data || []).map((m: any) => m.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);
      
      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));

      const transformed = (data || []).map((m: any) => {
        const profile = profileMap.get(m.user_id);
        return {
          ...m,
          user_name: profile?.name || 'Anonymous',
          user_avatar: profile?.avatar_url,
        };
      });

      setAnnouncements(transformed);
    } catch (err) {
      console.error('Error fetching announcements:', err);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  const pinMessage = useCallback(async (messageId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { error } = await supabase
        .from('group_messages')
        .update({ is_pinned: true } as any)
        .eq('id', messageId);

      if (error) throw error;
      await fetchAnnouncements();
      return true;
    } catch (err) {
      console.error('Error pinning message:', err);
      return false;
    }
  }, [fetchAnnouncements]);

  const unpinMessage = useCallback(async (messageId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { error } = await supabase
        .from('group_messages')
        .update({ is_pinned: false } as any)
        .eq('id', messageId);

      if (error) throw error;
      await fetchAnnouncements();
      return true;
    } catch (err) {
      console.error('Error unpinning message:', err);
      return false;
    }
  }, [fetchAnnouncements]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return { announcements, isLoading, pinMessage, unpinMessage, refetch: fetchAnnouncements };
}

// Invite Link Hook
export function useGroupInvite(groupId: string) {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInviteCode = useCallback(async () => {
    if (!groupId) return;
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data } = await supabase
        .from('study_groups')
        .select('invite_code')
        .eq('id', groupId)
        .single();

      setInviteCode(data?.invite_code || null);
    } catch (err) {
      console.error('Error fetching invite code:', err);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  const generateInviteCode = useCallback(async (): Promise<string | null> => {
    const supabase = createClient();
    
    try {
      // Generate a random 8-character code
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      const { error } = await supabase
        .from('study_groups')
        .update({ invite_code: code } as any)
        .eq('id', groupId);

      if (error) throw error;
      setInviteCode(code);
      return code;
    } catch (err) {
      console.error('Error generating invite code:', err);
      return null;
    }
  }, [groupId]);

  const getInviteUrl = useCallback(() => {
    if (!inviteCode) return null;
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/groups/join/${inviteCode}`;
    }
    return null;
  }, [inviteCode]);

  useEffect(() => {
    fetchInviteCode();
  }, [fetchInviteCode]);

  return { inviteCode, inviteUrl: getInviteUrl(), isLoading, generateInviteCode };
}
