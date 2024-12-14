import { 
    FileText, 
    Users,
    Zap, 
  } from "lucide-react";

const BottomHighlights = () => {
  return (
    <div className="bg-secondary/50 py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <FileText className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-2xl font-bold">500+ Resources</h3>
          <p className="text-muted-foreground">Course materials and notes</p>
        </div>
        <div className="flex flex-col items-center">
          <Users className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold">100+ Contributors</h3>
          <p className="text-muted-foreground">Students helping students</p>
        </div>
        <div className="flex flex-col items-center">
          <Zap className="h-12 w-12 text-orange-500 mb-4" />
          <h3 className="text-2xl font-bold">24/7 Access</h3>
          <p className="text-muted-foreground">Learn and share anytime</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BottomHighlights
