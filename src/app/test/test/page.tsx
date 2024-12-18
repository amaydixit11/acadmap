"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Download, 
  Users, 
  FileText, 
  BookOpen, 
  ArrowRight, 
  Star,
  Upload,
  Share2,
  MapPin,
  BookmarkCheck,
  Medal,
  Github,
  Code,
  Globe,
  Heart,
  DollarSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

export default function AcadMapHomePage() {
  const recentUploads = [
    {
      department: "Computer Science",
      course: "Data Structures",
      uploadedBy: "Sarah Chen (Senior)",
      resourceType: "Comprehensive Notes",
      downloads: 342
    },
    {
      department: "Electrical Engineering",
      course: "Digital Electronics",
      uploadedBy: "Rohan Mehta (Senior)",
      resourceType: "Exam Preparation Pack",
      downloads: 278
    },
    {
      department: "Mechanical Engineering",
      course: "Thermodynamics",
      uploadedBy: "Priya Patel (Senior)",
      resourceType: "Lab Experiment Guides",
      downloads: 215
    }
  ];

  const platformFeatures = [
    {
      icon: Download,
      title: "Resource Library",
      description: "Access curated study materials from senior students"
    },
    {
      icon: Upload,
      title: "Contribute Resources",
      description: "Share your knowledge and help future batches"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with seniors and peers across departments"
    },
    {
        icon: Code,
        title: "Open Source",
        description: "Fully open-source platform. Contribute to our GitHub repository and help improve the project."
      }

  ];

  const departmentStats = [
    { 
      name: "Computer Science",
      resources: 250,
      icon: BookOpen
    },
    { 
      name: "Electrical Engineering",
      resources: 180,
      icon: Star
    },
    { 
      name: "Mechanical Engineering",
      resources: 150,
      icon: Medal
    }
  ];
  const openSourceHighlights = [
    {
      icon: Github,
      title: "Community-Driven Development",
      description: "Our project is open for contributions. Whether you're a developer, designer, or subject matter expert, there's a way to get involved.",
      link: "https://github.com/acadmap/platform"
    },
    {
      icon: Globe,
      title: "Global Collaboration",
      description: "Connect with students and developers worldwide. Help us build a truly global knowledge-sharing platform.",
      link: "https://acadmap.org/community"
    },
    {
      icon: Heart,
      title: "Impact-Driven Mission",
      description: "We believe in democratizing education. Every contribution helps make learning more accessible.",
      link: "https://acadmap.org/mission"
    }
  ];

  const contributionOpportunities = [
    {
      icon: Code,
      title: "Code Contributions",
      description: "Help improve our platform's features, fix bugs, and optimize performance.",
      difficulty: "Technical"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Improve project docs, create tutorials, and help make our platform more user-friendly.",
      difficulty: "Beginner Friendly"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Answer questions, provide guidance, and help build our community.",
      difficulty: "Easy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-4 py-16 md:py-24 text-center"
        {...fadeIn}
      >
        <Badge 
          variant="secondary" 
          className="mx-auto mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        >
          <Share2 className="mr-2 h-4 w-4" /> Peer-to-Peer Learning Platform
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black 
          bg-clip-text text-transparent bg-gradient-to-r 
          from-blue-700 via-indigo-700 to-purple-700
          dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300
          mb-6 tracking-tight"
        >
          AcadMap: Knowledge Transfer Hub
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 
          max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          A platform where senior students share their hard-earned knowledge, 
          helping junior batches navigate academic challenges with curated resources.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Browse Resources <Download className="ml-2" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
          >
            Upload Resources <Upload className="ml-2" />
          </Button>
        </div>

        {/* Platform Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {platformFeatures.map((feature) => (
            <div 
              key={feature.title} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <feature.icon className="mx-auto h-10 w-10 mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Uploads Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Recently Uploaded Resources</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Fresh study materials shared by seniors to help you excel in your courses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recentUploads.map((upload) => (
            <Card 
              key={upload.course} 
              className="hover:shadow-lg transition-all group"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">{upload.department}</Badge>
                  <div className="flex items-center text-gray-500">
                    <Download className="h-4 w-4 mr-1" />
                    {upload.downloads}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{upload.course}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {upload.resourceType}
                </p>
                <div className="flex items-center">
                  <BookmarkCheck className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {upload.uploadedBy}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Department Resources */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Resources by Department</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore comprehensive resources across different departments
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {departmentStats.map((dept) => (
            <Card 
              key={dept.name}
              className="border-none bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-md"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {dept.name}
                  </p>
                  <h3 className="text-3xl font-bold text-blue-600">
                    {dept.resources}+ Resources
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <dept.icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 
          dark:from-blue-900/30 dark:to-indigo-900/30
          rounded-3xl p-12 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-700 to-indigo-700
            dark:from-blue-300 dark:to-indigo-300
            mb-6 leading-tight"
          >
            Bridge the Knowledge Gap
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a senior looking to help future batches or a junior 
            seeking valuable insights, AcadMap is your platform for seamless 
            academic knowledge transfer.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Start Exploring <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
            >
              Learn How It Works
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Open Source & Community-Driven</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AcadMap is more than a platform—it's a collaborative ecosystem where everyone can contribute
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {openSourceHighlights.map((highlight) => (
            <Card 
              key={highlight.title} 
              className="hover:shadow-lg transition-all group"
            >
              <CardContent className="p-6 text-center">
                <highlight.icon className="mx-auto h-12 w-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {highlight.description}
                </p>
                <Link href={highlight.link} target="_blank">
                  <Button variant="outline" className="w-full">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contribution Opportunities Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Can You Contribute?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Multiple ways to make an impact, regardless of your skills or experience level
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contributionOpportunities.map((opportunity) => (
            <Card 
              key={opportunity.title}
              className="border-none bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <opportunity.icon className="h-8 w-8 mr-4 text-blue-600" />
                  <h3 className="text-xl font-bold">{opportunity.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {opportunity.description}
                </p>
                <Badge variant="secondary">
                  {opportunity.difficulty}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sponsorship and Support Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 
          dark:from-blue-900/30 dark:to-indigo-900/30
          rounded-3xl p-12 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-700 to-indigo-700
            dark:from-blue-300 dark:to-indigo-300
            mb-6 leading-tight"
          >
            Support Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Help us continue developing AcadMap and make knowledge sharing accessible to everyone
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Github className="mr-2" /> View on GitHub
            </Button>
            <Button 
              variant="outline"
              size="lg"
            >
              <DollarSign className="mr-2" /> Sponsor Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}