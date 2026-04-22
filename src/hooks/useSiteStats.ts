import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface SiteStats {
  totalResources: number;
  totalCourses: number;
  totalContributors: number;
  isLoading: boolean;
}

export function useSiteStats() {
  const [stats, setStats] = useState<SiteStats>({
    totalResources: 0,
    totalCourses: 0,
    totalContributors: 0,
    isLoading: true,
  });

  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: resourcesCount },
          { count: coursesCount },
          { data: contributorsData }
        ] = await Promise.all([
          supabase.from('resources').select('*', { count: 'exact', head: true }),
          supabase.from('courses').select('*', { count: 'exact', head: true }),
          supabase.from('resources').select('uploadedBy')
        ]);

        const uniqueContributors = new Set(contributorsData?.map(r => r.uploadedBy)).size;

        setStats({
          totalResources: resourcesCount || 0,
          totalCourses: coursesCount || 0,
          totalContributors: uniqueContributors || 0,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching site stats:', error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    }

    fetchStats();
  }, []);

  return stats;
}
