'use client';

import { useState, useEffect, useCallback } from 'react';
import { StudyGroup, StudyGroupMember } from '@/types/community';
import { createClient } from '@/utils/supabase/client';

interface GroupMessage {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_name?: string;
  user_avatar?: string;
}

export function useStudyGroups(courseCode?: string) {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [myGroups, setMyGroups] = useState<StudyGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);

      // Fetch all public groups
      let query = supabase
        .from('study_groups')
        .select('*')
        .eq('is_public', true)
        .order('member_count', { ascending: false });

      if (courseCode) {
        query = query.eq('course_code', courseCode);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setGroups(data || []);

      // Fetch user's groups
      if (user) {
        const { data: memberData } = await supabase
          .from('study_group_members')
          .select('group_id')
          .eq('user_id', user.id);
        
        const memberGroupIds = (memberData || []).map((m: any) => m.group_id);
        
        if (memberGroupIds.length > 0) {
          const { data: userGroups } = await supabase
            .from('study_groups')
            .select('*')
            .in('id', memberGroupIds)
            .order('created_at', { ascending: false });
          
          setMyGroups(userGroups || []);
        } else {
          setMyGroups([]);
        }
      }
    } catch (err) {
      console.error('Error fetching groups:', err);
      setError('Failed to load groups');
    } finally {
      setIsLoading(false);
    }
  }, [courseCode]);

  const createGroup = useCallback(async (
    name: string,
    description: string,
    courseCode?: string,
    isPublic = true
  ): Promise<string | null> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in');
        return null;
      }

      const { data, error: insertError } = await supabase
        .from('study_groups')
        .insert({
          name,
          description,
          course_code: courseCode || null,
          created_by: user.id,
          is_public: isPublic,
          member_count: 1,
        } as any)
        .select('id')
        .single();

      if (insertError) throw insertError;

      await supabase.from('study_group_members').insert({
        group_id: data.id,
        user_id: user.id,
        role: 'owner',
      } as any);

      await fetchGroups();
      return data.id;
    } catch (err) {
      console.error('Error creating group:', err);
      setError('Failed to create group');
      return null;
    }
  }, [fetchGroups]);

  const joinGroup = useCallback(async (groupId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in');
        return false;
      }

      const { data: existing } = await supabase
        .from('study_group_members')
        .select('id')
        .eq('group_id', groupId)
        .eq('user_id', user.id)
        .single();

      if (existing) return true;

      await supabase.from('study_group_members').insert({
        group_id: groupId,
        user_id: user.id,
        role: 'member',
      } as any);

      await supabase.rpc('increment_group_members', { group_id: groupId });
      await fetchGroups();
      return true;
    } catch (err) {
      console.error('Error joining group:', err);
      return false;
    }
  }, [fetchGroups]);

  const leaveGroup = useCallback(async (groupId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      await supabase
        .from('study_group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', user.id);

      await supabase.rpc('decrement_group_members', { group_id: groupId });
      await fetchGroups();
      return true;
    } catch (err) {
      console.error('Error leaving group:', err);
      return false;
    }
  }, [fetchGroups]);

  const isMember = useCallback((groupId: string) => {
    return myGroups.some(g => g.id === groupId);
  }, [myGroups]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    groups,
    myGroups,
    isLoading,
    error,
    currentUserId,
    createGroup,
    joinGroup,
    leaveGroup,
    isMember,
    refetch: fetchGroups,
  };
}

export function useGroupMembers(groupId: string) {
  const [members, setMembers] = useState<StudyGroupMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMembers = useCallback(async () => {
    if (!groupId) return;
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data } = await supabase
        .from('study_group_members')
        .select('*')
        .eq('group_id', groupId)
        .order('joined_at', { ascending: true });

      // Fetch profiles separately
      const userIds = [...new Set((data || []).map((m: any) => m.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);
      
      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));

      const transformedMembers: StudyGroupMember[] = (data || []).map((m: any) => {
        const profile = profileMap.get(m.user_id);
        return {
          group_id: m.group_id,
          user_id: m.user_id,
          role: m.role,
          joined_at: m.joined_at,
          user_name: profile?.name || 'Anonymous',
          user_avatar: profile?.avatar_url,
        };
      });

      setMembers(transformedMembers);
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { members, isLoading, refetch: fetchMembers };
}

export function useGroupMessages(groupId: string) {
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    if (!groupId) return;
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data } = await supabase
        .from('group_messages')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: true })
        .limit(100);

      // Fetch profiles
      const userIds = [...new Set((data || []).map((m: any) => m.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);
      
      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));

      const transformedMessages: GroupMessage[] = (data || []).map((m: any) => {
        const profile = profileMap.get(m.user_id);
        return {
          id: m.id,
          group_id: m.group_id,
          user_id: m.user_id,
          content: m.content,
          created_at: m.created_at,
          user_name: profile?.name || 'Anonymous',
          user_avatar: profile?.avatar_url,
        };
      });

      setMessages(transformedMessages);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  const sendMessage = useCallback(async (content: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { error } = await supabase
        .from('group_messages')
        .insert({
          group_id: groupId,
          user_id: user.id,
          content,
        } as any);

      if (error) throw error;

      await fetchMessages();
      return true;
    } catch (err) {
      console.error('Error sending message:', err);
      return false;
    }
  }, [groupId, fetchMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, isLoading, sendMessage, refetch: fetchMessages };
}
