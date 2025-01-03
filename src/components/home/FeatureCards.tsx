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
import { motion } from "framer-motion";


// FeatureCards.tsx
export default function FeatureCards() {
    const [activeFeature, setActiveFeature] = useState(0);
  
    const features = [
      {
        icon: <FileText className="h-10 w-10 text-purple-600" />,
        title: "Smart Resource Library",
        description: "Access a comprehensive collection of course materials, study guides, and notes organized by subject and difficulty level.",
        link: "/courses"
      },
      {
        icon: <Users className="h-10 w-10 text-green-600" />,
        title: "Peer Learning Network",
        description: "Connect with experienced students and learn from their insights, tips, and successful strategies.",
        link: "/contributors"
      },
      {
        icon: <Share2 className="h-10 w-10 text-blue-600" />,
        title: "Community Hub",
        description: "Share your knowledge and resources to help future students succeed while building your academic portfolio.",
        link: "/upload"
      }
    ];
  
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <TooltipProvider>
          {features.map((feature, index) => (
            <Tooltip key={feature.title}>
              <TooltipTrigger asChild>
                <Card 
                  className={`cursor-pointer transform transition-all duration-300
                    hover:translate-x-1 ${
                      activeFeature === index 
                        ? 'border-2 border-blue-500 shadow-lg scale-102 bg-blue-50/50 dark:bg-blue-950/30' 
                        : 'hover:border-blue-300 hover:shadow-md'
                    }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-white to-gray-100
                      dark:from-gray-900 dark:to-gray-800 shadow-md">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="mt-1">{feature.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      variant="link" 
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400
                      dark:hover:text-blue-300" 
                      asChild
                    >
                      <Link href={feature.link}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                Discover {feature.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </motion.div>
    );
  }
  