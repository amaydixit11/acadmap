"use client"

import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, Calendar, FileText, Star, Activity, Clock, Plus, ArrowRight, CheckCircle, ChevronRight, Library, GraduationCap } from "lucide-react";
import { Course, CourseResource } from "@/models/courses";
import { ResourceCard } from "@/components/courses/resource-card";
import { useState, useEffect } from "react";
import { getCourses } from "@/lib/courses";

interface CoursePageProps {
  course: Course;
}

export default function CoursePage({ course }: CoursePageProps) {
  const [review, setReview] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [activeTab, setActiveTab] = useState("syllabus");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!course) {
    notFound();
  }

  const handleSubmitReview = () => {
    setIsReviewing(false);
    setReview("");
    alert("Review submitted successfully!");
  };

  const RatingBar = ({ value }: { value: number }) => (
    <div className="flex items-center gap-2">
      <Progress value={value * 20} className="h-2" />
      <span className="text-sm font-medium w-12">{value}/5.0</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Sticky Header */}
      <div className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1">{course.code}</Badge>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-gray-800 line-clamp-1">{course.title}</h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="px-3 py-1">{course.code}</Badge>
                  <Badge className="px-3 py-1">{course.credits} Credits</Badge>
                  <Badge variant="outline" className="px-3 py-1 ml-auto">
                    <Clock className="mr-1 h-4 w-4" />
                    {Number(course.schedule.lectures) + Number(course.schedule.labs) + Number(course.schedule.tutorials)} hrs/week
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{course.description}</p>
                <div className="flex items-center gap-6 mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-primary w-5 h-5" />
                    <span className="text-sm text-muted-foreground">Instructor: <span className="font-medium text-gray-800">{course.instructor}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500 w-5 h-5" />
                    <span className="text-sm text-muted-foreground">Rating: <span className="font-medium text-gray-800">{course.rating?.overall}/5.0</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <Card className="shadow-lg border-gray-100">
              <Tabs defaultValue="syllabus" className="w-full">
                <CardHeader className="pb-0">
                  <TabsList className="w-full bg-gray-50/50 p-1">
                    {[
                      { value: "syllabus", icon: FileText, label: "Syllabus" },
                      { value: "schedule", icon: Calendar, label: "Schedule" },
                      { value: "resources", icon: Library, label: "Resources" }
                    ].map(({ value, icon: Icon, label }) => (
                      <TabsTrigger
                        key={value}
                        value={value}
                        className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm py-3"
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </CardHeader>

                <CardContent className="p-6">
                  <TabsContent value="syllabus" className="mt-0">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                          <CheckCircle className="mr-2 text-primary" /> Course Syllabus
                        </h2>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                      <ul className="space-y-4 text-muted-foreground">
                        {course.syllabus.map((item, index) => (
                          <li key={index} className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <ArrowRight className="mr-3 mt-1 text-primary w-4 h-4 flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="mt-0">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                        <Calendar className="mr-2 text-primary" /> Weekly Schedule
                      </h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {[
                          { label: "Lectures", icon: BookOpen, hours: course.schedule.lectures, color: "primary" },
                          { label: "Labs", icon: Activity, hours: course.schedule.labs, color: "green-600" },
                          { label: "Tutorials", icon: Users, hours: course.schedule.tutorials, color: "blue-600" }
                        ].map(({ label, icon: Icon, hours, color }) => (
                          <div key={label} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <Icon className={`w-8 h-8 mb-4 text-${color}`} />
                            <h3 className="text-lg font-semibold mb-2">{label}</h3>
                            <p className="text-3xl font-bold text-gray-800">{hours}<span className="text-base font-normal text-muted-foreground ml-1">hrs/week</span></p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources" className="mt-0">
                    <Tabs defaultValue="lectures" className="space-y-6">
                      <TabsList className="w-full bg-gray-50/50 p-1 rounded-xl">
                        {["Lectures", "Assignments", "Tutorials", "Exams"].map((tab) => (
                          <TabsTrigger
                            key={tab}
                            value={tab.toLowerCase().replace(/\s+/g, '')}
                            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                          >
                            {tab}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {["lectures", "assignments", "tutorials", "pyq"].map((resourceType) => (
                        <TabsContent
                          key={resourceType}
                          value={resourceType}
                          className="grid gap-6 md:grid-cols-2 mt-0"
                        >
                          {course.resources[resourceType as keyof Course["resources"]].map((resource) => (
                            <ResourceCard key={resource.id} resource={resource} />
                          ))}
                        </TabsContent>
                      ))}
                    </Tabs>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-gray-100 sticky top-20">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center text-gray-800">
                  <Users className="mr-2 text-primary" /> Course Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Prerequisites */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <CheckCircle className="mr-2 text-green-500" /> Prerequisites
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {course.prerequisites}
                  </ul>
                </div>

                {/* Ratings */}
                {course.rating && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Star className="mr-2 text-yellow-500" /> Course Ratings
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Overall Rating", value: course.rating.overall },
                        { label: "Course Difficulty", value: course.rating.difficulty },
                        { label: "Weekly Workload", value: course.rating.workload }
                      ].map(({ label, value }) => (
                        <div key={label} className="space-y-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{label}</span>
                          </div>
                          <RatingBar value={value} />
                        </div>
                      ))}
                      <div className="pt-4 mt-4 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Student Reviews</span>
                          <Badge variant="secondary">{course.rating.reviews}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Users className="mr-2 h-5 w-5" /> Join Study Group
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={() => setIsReviewing(true)}
                  >
                    <Star className="mr-2 h-5 w-5" /> Write a Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Modal */}
        {isReviewing && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 animate-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <Star className="mr-2 text-yellow-500" /> Write Your Review
              </h3>
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Overall Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        className="p-1 hover:text-yellow-500 transition-colors"
                      >
                        <Star className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all min-h-[120px]"
                  placeholder="Share your experience with this course..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsReviewing(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmitReview}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}