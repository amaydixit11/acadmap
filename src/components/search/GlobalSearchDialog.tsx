"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  FileText, 
  User, 
  Loader2,
  ArrowRight,
  Command
} from "lucide-react";
import { useGlobalSearch, useSearchShortcut } from "@/hooks/useGlobalSearch";
import { useSearch } from "@/context/SearchContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function GlobalSearchDialog() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    setQuery,
    results,
    isLoading,
    clearSearch,
    hasResults,
  } = useGlobalSearch();
  const { isOpen, setIsOpen } = useSearch();

  // Register keyboard shortcut
  useSearchShortcut(() => setIsOpen(true));

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    clearSearch();
  };

  const handleResultClick = (path: string) => {
    router.push(path);
    handleClose();
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md",
          "border border-gray-200 dark:border-gray-700",
          "bg-gray-50 dark:bg-gray-800",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "text-gray-500 dark:text-gray-400",
          "text-sm transition-colors duration-200",
          "hidden md:flex"
        )}
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">Search...</span>
        <kbd className={cn(
          "hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded",
          "bg-gray-200 dark:bg-gray-700",
          "text-xs font-mono"
        )}>
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* Mobile Search Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Search Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 gap-0">
          <DialogTitle className="sr-only">Search</DialogTitle>
          
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b dark:border-gray-700">
            <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <Input
              ref={inputRef}
              placeholder="Search courses, resources, users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 p-0 h-auto text-base focus-visible:ring-0 placeholder:text-gray-400"
            />
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {query.length > 0 && query.length < 2 && (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                Type at least 2 characters to search
              </div>
            )}

            {query.length >= 2 && !hasResults && !isLoading && (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No results found for &quot;{query}&quot;
              </div>
            )}

            {hasResults && (
              <div className="py-2">
                {/* Resources */}
                {results.resources.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Resources
                    </div>
                    {results.resources.map((resource) => (
                      <button
                        key={resource.resourceId}
                        onClick={() => handleResultClick(`/resources?q=${resource.course_code}`)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2.5",
                          "hover:bg-gray-100 dark:hover:bg-gray-800",
                          "transition-colors duration-150 text-left"
                        )}
                      >
                        <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {resource.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {resource.course_code}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {resource.category}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}

                {/* Users */}
                {results.users.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Users
                    </div>
                    {results.users.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleResultClick(`/profile/${user.id}`)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2.5",
                          "hover:bg-gray-100 dark:hover:bg-gray-800",
                          "transition-colors duration-150 text-left"
                        )}
                      >
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                          {user.profile_image ? (
                            <img
                              src={user.profile_image}
                              alt={user.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.department || user.role}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t dark:border-gray-700 text-xs text-gray-500">
            <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">ESC</kbd> to close</span>
            <Link 
              href="/resources"
              onClick={handleClose}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Browse all resources →
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GlobalSearchDialog;
