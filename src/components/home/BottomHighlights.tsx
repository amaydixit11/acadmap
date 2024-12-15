import { 
  FileText, 
  Users,
  Zap, 
} from "lucide-react";

const BottomHighlights = () => {
  return (
    <div className="bg-secondary/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center">
            <FileText className="h-12 w-12 text-purple-500 mb-4 sm:h-16 sm:w-16" />
            <h3 className="text-xl font-bold sm:text-2xl">500+ Resources</h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              Course materials and notes
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-12 w-12 text-green-500 mb-4 sm:h-16 sm:w-16" />
            <h3 className="text-xl font-bold sm:text-2xl">100+ Contributors</h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              Students helping students
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="h-12 w-12 text-orange-500 mb-4 sm:h-16 sm:w-16" />
            <h3 className="text-xl font-bold sm:text-2xl">24/7 Access</h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              Learn and share anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomHighlights;
