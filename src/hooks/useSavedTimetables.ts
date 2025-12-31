"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { SavedTimetable, TimetableConfig } from '@/models/resources';
import { toast } from './use-toast';

interface UseSavedTimetablesReturn {
  timetables: SavedTimetable[];
  isLoading: boolean;
  currentTimetable: SavedTimetable | null;
  saveTimetable: (name: string, config: TimetableConfig) => Promise<SavedTimetable | null>;
  loadTimetable: (id: string) => SavedTimetable | null;
  deleteTimetable: (id: string) => Promise<boolean>;
  setDefaultTimetable: (id: string) => Promise<void>;
  makePublic: (id: string) => Promise<boolean>;
  refreshTimetables: () => Promise<void>;
}

export function useSavedTimetables(): UseSavedTimetablesReturn {
  const [timetables, setTimetables] = useState<SavedTimetable[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTimetable, setCurrentTimetable] = useState<SavedTimetable | null>(null);
  const { user } = useAuth();

  const refreshTimetables = useCallback(async () => {
    if (!user?.id) {
      setTimetables([]);
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('saved_timetables')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (!error && data) {
        setTimetables(data as SavedTimetable[]);
        
        // Set default timetable as current if exists
        const defaultTimetable = data.find(t => t.is_default);
        if (defaultTimetable) {
          setCurrentTimetable(defaultTimetable as SavedTimetable);
        }
      }
    } catch (error) {
      console.error('Error fetching timetables:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    refreshTimetables();
  }, [refreshTimetables]);

  const saveTimetable = useCallback(async (name: string, config: TimetableConfig): Promise<SavedTimetable | null> => {
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Not logged in",
        description: "Please log in to save timetables.",
      });
      return null;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('saved_timetables')
        .insert({
          user_id: user.id,
          name,
          config,
          is_default: timetables.length === 0, // First timetable is default
        })
        .select()
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Save failed",
          description: error.message,
        });
        return null;
      }

      const saved = data as SavedTimetable;
      setTimetables(prev => [saved, ...prev]);
      setCurrentTimetable(saved);
      
      toast({
        title: "Timetable saved",
        description: `"${name}" has been saved successfully.`,
      });

      return saved;
    } catch (error) {
      console.error('Error saving timetable:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, timetables.length]);

  const loadTimetable = useCallback((id: string): SavedTimetable | null => {
    const timetable = timetables.find(t => t.id === id);
    if (timetable) {
      setCurrentTimetable(timetable);
      toast({
        title: "Timetable loaded",
        description: `"${timetable.name}" has been loaded.`,
      });
    }
    return timetable || null;
  }, [timetables]);

  const deleteTimetable = useCallback(async (id: string): Promise<boolean> => {
    if (!user?.id) return false;

    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('saved_timetables')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Delete failed",
          description: error.message,
        });
        return false;
      }

      setTimetables(prev => prev.filter(t => t.id !== id));
      if (currentTimetable?.id === id) {
        setCurrentTimetable(null);
      }

      toast({
        title: "Timetable deleted",
        description: "The timetable has been removed.",
      });

      return true;
    } catch (error) {
      console.error('Error deleting timetable:', error);
      return false;
    }
  }, [user?.id, currentTimetable?.id]);

  const setDefaultTimetable = useCallback(async (id: string) => {
    if (!user?.id) return;

    const supabase = createClient();

    try {
      // First, unset all defaults for this user
      await supabase
        .from('saved_timetables')
        .update({ is_default: false })
        .eq('user_id', user.id);

      // Set the new default
      const { error } = await supabase
        .from('saved_timetables')
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.id);

      if (!error) {
        setTimetables(prev => prev.map(t => ({
          ...t,
          is_default: t.id === id,
        })));
        
        toast({
          title: "Default set",
          description: "This timetable will load automatically.",
        });
      }
    } catch (error) {
      console.error('Error setting default timetable:', error);
    }
  }, [user?.id]);

  const makePublic = useCallback(async (id: string): Promise<boolean> => {
    if (!user?.id) return false;

    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('saved_timetables')
        .update({ is_public: true } as any)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to make public",
          description: error.message,
        });
        return false;
      }

      setTimetables(prev => prev.map(t => 
        t.id === id ? { ...t, is_public: true } : t
      ));

      toast({
        title: "Timetable is now public",
        description: "Anyone with the link can view it.",
      });

      return true;
    } catch (error) {
      console.error('Error making timetable public:', error);
      return false;
    }
  }, [user?.id]);

  return {
    timetables,
    isLoading,
    currentTimetable,
    saveTimetable,
    loadTimetable,
    deleteTimetable,
    setDefaultTimetable,
    makePublic,
    refreshTimetables,
  };
}
