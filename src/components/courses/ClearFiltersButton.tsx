import { useFilters } from "@/context/FiltersContext";
import { Button } from "../ui/button";

export const ClearFilters = () => {
    const {filters, dispatch} = useFilters();
    const handleClearFilters = () => {
      dispatch({ type: 'RESET_FILTERS'});
      // setIsDrawerOpen(false);
    };
    const activeFiltersCount = filters.departments.length + filters.levels.length;
    return (
      <>
        {activeFiltersCount > 0 && (
          <div >
            <Button 
              onClick={handleClearFilters} 
              variant="destructive" 
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </>
    )
  }