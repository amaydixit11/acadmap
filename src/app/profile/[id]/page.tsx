import { notFound } from 'next/navigation';
import { getRecordById } from '@/lib/supabase';
import { ProfileModel } from '@/models/profile';
import { PublicProfileView } from '@/components/profile/PublicProfileView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { id } = await params;

  try {
    const profile = await getRecordById('profiles', id) as ProfileModel | null;
    
    if (!profile) {
      notFound();
    }

    return <PublicProfileView profile={profile} />;
  } catch (error) {
    console.error('Error fetching profile:', error);
    notFound();
  }
}
