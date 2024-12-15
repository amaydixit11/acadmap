import { 
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";
  import { useState } from "react";
  import { Button } from "@/components/ui/button";
  import { SlidersHorizontal, X } from "lucide-react";
  import { FilterContent } from "./CourseFiltersContent";
  import { ClearFilters } from "./ClearFiltersButton";
  
  const CourseFiltersMobile = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
    const handleClose = () => {
      setIsDrawerOpen(false);
    };
  
    return (
      <Drawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen}
        modal={true}
      >
        <DrawerTrigger asChild className="md:hidden w-full">
          <Button 
            variant="outline" 
            className="w-full justify-between"
            aria-label="Open filters"
          >
            <div className="flex items-center">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </div>
          </Button>
        </DrawerTrigger>
        
        <DrawerContent>
          <DrawerHeader className="relative">
            <DrawerTitle className="flex items-center justify-between">
              Filters
              <DrawerClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription>
              Filter courses by department and level
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4 overflow-y-auto max-h-[70vh]">
            <FilterContent />
          </div>
          
          <DrawerFooter className="flex-row justify-between gap-2">
            <DrawerClose asChild>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DrawerClose>
            <ClearFilters />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default CourseFiltersMobile;