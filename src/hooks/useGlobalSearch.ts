"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Course } from '@/types/courses';
import { ResourceModel } from '@/models/resources';
import { ProfileModel } from '@/models/profile';

interface SearchResults {
  courses: Course[];
  resources: ResourceModel[];
  users: ProfileModel[];
}

interface UseGlobalSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResults;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  clearSearch: () => void;
  hasResults: boolean;
}

// Debounce utility
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useGlobalSearch(): UseGlobalSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({
    courses: [],
    resources: [],
    users: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults({ courses: [], resources: [], users: [] });
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const searchTerm = searchQuery.toLowerCase().trim();

    try {
      // Search courses from the static data (we'll do client-side filtering)
      // For now, fetch from API if available, or use cached course data
      
      // Search users/profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name, email, department, profile_image, role')
        .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
        .limit(5);

      // Search resources (from the resources table for uploaded items)
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('resources')
        .select('resourceId, course_code, title, category, type')
        .or(`title.ilike.%${searchTerm}%,course_code.ilike.%${searchTerm}%`)
        .limit(5);

      setResults({
        courses: [], // Will be populated from static course data
        resources: resourcesData as ResourceModel[] || [],
        users: profilesData as ProfileModel[] || [],
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Trigger search on debounced query change
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults({ courses: [], resources: [], users: [] });
  }, []);

  const hasResults = useMemo(() => {
    return results.courses.length > 0 || 
           results.resources.length > 0 || 
           results.users.length > 0;
  }, [results]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    clearSearch,
    hasResults,
  };
}

// Keyboard shortcut hook for Cmd/Ctrl + K
export function useSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onOpen]);
}
