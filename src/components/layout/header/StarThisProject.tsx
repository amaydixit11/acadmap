import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import React from 'react'

const StarThisProject = ({className} : {className?: string}) => {
    const handleStarProject = () => {
        window.open('https://github.com/amaydixit11/acadmap', '_blank');
      };
    
  return (
    <Button
    onClick={handleStarProject}
    className={`inline-flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}`}
  >
    <Star className="h-4 w-4" />
    <span>Star this project</span>
  </Button>
  )
}

export default StarThisProject
