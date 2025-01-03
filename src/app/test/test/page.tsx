"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, Users, FileText, BookOpen, ArrowRight, Star,
  Upload, Share2, BookmarkCheck, Medal, Github, Code,
  Globe, Heart, DollarSign, TrendingUp, Clock, Search,
  Filter, TagIcon, ThumbsUp, AlertCircle, Bookmark,
  ChevronRight, Compass, BarChart, BookMarked, Youtube,
  PenTool, GraduationCap,
  Mail,
  FolderOpen,
  UploadCloud,
  DownloadCloud
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Department } from '@/types/courses';

interface Stats {
  title: string;
  value: string;
  icon: React.ElementType;
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

export default function AcadMapHomePage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const stats: Stats[] = [
    { title: "Total Resources", value: "1,000+", icon: FileText },
    { title: "Active Users", value: "500+", icon: Users },
    { title: "Departments", value: "15+", icon: Compass },
    { title: "Contributors", value: "200+", icon: Heart }
  ];

  const features: Feature[] = [
    {
      icon: FolderOpen,
      title: "Course Catalog",
      description: "Explore an organized directory of courses and their available resources.",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: DownloadCloud,
      title: "Download Resources",
      description: "Easily access past-year papers, lecture notes, and assignments.",
      color: "from-blue-500 to-sky-500"
    },
    {
      icon: UploadCloud,
      title: "Upload Contributions",
      description: "Share your notes, tutorials, and materials with future batches.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Collaborative Platform",
      description: "Join a community-driven effort to build a shared academic repository.",
      color: "from-yellow-500 to-orange-500"
    }
  ];
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-emerald-50 dark:from-violet-950 dark:via-blue-950 dark:to-emerald-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container mx-auto px-4 py-20 relative">
          <Badge 
            variant="secondary" 
            className="mx-auto mb-4 px-4 py-1.5 bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white flex items-center justify-center max-w-fit"
          >
            <Share2 className="mr-2 h-4 w-4" /> IIT Bhilai's Knowledge Hub
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-center
            bg-clip-text text-transparent bg-gradient-to-r 
            from-violet-600 via-blue-600 to-emerald-600
            dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400
            mb-6 tracking-tight"
          >
            AcadMap
          </h1>

          <p className="text-xl md:text-2xl text-center text-gray-600 dark:text-gray-300 
            max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Your one-stop destination for academic excellence at IIT Bhilai
          </p>

          {/* Enhanced Search Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for courses, resources, or topics..."
                  className="pl-10 pr-4 py-6 w-full rounded-xl border-2 border-gray-200 
                    dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[200px] h-[52px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {Object.entries(Department).map(([key, value]) => (
                    <SelectItem key={key} value={key.toLowerCase()}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                className="h-[52px] px-8 bg-gradient-to-r from-violet-600 to-blue-600 
                  hover:from-violet-700 hover:to-blue-700"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 mb-3 mx-auto text-blue-600" />
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Excel</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Comprehensive resources to support your academic journey
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card 
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.color} 
                    flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* Department Breakdown */}
        <div className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Resources by Department</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Explore materials across different branches of study
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Computer Science",
                icon: Code,
                color: "from-blue-600 to-indigo-600",
                resources: 450,
                popular: ["Data Structures", "Algorithms", "Database Systems"]
              },
              {
                name: "Electrical Engineering",
                icon: Globe,
                color: "from-purple-600 to-pink-600",
                resources: 380,
                popular: ["Circuit Theory", "Digital Electronics", "Power Systems"]
              },
              {
                name: "Mechanical Engineering",
                icon: BarChart,
                color: "from-emerald-600 to-teal-600",
                resources: 320,
                popular: ["Thermodynamics", "Fluid Mechanics", "Machine Design"]
              }
            ].map((dept) => (
              <Card 
                key={dept.name}
                className="group hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${dept.color}
                    flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                    <dept.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{dept.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {dept.resources}+ resources available
                  </p>
                  
                  <div className="space-y-2">
                    <p className="font-semibold">Popular Courses:</p>
                    {dept.popular.map((course) => (
                      <div 
                        key={course}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <ChevronRight className="h-4 w-4 mr-2 text-blue-600" />
                        {course}
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-gray-800 to-gray-900 
                      dark:from-gray-700 dark:to-gray-800"
                  >
                    Explore Department
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-violet-100 to-blue-100 
          dark:from-violet-900/30 dark:to-blue-900/30
          rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Contribute?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Share your knowledge and help build a stronger academic community at IIT Bhilai
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-blue-600 
                hover:from-violet-700 hover:to-blue-700"
            >
              Upload Resources <Upload className="ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2"
            >
              Join Community <Users className="ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2"
            >
              View Guidelines <FileText className="ml-2" />
            </Button>
          </div>
        </div>


        {/* FAQ Section */}
        <div className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about AcadMap
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "How can I contribute resources?",
                a: "Simply create an account, verify your IIT Bhilai email, and use the upload feature to share your materials."
              },
              {
                q: "Are the resources verified?",
                a: "Yes, all resources go through a review process by department moderators before being published."
              },
              {
                q: "Can I request specific materials?",
                a: "Absolutely! You can create a resource request that will be visible to seniors who might have the materials."
              },
              {
                q: "How is content quality maintained?",
                a: "Through user ratings, reviews, and our moderation system that ensures high-quality content."
              }
            ].map((faq) => (
              <Card key={faq.q} className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold mb-2">{faq.q}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}