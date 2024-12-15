import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Search } from "lucide-react";
import { FormEvent } from "react";
  
  interface SearchDialogProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (isOpen: boolean) => void;
    handleSearch: (e: FormEvent<HTMLFormElement>) => void;
  }
  
  export const SearchDialog = ({
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    handleSearch,
  }: SearchDialogProps) => (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-accent"
          aria-label="Search resources"
        >
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Search Resources</DialogTitle>
        <form onSubmit={handleSearch} className="flex items-center space-x-2 mt-4">
          <Input 
            placeholder="Search course materials..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            aria-label="Search input"
          />
          <Button type="submit">Search</Button>
        </form>
      </DialogContent>
    </Dialog>
  );