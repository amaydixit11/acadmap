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
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            className="lg:hidden w-full h-12 rounded-xl justify-between px-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            aria-label="Open filters"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              Adjust Filters
            </div>
            <ClearFilters />
          </Button>
        </DrawerTrigger>
        
        <DrawerContent className="dark:bg-[#0b0c10] border-slate-200 dark:border-slate-800">
          <DrawerHeader className="text-left border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-black uppercase tracking-tight text-foreground">
                Filter Vault
              </DrawerTitle>
              <DrawerClose asChild>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </DrawerClose>
            </div>
            <DrawerDescription className="text-slate-500 dark:text-slate-400 mt-1">
              Refine your search by department and academic level.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-6 py-8 overflow-y-auto max-h-[60vh] space-y-8">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-6">Departments</h3>
              <FilterContent section="department" />
            </div>
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-6">Academic Level</h3>
              <FilterContent section="level" />
            </div>
          </div>
          
          <DrawerFooter className="p-6 border-t border-slate-100 dark:border-slate-800">
            <Button 
              className="w-full h-14 rounded-xl font-bold text-lg"
              onClick={handleClose}
            >
              Apply Selection
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default CourseFiltersMobile;