"use client"

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Phone,
  Building,
  Edit2,
  Save,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserData } from "@/utils/getUserData";
import { UserData } from "@/types/user";

export interface ProfileField {
  icon: JSX.Element;
  label: string;
  key: keyof UserData;
  type?: string;
  required?: boolean;
  validation?: (value: string) => boolean;
}

export interface UserCourse {
    code: string,
    title: string,
    credits: number,
    grade: string
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
    key: "phone", 
    icon: <Phone />, 
    label: "Phone",
    type: "tel",
    required: false,
    validation: (value) => /^\+?[\d\s-]{10,}$/.test(value)
  },
  { 
    key: "department", 
    icon: <Building />, 
    label: "Department",
    required: false
  },
  { 
    key: "rollNumber", 
    icon: <GraduationCap />, 
    label: "Roll Number",
    required: false
  },
];

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    department: "",
    year: "",
    rollNumber: "",
    phone: "",
    avatar: "https://github.com/shadcn.png"
  });

  const [courses, setCourses] = useState<UserCourse[]>([
    { code: "CS101", title: "Introduction to Programming", credits: 4, grade: "A" },
    { code: "MA201", title: "Linear Algebra", credits: 3, grade: "B+" },
    { code: "PH101", title: "Physics I", credits: 4, grade: "A-" },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let user = await getUserData();
        setUserData({
          name: user?.user.user_metadata.full_name || "",
          email: user?.user.user_metadata.email || "",
          department: user?.user.user_metadata.department || "",
          year: user?.user.user_metadata.year || "",
          rollNumber: user?.user.user_metadata.roll_number || "",
          phone: user?.user.phone || "",
          avatar: user?.user.user_metadata.avatar_url || ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validateField = (field: ProfileField, value: string) => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    if (field.validation && !field.validation(value)) {
      return `Invalid ${field.label.toLowerCase()}`;
    }
    return "";
  };

  const handleSave = async () => {
    const newErrors: Record<string, string> = {};
    
    profileFields.forEach((field) => {
      const error = validateField(field, userData[field.key]);
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

  const handleInputChange = (key: keyof UserData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [key]: value
    }));
    setErrors(prev => ({
      ...prev,
      [key]: ""
    }));
  };

  const getGradeColor = (grade: string) => {
    const gradeColors: Record<string, string> = {
      'A': 'bg-green-500',
      'A-': 'bg-green-400',
      'B+': 'bg-blue-500',
      'B': 'bg-blue-400',
      'C': 'bg-yellow-500',
      'D': 'bg-red-500',
    };
    return gradeColors[grade.charAt(0)] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {saveSuccess && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your profile has been updated successfully.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
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
                {/* <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"> */}
                <Avatar className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {/* </div> */}
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1">
                  Year {userData.year}
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
                      <Input
                        type={field.type || "text"}
                        value={userData[field.key]}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className={`flex-1 ${errors[field.key] ? 'border-red-500' : ''}`}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{field.label}</p>
                        <p className="font-semibold">{userData[field.key] || '-'}</p>
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

        {/* Current Courses */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Current Courses</CardTitle>
            <CardDescription>Your enrolled courses this semester</CardDescription>
          </CardHeader>
          
          <CardContent>

            <div className="space-y-4">
              Upcoming Feature
              {/* {courses.map((course) => (
                <Card key={course.code} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-lg">{course.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{course.code}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {course.credits} Credits
                          </span>
                        </div>
                      </div>
                      <Badge 
                        className={`${getGradeColor(course.grade)} text-white`}
                      >
                        {course.grade}
                      </Badge>
                    </div>
                  </CardContent>
                </Card> 
              ))} */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;