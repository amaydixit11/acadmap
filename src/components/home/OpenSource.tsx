import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Github, 
  Code2, 
  Heart,
  BookOpen,
  MessageSquare,
  Calendar,
  Trophy,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper } from './SectionWrapper';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};
// Improved OpenSourceSection
export function OpenSourceSection() {
  const features = [
    {
      icon: <Github className="h-8 w-8" />,
      title: "View Source Code",
      description: "Explore our codebase, submit issues, and contribute to the development process.",
      buttonText: "GitHub Repository",
      href: "https://github.com/amaydixit11/acadmap",
      gradient: "from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Support the Project",
      description: "Star our repository, spread the word, or contribute learning resources.",
      buttonText: "Get Involved",
      href: "/contribute",
      gradient: "from-rose-600 to-orange-600 dark:from-rose-400 dark:to-orange-400"
    }
  ];

  return (
    <SectionWrapper 
      gradientFrom="from-purple-50/50 dark:from-purple-950/30"
      gradientTo="to-blue-50/50 dark:to-blue-950/30"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent 
            bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400"
          >
            Open Source & Community Driven
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Built with transparency and collaboration at its core. Join us in making education more accessible.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {features.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
                border border-gray-200/50 dark:border-gray-700/50
                transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient}`}>
                      {React.cloneElement(item.icon, { 
                        className: "text-white" 
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {item.description}
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full justify-center group-hover:bg-gray-100 
                      dark:group-hover:bg-gray-800"
                    asChild
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      {item.buttonText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}