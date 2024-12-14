import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Calendar, SortDesc, SortAsc } from "lucide-react";

interface ResourceFiltersProps {
  filters: {
    selectedResourceType: string;
    selectedYear: string | null;
    sortOrder: "asc" | "desc";
  };
  onTypeChange: (value: string) => void;
  onYearChange: (value: string | null) => void;
  onSortChange: (value: "asc" | "desc") => void;
  availableYears: number[];
  resourceTypes: Array<{ value: string; label: string; }>;
}

export function ResourceFilters({
  filters,
  onTypeChange,
  onYearChange,
  onSortChange,
  availableYears,
  resourceTypes
}: ResourceFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      <Select 
        value={filters.selectedResourceType}
        onValueChange={onTypeChange}
      >
        <SelectTrigger className="w-[200px]">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Resource Type" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {resourceTypes.map(type => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={filters.selectedYear || "all"}
        onValueChange={(value) => onYearChange(value === "all" ? null : value)}
      >
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Year" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          {availableYears.map(year => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sortOrder}
        onValueChange={onSortChange}
      >
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center">
            {filters.sortOrder === "desc" ? (
              <SortDesc className="mr-2 h-4 w-4 text-muted-foreground" />
            ) : (
              <SortAsc className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <SelectValue placeholder="Sort Order" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Newest First</SelectItem>
          <SelectItem value="asc">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}