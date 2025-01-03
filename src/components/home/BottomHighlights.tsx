"use client"
import { useResources } from "@/hooks/useResources";
import { 
  FileText, 
  Users,
  Zap,
  Download,
  Star,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import React from "react";
import { Card } from "../ui/card";

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

export function BottomHighlights() {
  const stats = [
    {
      icon: <FileText className="h-12 w-12 lg:h-16 lg:w-16" />,
      title: "500+",
      subtitle: "Resources",
      description: "Comprehensive course materials and study guides",
      gradient: "from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400"
    },
    {
      icon: <Users className="h-12 w-12 lg:h-16 lg:w-16" />,
      title: "100+",
      subtitle: "Contributors",
      description: "Active community of helpful peers",
      gradient: "from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400"
    },
    {
      icon: <Zap className="h-12 w-12 lg:h-16 lg:w-16" />,
      title: "24/7",
      subtitle: "Access",
      description: "Learn and share on your schedule",
      gradient: "from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400"
    }
  ];

  return (
    <SectionWrapper className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent 
          bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400"
        >
          Platform Highlights
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Growing together to create a better learning experience
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.subtitle}
            variants={itemVariants}
            className="group"
          >
            <Card className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
              border border-gray-200/50 dark:border-gray-700/50 overflow-hidden
              transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="relative p-6 lg:p-8 flex flex-col items-center text-center">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient}
                  transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {React.cloneElement(stat.icon, { 
                    className: "text-white" 
                  })}
                </div>
                
                <h3 className={`text-3xl lg:text-4xl font-bold mt-6 mb-1 
                  bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} 
                  dark:text-white dark:bg-gradient-to-l dark:bg-gradient-to-r`}
                >
                  {stat.title}
                </h3>

                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {stat.subtitle}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {stat.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}