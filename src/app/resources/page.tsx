"use client"
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Filter, 
  Search, 
  Download, 
  Link as LinkIcon, 
  Image, 
  Film, 
  File,
  Archive,
  BookOpen,
  X,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ResourceModel } from '@/models/resources';
import { useResources } from '@/hooks/useResources';

const getResourceIcon = (type: ResourceModel['type']) => {
  const iconMap = {
    'document': <FileText className="h-6 w-6 text-blue-500" />,
    'video': <Film className="h-6 w-6 text-pink-500" />,
    'image': <Image className="h-6 w-6 text-emerald-500" />,
    'archive': <Archive className="h-6 w-6 text-violet-500" />,
    'link': <LinkIcon className="h-6 w-6 text-indigo-500" />,
    'other': <File className="h-6 w-6 text-gray-500" />
  };
  return iconMap[type];
};

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceModel['type'] | ''>("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceModel['category'] | ''>("");
  const [selectedResource, setSelectedResource] = useState<ResourceModel | null>(null);
  const { resources } = useResources();

  const filteredResources = useMemo(() => 
    resources.filter(resource => 
      (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       resource.course_code.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedType ? resource.type === selectedType : true) &&
      (selectedCategory ? resource.category === selectedCategory : true)
    ),
    [resources, searchTerm, selectedType, selectedCategory]
  );

  const types: ResourceModel['type'][] = ['document', 'video', 'image', 'archive', 'link', 'other'];
  const categories: ResourceModel['category'][] = ['lecture', 'tutorial', 'assignment', 'pyq', 'lab', 'unclassified'];

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedCategory("");
  };

  const getCategoryColor = (category: string) => {
    const colorMap = {
      'lecture': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'tutorial': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'assignment': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'pyq': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'lab': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'unclassified': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colorMap[category as keyof typeof colorMap] || colorMap.unclassified;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge 
            variant="secondary" 
            className="inline-flex items-center px-4 py-1.5 mb-4 text-sm
            bg-gradient-to-r from-blue-500 to-indigo-500 text-white
            dark:from-blue-600 dark:to-indigo-600"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Academic Resources
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold 
            bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600
            dark:from-blue-400 dark:to-indigo-400 mb-6"
          >
            Collaborative Learning Hub
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 
            max-w-2xl mx-auto leading-relaxed"
          >
            Discover and share academic resources. Learn from your peers and contribute 
            to our growing knowledge base.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-6 mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search resources (title, course code)" 
                className="pl-10 h-12 text-lg border-2 border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={clearFilters}
                    className="h-12 w-12 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear Filters</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {types.map(type => (
              <Badge 
                key={type}
                variant={selectedType === type ? "default" : "secondary"}
                onClick={() => setSelectedType(selectedType === type ? "" : type)}
                className={`cursor-pointer capitalize px-4 py-2 text-sm transition-all
                  ${selectedType === type ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700' : 
                  'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                {getResourceIcon(type)}
                <span className="ml-2">{type}</span>
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                className={`cursor-pointer capitalize px-4 py-2 text-sm transition-all
                  ${selectedCategory === category ? getCategoryColor(category) : 
                  'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredResources.map((resource) => {
                return(
              <motion.div
                key={resource.resourceId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedResource(resource)}
                className="cursor-pointer"
              >
                <Card className="h-full border-2 border-gray-100 dark:border-gray-800 
                  hover:border-blue-300 dark:hover:border-blue-700 
                  hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="space-y-2">
                    <div className="flex items-start justify-between">
                      {getResourceIcon(resource.type)}
                      <Badge 
                        variant="outline" 
                        className={`${getCategoryColor(resource.category)} ml-2`}
                      >
                        {resource.category}
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight
                        text-gray-900 dark:text-gray-100"
                      >
                        {resource.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {resource.course_code}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {resource.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {resource.description}
                      </p>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[70%]">
                        By {resource.uploadedBy}
                      </span>
                      <Badge 
                        variant="secondary"
                        className="bg-gray-100 dark:bg-gray-800"
                      >
                        {resource.year}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )})}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 inline-block mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No resources found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Resource Details Dialog */}
        <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
          {selectedResource && (
            <DialogContent className="max-w-lg">
              <DialogHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  {getResourceIcon(selectedResource.type)}
                  <Badge 
                    variant="outline" 
                    className={getCategoryColor(selectedResource.category)}
                  >
                    {selectedResource.category}
                  </Badge>
                </div>
                <DialogTitle className="text-xl font-semibold leading-tight">
                  {selectedResource.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedResource.course_code} • {selectedResource.year}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {selectedResource.description && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedResource.description}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Details
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Uploaded By:</span> {selectedResource.uploadedBy}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Year:</span> {selectedResource.year}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Link href={selectedResource.url} target="_blank">
                    <Button 
                      variant="default" 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 
                      hover:from-blue-600 hover:to-indigo-600 text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Resource
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedResource(null)}
                    className="border-2"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
        </div>

      {/* Loading State */}
      {resources.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading resources...</p>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Resources</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {resources.length}
                  </h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/50">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Filters</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {[selectedType, selectedCategory, searchTerm].filter(Boolean).length}
                  </h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/50">
                  <Filter className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Filtered Results</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {filteredResources.length}
                  </h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/50">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Access Floating Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 right-8"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 
                hover:from-blue-600 hover:to-indigo-600 text-white p-0"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                  />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Back to top
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </div>
  );
}