"use client"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useProfileContext } from "@/context/ProfileContext";
import ProfileHeader from "./ProfileHeader";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";
import ProfileStats from "./ProfileStats";
import ProfileSavedTimetables from "./ProfileSavedTimetables";
import { BadgeDisplay } from "@/components/gamification/BadgeDisplay";
import { useBadges } from "@/hooks/useBadges";
import { AlertCircle, Award } from "lucide-react";

export const ProfilePageContent = () => {
  const {
    profile,
    loading,
  } = useProfileContext();
  
  // Get user badges
  const { badges, isLoading: badgesLoading } = useBadges(profile?.id || null);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-primary-light"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
        <Alert variant="destructive" className="w-full max-w-md mx-4">
          <AlertCircle className="h-4 w-4 dark:text-red-400" />
          <AlertTitle className="dark:text-white">Error</AlertTitle>
          <AlertDescription className="dark:text-gray-300">
            Failed to load profile data.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-300 
        dark:bg-gray-800 dark:border-gray-700 
        bg-white border-gray-200">
        <CardHeader className="dark:bg-gray-900/10 bg-gray-100/50 transition-colors duration-300">
          <ProfileHeader />
        </CardHeader>
        <CardContent className="space-y-6 dark:bg-gray-900/5 bg-white transition-colors duration-300">
          <div className="flex flex-col items-center mb-6 relative">
            <ProfileAvatar />
            <Badge 
              variant="secondary" 
              className="mt-4 px-4 py-1 text-sm 
                dark:bg-gray-700 dark:text-gray-300 
                bg-gray-200 text-gray-700 
                transition-colors duration-300"
            >
              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </Badge>
          </div>
          
          {/* User Stats */}
          <ProfileStats userId={profile.id} className="mb-6" />
          
          {/* User Badges */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
              <Award className="w-5 h-5 text-amber-500" />
              Badges
            </h3>
            <BadgeDisplay badges={badges} isLoading={badgesLoading} />
          </div>
          
          <ProfileForm />
          
          {/* Saved Timetables */}
          <ProfileSavedTimetables className="mt-6" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePageContent;