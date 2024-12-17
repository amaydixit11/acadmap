import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUpRight, 
  Award,
  Star,
  Code
} from "lucide-react";

interface Contributor {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  contributions: string[];
}

const contributorData: Contributor[] = [
  {
    name: "Aarav Patel",
    role: "Founder & Lead Developer",
    avatar: "/api/placeholder/200/200",
    github: "https://github.com/aaravpatel",
    linkedin: "https://linkedin.com/in/aaravpatel",
    contributions: ["Core Platform Architecture", "Course Catalog Design"]
  },
  {
    name: "Shreya Sharma",
    role: "UI/UX Designer",
    avatar: "/api/placeholder/200/200",
    github: "https://github.com/shreyasharma",
    twitter: "https://twitter.com/shreyasharma",
    contributions: ["User Interface Design", "Accessibility Improvements"]
  },
  {
    name: "Rohan Malhotra",
    role: "Backend Engineer",
    avatar: "/api/placeholder/200/200",
    github: "https://github.com/rohanmalhotra",
    linkedin: "https://linkedin.com/in/rohanmalhotra",
    contributions: ["Database Optimization", "API Development"]
  },
  {
    name: "Priya Singh",
    role: "Data Scientist",
    avatar: "/api/placeholder/200/200",
    email: "priya.singh@example.com",
    github: "https://github.com/priyasingh",
    contributions: ["Course Recommendation Algorithm", "Data Analysis"]
  }
];

const ContributorCard: React.FC<{ contributor: Contributor }> = ({ contributor }) => {
  return (
    <Card 
      className="h-full flex flex-col overflow-hidden border-2 border-neutral-300 bg-white 
      dark:border-neutral-800 dark:bg-black hover:border-neutral-400 
      hover:shadow-2xl dark:hover:border-neutral-700 transition-all duration-300"
    >
      <CardHeader className="pb-3 space-y-2 flex flex-col items-center">
        <img 
          src={contributor.avatar} 
          alt={`${contributor.name}'s avatar`} 
          className="w-24 h-24 rounded-full object-cover border-4 border-neutral-200 
          dark:border-neutral-800 mb-4"
        />
        <CardTitle className="text-xl font-bold text-center text-neutral-900 dark:text-neutral-200">
          {contributor.name}
        </CardTitle>
        <Badge 
          variant="secondary" 
          className="uppercase tracking-wider font-semibold bg-neutral-200 
          text-neutral-800 border-neutral-300 dark:bg-neutral-900 
          dark:text-neutral-300 dark:border-neutral-800"
        >
          {contributor.role}
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-grow text-sm text-neutral-600 dark:text-neutral-400 pb-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <Code className="w-4 h-4 mr-2 text-neutral-400 dark:text-neutral-600" />
            <span className="font-medium">Key Contributions:</span>
          </div>
          <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400">
            {contributor.contributions.map((contribution, idx) => (
              <li key={idx} className="truncate">{contribution}</li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="bg-neutral-100/50 border-t border-neutral-300 
        dark:bg-neutral-900/50 dark:border-neutral-800 flex justify-center space-x-4 p-4">
        {contributor.github && (
          <Link href={contributor.github} target="_blank" aria-label="GitHub Profile">
            <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
        )}
        {contributor.linkedin && (
          <Link href={contributor.linkedin} target="_blank" aria-label="LinkedIn Profile">
            <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Button>
          </Link>
        )}
        {contributor.twitter && (
          <Link href={contributor.twitter} target="_blank" aria-label="Twitter Profile">
            <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <Twitter className="h-5 w-5" />
            </Button>
          </Link>
        )}
        {contributor.email && (
          <Link href={`mailto:${contributor.email}`} aria-label="Send Email">
            <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <Mail className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default function ContributorsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <Badge 
          variant="secondary" 
          className="inline-flex items-center px-3 py-1 transition-all duration-300 
          hover:bg-blue-50 hover:shadow-sm dark:hover:bg-blue-900/30 mb-4"
        >
          <Award className="mr-2 h-4 w-4 text-green-500" />
          Our Amazing Team
        </Badge>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight 
          text-gray-900 dark:text-white leading-[1.1] mb-6">
          Meet the <span className="text-blue-600 dark:text-blue-400">Creators</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 
          max-w-2xl mx-auto leading-relaxed">
          The passionate students and developers behind AcadMap, committed to transforming 
          academic resource sharing and collaboration.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {contributorData.map((contributor) => (
          <ContributorCard key={contributor.name} contributor={contributor} />
        ))}
      </div>

      <div className="text-center mt-16">
        <Badge 
          variant="secondary" 
          className="inline-flex items-center px-3 py-1 transition-all duration-300 
          hover:bg-blue-50 hover:shadow-sm dark:hover:bg-blue-900/30 mb-4"
        >
          <Star className="mr-2 h-4 w-4 text-yellow-500" />
          Join Our Community
        </Badge>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Want to Contribute?
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          AcadMap is an open-source project. We welcome contributions from students, 
          developers, and academic enthusiasts who want to make academic resource sharing better.
        </p>

        <Button 
          size="lg" 
          className="group" 
          asChild
        >
          <Link href="https://github.com/your-repo" target="_blank" className="flex items-center justify-center">
            Contribute on GitHub
            <ArrowUpRight 
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
            />
          </Link>
        </Button>
      </div>
    </div>
  );
}