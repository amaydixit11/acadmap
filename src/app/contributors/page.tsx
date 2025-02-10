"use client"

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  Award, 
  Filter, 
  Search,
  Linkedin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from 'next/link';
import { ProfileModel } from '@/models/profile';
import { useResources } from '@/hooks/useResources';
import { getRecordById } from '@/lib/supabase';

interface Contributor extends ProfileModel {
  contributionCount: number;
//   topContributions: string[];
}

const contributorsData: Contributor[] = [
];

export default function ContributorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<ProfileModel['role'] | ''>("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { uniqueContributors } = useResources();
  const [contributors, setContributors] = useState<Contributor[]>(contributorsData);
  useEffect(() => {
    const fetchUserName = async () => {
        uniqueContributors.forEach(async (name) => {
            console.log("name: ", name)
            const profile = await getRecordById('profiles', name);
            if (profile) {
              setContributors([...contributors, {...profile, contributionCount: 0 }] as Contributor[]);
            }
        })
    };
    fetchUserName();
  }, []);

  const filteredContributors = contributors.filter(contributor => 
    contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRole ? contributor.role === selectedRole : true) &&
    (selectedDepartment ? contributor.department === selectedDepartment : true)
  );

  const departments = [...new Set(contributors.map(c => c.department).filter(Boolean))];
  const roles: ProfileModel['role'][] = ['student', 'alumni', 'external'];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-center p-3 rounded-md mb-6">
        🚧 This page is still under construction. Stay tuned for updates! 🚧
      </div>

      <div className="text-center mb-12">
        <Badge 
          variant="secondary" 
          className="inline-flex items-center px-3 py-1 transition-all duration-300 
          hover:bg-blue-50 hover:shadow-sm dark:hover:bg-blue-900/30 mb-4"
        >
          <Users className="mr-2 h-4 w-4 text-green-500" />
          Community Contributors
        </Badge>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight 
          text-gray-900 dark:text-white leading-[1.1] mb-6">
          Our <span className="text-blue-600 dark:text-blue-400">Resource Champions</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 
          max-w-2xl mx-auto leading-relaxed">
          Celebrating the students who help build our collective academic knowledge, 
          one resource at a time.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <Input 
              placeholder="Search contributors" 
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Filter Contributors
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex space-x-2">
          {/* Department Filters */}
          {departments.map(dept => (
            <Badge 
              key={dept}
              variant={selectedDepartment === dept ? "default" : "secondary"}
              onClick={() => setSelectedDepartment(selectedDepartment === dept ? "" : dept ?? "")}
              className="cursor-pointer"
            >
              {dept}
            </Badge>
          ))}
          {/* Role Filters */}
          {roles.map(role => (
            <Badge 
              key={role}
              variant={selectedRole === role ? "default" : "secondary"}
              onClick={() => setSelectedRole(selectedRole === role ? "" : role)}
              className="cursor-pointer capitalize"
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>

      {/* Contributors Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {filteredContributors.map((contributor) => (
          <Card 
            key={contributor.id}
            className="border-2 border-neutral-300 dark:border-neutral-800 
            hover:border-neutral-400 hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-3">
                <img 
                  src={contributor.profile_image || "/api/placeholder/200/200"} 
                  alt={`${contributor.name}'s profile`} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-neutral-200"
                />
                <div>
                  <CardTitle className="text-lg font-semibold">{contributor.name}</CardTitle>
                  <p className="text-sm text-neutral-500 capitalize">{contributor.role}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-900">
                {contributor.department} {contributor.batch && `'${contributor.batch.slice(-2)}`}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-neutral-500" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {contributor.contributionCount} Resources
                    </span>
                  </div>
                </div>

                {contributor.bio && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
                    "{contributor.bio}"
                  </p>
                )}

                {/* <div>
                  <h4 className="text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
                    Top Contributions
                  </h4>
                  <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {contributor.topContributions.map((contribution, index) => (
                      <li key={index} className="flex items-center">
                        <Award className="h-3 w-3 mr-2 text-green-500" />
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div> */}

                <div className="flex justify-between items-center mt-4">
                  {contributor.linkedin_url && (
                    <Link href={contributor.linkedin_url} target="_blank">
                      <Button variant="ghost" size="icon">
                        <Linkedin className="h-4 w-4 text-neutral-500 hover:text-blue-600" />
                      </Button>
                    </Link>
                  )}
                  <Badge variant="secondary">
                    Batch {contributor.batch}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContributors.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-full p-4 inline-block mb-4">
            <Search className="h-8 w-8 text-neutral-500" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            No contributors found
          </h3>
          <p className="text-neutral-500 mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}