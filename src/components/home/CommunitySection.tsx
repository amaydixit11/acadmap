import { motion } from "framer-motion";
import { 
  BookOpen,
  Users,
  Award,
  Bookmark,
  Share2,
  GitPullRequest,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionWrapper } from "./SectionWrapper";
import { Card } from "../ui/card";

// Shared animation variants
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

export function CommunitySection() {
  const features = [
    {
      icon: <Share2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Resource Sharing",
      description: "Share class notes, study guides, and practice materials to help future students excel in their academic journey.",
      linkText: "Share Resources",
      href: "/upload"
    },
    {
      icon: <Bookmark className="h-8 w-8 text-rose-600 dark:text-rose-400" />,
      title: "Course Collections",
      description: "Create and discover curated collections of resources for specific courses or topics, organized for optimal learning.",
      linkText: "View Collections",
      href: "/collections"
    },
    {
      icon: <Award className="h-8 w-8 text-amber-600 dark:text-amber-400" />,
      title: "Recognition System",
      description: "Earn badges and recognition for your valuable contributions, building a reputation within the academic community.",
      linkText: "View Badges",
      href: "/recognition"
    }
  ];

  return (
    <SectionWrapper 
      gradientFrom="from-emerald-50/50 dark:from-emerald-950/30"
      gradientTo="to-blue-50/50 dark:to-blue-950/30"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent 
          bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 
          dark:from-emerald-400 dark:via-blue-400 dark:to-purple-400"
        >
          Build Together, Learn Together
        </h2>
        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Join our thriving community of students and contributors making education more accessible at IIT Bhilai
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
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
              <div className="p-6 lg:p-8 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 
                  group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
                <Button 
                  variant="ghost"
                  className="mt-4 group-hover:bg-gray-100 dark:group-hover:bg-gray-800"
                  asChild
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    {item.linkText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}