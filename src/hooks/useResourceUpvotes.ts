"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/context/AuthContext';

type VoteValue = 1 | -1 | 0; // 1 = upvote, -1 = downvote, 0 = no vote

interface UseResourceVotesReturn {
  score: number;
  userVote: VoteValue;
  isLoading: boolean;
  upvote: () => Promise<void>;
  downvote: () => Promise<void>;
  removeVote: () => Promise<void>;
}

export function useResourceVotes(resourceId: string): UseResourceVotesReturn {
  const [score, setScore] = useState(0);
  const [userVote, setUserVote] = useState<VoteValue>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Fetch vote data
  useEffect(() => {
    const fetchVoteData = async () => {
      if (!resourceId) {
        console.log('[Votes] No resourceId provided');
        return;
      }
      
      console.log('[Votes] Fetching votes for resource:', resourceId);
      const supabase = createClient();
      
      // Get total score (sum of all vote_values)
      const { data: allVotes, error: votesError } = await supabase
        .from('resource_votes')
        .select('vote_value')
        .eq('resource_id', resourceId);
      
      if (!votesError && allVotes) {
        const totalScore = allVotes.reduce((sum, v) => sum + (v.vote_value || 0), 0);
        console.log('[Votes] Total score:', totalScore, 'from', allVotes.length, 'votes');
        setScore(totalScore);
      } else if (votesError) {
        console.error('[Votes] Error fetching votes:', votesError);
      }
      
      // Check user's current vote
      if (user?.id) {
        const { data, error } = await supabase
          .from('resource_votes')
          .select('vote_value')
          .eq('resource_id', resourceId)
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (!error && data) {
          setUserVote(data.vote_value as VoteValue);
        } else {
          setUserVote(0);
        }
      }
    };

    fetchVoteData();
  }, [resourceId, user?.id]);

  const vote = useCallback(async (newVoteValue: 1 | -1) => {
    console.log('[Votes] Attempting vote:', { resourceId, userId: user?.id, newVoteValue, currentVote: userVote });
    
    if (!user?.id || !resourceId || isLoading) {
      console.log('[Votes] Vote blocked:', { hasUser: !!user?.id, hasResourceId: !!resourceId, isLoading });
      return;
    }
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      if (userVote === newVoteValue) {
        // Clicking same vote button = remove vote
        const { error } = await supabase
          .from('resource_votes')
          .delete()
          .eq('resource_id', resourceId)
          .eq('user_id', user.id);

        if (!error) {
          setScore(prev => prev - newVoteValue);
          setUserVote(0);
        }
      } else if (userVote === 0) {
        // No existing vote, insert new
        const { error } = await supabase
          .from('resource_votes')
          .insert({ resource_id: resourceId, user_id: user.id, vote_value: newVoteValue });

        if (!error) {
          setScore(prev => prev + newVoteValue);
          setUserVote(newVoteValue);
        }
      } else {
        // Changing vote (e.g., from upvote to downvote)
        const { error } = await supabase
          .from('resource_votes')
          .update({ vote_value: newVoteValue })
          .eq('resource_id', resourceId)
          .eq('user_id', user.id);

        if (!error) {
          // Score change = new vote - old vote (e.g., -1 - 1 = -2)
          setScore(prev => prev + newVoteValue - userVote);
          setUserVote(newVoteValue);
        }
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, resourceId, userVote, isLoading]);

  const upvote = useCallback(() => vote(1), [vote]);
  const downvote = useCallback(() => vote(-1), [vote]);
  
  const removeVote = useCallback(async () => {
    if (!user?.id || !resourceId || isLoading || userVote === 0) return;
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('resource_votes')
        .delete()
        .eq('resource_id', resourceId)
        .eq('user_id', user.id);

      if (!error) {
        setScore(prev => prev - userVote);
        setUserVote(0);
      }
    } catch (error) {
      console.error('Error removing vote:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, resourceId, userVote, isLoading]);

  return { score, userVote, isLoading, upvote, downvote, removeVote };
}

// Legacy export for backward compatibility
export function useResourceUpvotes(resourceId: string) {
  const { score, userVote, isLoading, upvote } = useResourceVotes(resourceId);
  return {
    upvotesCount: score,
    isUpvoted: userVote === 1,
    isLoading,
    toggleUpvote: upvote,
  };
}

