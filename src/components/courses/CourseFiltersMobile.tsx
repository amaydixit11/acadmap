import { cn } from "@/lib/utils";
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
            className={cn(
              "w-full justify-between",
              "dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            )}
            aria-label="Open filters"
          >
            <div className="flex items-center">
              <SlidersHorizontal 
                className={cn(
                  "mr-2 h-4 w-4",
                  "dark:text-gray-300"
                )} 
              />
              Filters
            </div>
          </Button>
        </DrawerTrigger>
        
        <DrawerContent 
          className={cn(
            "dark:bg-black",
            "dark:border-gray-800"
          )}
        >
          <DrawerHeader className="relative">
            <DrawerTitle 
              className={cn(
                "flex items-center justify-between",
                "text-gray-900",
                "dark:text-white"
              )}
            >
              Filters
              <DrawerClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "absolute right-0 top-0",
                    "dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  )}
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription 
              className={cn(
                "text-gray-600",
                "dark:text-gray-400"
              )}
            >
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
                className={cn(
                  "flex-1",
                  "dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                )}
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