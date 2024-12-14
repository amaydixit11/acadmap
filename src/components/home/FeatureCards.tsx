import { 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger 
    } from "@/components/ui/tooltip";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
    } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, FileText, Share2, Users } from "lucide-react";
import { useState } from "react";


const FeatureCards = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
          icon: <FileText className="h-10 w-10 text-purple-600" />,
          title: "Course Catalog & Resource Library",
          description: "Access course materials shared by senior students.",
          link: "/courses"
        },
        {
          icon: <Users className="h-10 w-10 text-green-600" />,
          title: "Peer Knowledge Sharing",
          description: "Learn from students who've already taken the courses.",
          link: "/contributors"
        },
        {
          icon: <Share2 className="h-10 w-10 text-blue-600" />,
          title: "Community Contribution",
          description: "Upload and help future batches with your course materials.",
          link: "/upload"
        }
      ];
  return (
    <div className="space-y-6">
        <TooltipProvider>
        {features.map((feature, index) => (
            <Tooltip key={feature.title}>
            <TooltipTrigger asChild>
                <Card 
                className={`cursor-pointer transform transition-all duration-300 
                    ${
                    activeFeature === index 
                    ? 'border-blue-600 shadow-lg scale-105' 
                    : 'hover:border-blue-300 hover:shadow-md'
                }
                    `}
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
                        Learn More
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
  )
}

export default FeatureCards
