"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  FileText, 
  ArrowRight, 
  Star, 
  Zap, 
  Globe 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

export default function Hero() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-blue-600" />,
      title: "Comprehensive Course Catalog",
      description: "Access a wide range of courses across departments and semesters.",
      link: "/courses"
    },
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: "Collaborative Study Groups",
      description: "Connect, collaborate, and learn together with peers.",
      link: "/study-groups"
    },
    {
      icon: <FileText className="h-10 w-10 text-purple-600" />,
      title: "Resource Sharing Platform",
      description: "Upload, explore, and share academic resources seamlessly.",
      link: "/resources"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Gradient Background */}
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="px-3 py-1">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              New: Enhanced Learning Platform
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Elevate Your Academic Journey at 
              <span className="block text-blue-600">IIT Bhilai</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              A comprehensive platform designed to transform your learning experience through collaboration, resources, and innovative tools.
            </p>
            
            <div className="flex space-x-4">
              <Button size="lg" asChild>
                <Link href="/get-started">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Interactive Feature Cards */}
          <div className="space-y-6">
            <TooltipProvider>
              {features.map((feature, index) => (
                <Tooltip key={feature.title}>
                  <TooltipTrigger asChild>
                    <Card 
                      className={`cursor-pointer transform transition-all duration-300 ${
                        activeFeature === index 
                          ? 'border-blue-600 shadow-lg scale-105' 
                          : 'hover:border-blue-300 hover:shadow-md'
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <CardHeader className="flex flex-row items-center space-x-4">
                        {feature.icon}
                        <div>
                          <CardTitle>{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="link" asChild>
                          <Link href={feature.link}>
                            Explore
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    Click to learn more about {feature.title}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Bottom Highlights */}
      <div className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Zap className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold">100+ Courses</h3>
              <p className="text-muted-foreground">Diverse range of academic offerings</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold">500+ Students</h3>
              <p className="text-muted-foreground">Active learning community</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-2xl font-bold">24/7 Access</h3>
              <p className="text-muted-foreground">Learn anytime, anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}