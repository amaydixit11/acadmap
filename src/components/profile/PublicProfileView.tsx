"use client";

import { ProfileModel } from "@/models/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileStats from "./ProfileStats";
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  Linkedin,
  Github,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PublicProfileViewProps {
  profile: ProfileModel;
}

export function PublicProfileView({ profile }: PublicProfileViewProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "alumni":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <Card className="overflow-hidden">
          {/* Header Banner */}
          <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600" />

          <CardContent className="relative pt-0 pb-6">
            {/* Avatar */}
            <div className="flex flex-col items-center -mt-12">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow-lg">
                <AvatarImage src={profile.profile_image} alt={profile.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>

              <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h1>

              <Badge className={cn("mt-2", getRoleBadgeColor(profile.role))}>
                {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
              </Badge>

              {profile.bio && (
                <p className="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-md">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="mt-6">
              <ProfileStats userId={profile.id} />
            </div>

            {/* Details */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {profile.department && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Department
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {profile.department}
                    </p>
                  </div>
                </div>
              )}

              {profile.batch && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <GraduationCap className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Batch
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {profile.batch}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-6 flex justify-center gap-3">
              {profile.linkedin_url && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
              )}
              {profile.github_url && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
              )}
            </div>

            {/* Join Date */}
            {profile.created_at && (
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4 inline mr-1" />
                Member since{" "}
                {new Date(profile.created_at).toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PublicProfileView;
