"use client"

import React, { useState, useEffect } from "react";
import { createProfileIfNotExist, getCurrentUserProfile } from "@/lib/profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  Building2,
  Edit2,
  Save,
  GraduationCap,
  AlertCircle,
  Linkedin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileModel } from "@/models/profile";
import { getUserSessionData } from "@/lib/auth";

interface ProfileField {
  icon: JSX.Element;
  label: string;
  key: keyof ProfileModel;
  type?: string;
  required?: boolean;
  validation?: (value: string) => boolean;
  component?: "input" | "textarea";
}

const profileFields: ProfileField[] = [
  { 
    key: "name", 
    icon: <User />, 
    label: "Name",
    required: true,
    validation: (value) => value.length >= 2
  },
  { 
    key: "email", 
    icon: <Mail />, 
    label: "Email",
    type: "email",
    required: true,
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  { 
    key: "mobile", 
    icon: <Phone />, 
    label: "Mobile",
    type: "tel",
    validation: (value) => /^\+?[\d\s-]{10,}$/.test(value)
  },
  { 
    key: "department", 
    icon: <Building2 />, 
    label: "Department"
  },
  { 
    key: "batch", 
    icon: <GraduationCap />, 
    label: "Batch"
  },
  {
    key: "linkedin_url",
    icon: <Linkedin />,
    label: "LinkedIn URL",
    type: "url",
    validation: (value) => value ? /^https:\/\/[a-zA-Z0-9-]+\.linkedin\.com/.test(value) : true
  },
  {
    key: "bio",
    icon: <User />,
    label: "Bio",
    component: "textarea"
  }
];

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profile, setProfile] = useState<ProfileModel | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const validateField = (field: ProfileField, value: string) => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    if (field.validation && value && !field.validation(value)) {
      return `Invalid ${field.label.toLowerCase()}`;
    }
    return "";
  };

  const handleSave = async () => {
    if (!profile) return;

    const newErrors: Record<string, string> = {};
    
    profileFields.forEach((field) => {
      const value = profile[field.key]?.toString() || "";
      const error = validateField(field, value);
      if (error) {
        newErrors[field.key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Add your save logic here
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleInputChange = (key: keyof ProfileModel, value: string) => {
    if (!profile) return;

    setProfile(prev => ({
      ...prev!,
      [key]: value
    }));
    setErrors(prev => ({
      ...prev,
      [key]: ""
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load profile data.</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">

      {saveSuccess && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your profile has been updated successfully.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Profile</CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                size="icon"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="transition-all duration-200 hover:scale-105"
              >
                {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="relative group">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profile.profile_image} />
                  <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1">
                  {profile.role}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {profileFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
                      {field.icon}
                    </div>
                    {isEditing ? (
                      field.component === "textarea" ? (
                        <Textarea
                          value={profile[field.key]?.toString() || ""}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className={`flex-1 ${errors[field.key] ? 'border-red-500' : ''}`}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <Input
                          type={field.type || "text"}
                          value={profile[field.key]?.toString() || ""}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className={`flex-1 ${errors[field.key] ? 'border-red-500' : ''}`}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                      )
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{field.label}</p>
                        <p className="font-semibold">{profile[field.key]?.toString() || '-'}</p>
                      </div>
                    )}
                  </div>
                  {errors[field.key] && (
                    <p className="text-sm text-red-500 ml-11">{errors[field.key]}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;