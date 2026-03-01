import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';
import { parseCSV } from '@/lib/time-table';
import SharedTimetableView from './SharedTimetableView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SharedTimetablePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch the shared timetable
  const { data: timetable, error } = await supabase
    .from('saved_timetables')
    .select(`
      id,
      name,
      config,
      created_at,
      is_public,
      user_id,
      profiles (
        name
      )
    `)
    .eq('id', id)
    .eq('is_public', true)
    .single();

  if (error || !timetable) {
    notFound();
  }

  // Extract course codes from config
  const courseCodes: string[] = (timetable as any).config?.course_codes || [];
  const ownerName = (timetable as any).profiles?.name || 'Anonymous';

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Card className="mb-6 bg-white dark:bg-gray-900">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="w-6 h-6 text-blue-500" />
                {timetable.name}
              </CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Shared by {ownerName}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(timetable.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Badge variant="secondary">
              {courseCodes.length} courses
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {courseCodes.length > 0 ? (
            <SharedTimetableView courseCodes={courseCodes} />
          ) : (
            <p className="text-center py-8 text-gray-500">
              This timetable has no courses.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
