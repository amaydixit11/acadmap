'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp, Heart, Upload, Crown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar_url: string | null;
  score: number;
  rank: number;
}

const rankColors = {
  1: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-300',
  2: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border-gray-300',
  3: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300',
};

const rankIcons = {
  1: Crown,
  2: Medal,
  3: Award,
};

function LeaderboardRow({ entry, index, type }: { entry: LeaderboardEntry; index: number; type: 'uploads' | 'upvotes' }) {
  const RankIcon = rankIcons[entry.rank as keyof typeof rankIcons];
  const isTopThree = entry.rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/profile/${entry.id}`}>
        <div
          className={cn(
            "flex items-center gap-4 p-4 rounded-lg transition-all duration-200",
            "hover:bg-gray-50 dark:hover:bg-gray-800/50",
            "border",
            isTopThree 
              ? rankColors[entry.rank as keyof typeof rankColors]
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          )}
        >
          {/* Rank */}
          <div className="w-10 flex-shrink-0 text-center">
            {RankIcon ? (
              <RankIcon className={cn(
                "w-6 h-6 mx-auto",
                entry.rank === 1 && "text-amber-500",
                entry.rank === 2 && "text-gray-500",
                entry.rank === 3 && "text-orange-600"
              )} />
            ) : (
              <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                #{entry.rank}
              </span>
            )}
          </div>

          {/* Avatar */}
          <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
            <AvatarImage src={entry.avatar_url || undefined} alt={entry.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              {entry.name?.charAt(0)?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate text-gray-900 dark:text-white">
              {entry.name || 'Anonymous'}
            </p>
          </div>

          {/* Score */}
          <div className="flex items-center gap-2">
            {type === 'uploads' ? (
              <Upload className="w-4 h-4 text-blue-500" />
            ) : (
              <Heart className="w-4 h-4 text-pink-500" />
            )}
            <Badge variant="secondary" className="font-mono">
              {entry.score}
            </Badge>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const [contributors, setContributors] = useState<LeaderboardEntry[]>([]);
  const [appreciated, setAppreciated] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'all' | 'month'>('all');

  useEffect(() => {
    async function fetchLeaderboard() {
      setIsLoading(true);
      const supabase = createClient();

      try {
        // Get all profiles for now (simplified)
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, name, avatar_url')
          .limit(50);

        if (!profiles) {
          setIsLoading(false);
          return;
        }

        // For each profile, count their upvotes received
        const enrichedProfiles = await Promise.all(
          profiles.map(async (profile) => {
            // Count upvotes this user has RECEIVED (on their uploads)
            const { count: upvotesReceived } = await supabase
              .from('resource_upvotes')
              .select('*', { count: 'exact', head: true })
              .eq('user_id', profile.id);

            return {
              ...profile,
              upvotes: upvotesReceived || 0,
              uploads: 0, // Would need resource tracking
            };
          })
        );

        // Sort by upvotes for "Most Appreciated"
        const sortedByUpvotes = [...enrichedProfiles]
          .sort((a, b) => b.upvotes - a.upvotes)
          .slice(0, 20)
          .map((p, i) => ({
            id: p.id,
            name: p.name,
            avatar_url: p.avatar_url,
            score: p.upvotes,
            rank: i + 1,
          }));

        setAppreciated(sortedByUpvotes);

        // For contributors, we'd need upload tracking
        // For now, use upvotes as proxy
        setContributors(sortedByUpvotes);

      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeaderboard();
  }, [timeframe]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="w-10 h-10 text-amber-500" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
            Leaderboard
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Celebrating our top contributors and most appreciated members
        </p>
      </motion.div>

      <Tabs defaultValue="appreciated" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="appreciated" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Most Appreciated
          </TabsTrigger>
          <TabsTrigger value="contributors" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Top Contributors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appreciated">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                <Heart className="w-5 h-5" />
                Most Appreciated
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : appreciated.length > 0 ? (
                appreciated.map((entry, idx) => (
                  <LeaderboardRow key={entry.id} entry={entry} index={idx} type="upvotes" />
                ))
              ) : (
                <p className="text-center py-8 text-gray-500">No data yet. Start upvoting resources!</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributors">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <TrendingUp className="w-5 h-5" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : contributors.length > 0 ? (
                contributors.map((entry, idx) => (
                  <LeaderboardRow key={entry.id} entry={entry} index={idx} type="uploads" />
                ))
              ) : (
                <p className="text-center py-8 text-gray-500">No contributors yet. Be the first!</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
