import { useFilters } from "@/context/FiltersContext";
import { cn } from "@/lib/utils";

export const ClearFilters = () => {
    const {filters, dispatch} = useFilters();
    const handleClearFilters = () => {
      dispatch({ type: 'RESET_FILTERS'});
    };
    const activeFiltersCount = filters.departments.length + filters.levels.length;
    
    if (activeFiltersCount === 0) return null;

    return (
      <button 
        onClick={handleClearFilters} 
        className="text-[10px] font-black uppercase tracking-widest text-[#ef4444] hover:underline"
      >
        Clear ({activeFiltersCount})
      </button>
    )
  }