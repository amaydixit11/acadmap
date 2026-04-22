import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ProfileModel } from '@/models/profile';

export interface Contributor extends ProfileModel {
  contributionCount: number;
}

export function useContributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchContributors() {
      try {
        // Fetch all resources to count contributions per uploader
        const { data: resources, error: resError } = await supabase
          .from('resources')
          .select('uploadedBy');

        if (resError) throw resError;

        const counts: Record<string, number> = {};
        const uploaderIds = new Set<string>();
        
        resources?.forEach(r => {
          counts[r.uploadedBy] = (counts[r.uploadedBy] || 0) + 1;
          uploaderIds.add(r.uploadedBy);
        });

        // Fetch profiles for these uploaders
        const { data: profiles, error: profError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', Array.from(uploaderIds));

        if (profError) throw profError;

        const contributorData = profiles?.map(p => ({
          ...p,
          contributionCount: counts[p.id] || 0,
        })) || [];

        // Sort by contribution count
        contributorData.sort((a, b) => b.contributionCount - a.contributionCount);

        setContributors(contributorData as Contributor[]);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContributors();
  }, []);

  return { contributors, isLoading };
}
