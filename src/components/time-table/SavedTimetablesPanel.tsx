"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Save, 
  FolderOpen, 
  Trash2, 
  Star, 
  MoreVertical,
  Loader2,
  ChevronDown,
  Clock,
  Calendar,
  Share2
} from "lucide-react";
import { useSavedTimetables } from "@/hooks/useSavedTimetables";
import { useAuth } from "@/context/AuthContext";
import { TimetableConfig } from "@/models/resources";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SavedTimetablesPanelProps {
  currentCourseCodes: string[];
  onLoadTimetable: (courseCodes: string[]) => void;
  className?: string;
}

export function SavedTimetablesPanel({
  currentCourseCodes,
  onLoadTimetable,
  className,
}: SavedTimetablesPanelProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [timetableName, setTimetableName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const {
    timetables,
    isLoading,
    currentTimetable,
    saveTimetable,
    loadTimetable,
    deleteTimetable,
    setDefaultTimetable,
    makePublic,
  } = useSavedTimetables();

  const handleSave = async () => {
    if (!timetableName.trim() || currentCourseCodes.length === 0) return;
    
    setIsSaving(true);
    const config: TimetableConfig = {
      course_codes: currentCourseCodes,
    };
    
    await saveTimetable(timetableName.trim(), config);
    setTimetableName("");
    setSaveDialogOpen(false);
    setIsSaving(false);
  };

  const handleLoad = (id: string) => {
    const timetable = loadTimetable(id);
    if (timetable) {
      onLoadTimetable(timetable.config.course_codes);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={cn(
        "flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400",
        className
      )}>
        <Save className="h-4 w-4" />
        <span>Sign in to save timetables</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {/* Save Button */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            disabled={currentCourseCodes.length === 0}
            className="gap-1.5"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Timetable</DialogTitle>
            <DialogDescription>
              Save your current course selection for quick access later.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="e.g., Spring 2025 Schedule"
              value={timetableName}
              onChange={(e) => setTimetableName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2">
              {currentCourseCodes.length} course(s) selected
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!timetableName.trim() || isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            disabled={timetables.length === 0}
            className="gap-1.5"
          >
            <FolderOpen className="h-4 w-4" />
            <span className="hidden sm:inline">
              {currentTimetable ? currentTimetable.name : "Load"}
            </span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : timetables.length === 0 ? (
            <div className="px-3 py-4 text-center text-sm text-gray-500">
              No saved timetables yet
            </div>
          ) : (
            timetables.map((tt) => (
              <div key={tt.id} className="relative group">
                <DropdownMenuItem
                  onClick={() => handleLoad(tt.id)}
                  className="pr-10 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{tt.name}</span>
                      {tt.is_default && (
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {formatDate(tt.updated_at)}
                      <Badge variant="secondary" className="text-[10px] px-1 py-0">
                        {tt.config.course_codes.length} courses
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuItem>
                
                {/* Actions Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" side="right">
                    <DropdownMenuItem 
                      onClick={async () => {
                        const success = await makePublic(tt.id);
                        if (success) {
                          const url = `${window.location.origin}/time-table/share/${tt.id}`;
                          navigator.clipboard.writeText(url);
                        }
                      }}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      {(tt as any).is_public ? 'Copy Link' : 'Share'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDefaultTimetable(tt.id)}>
                      <Star className="h-4 w-4 mr-2" />
                      Set as default
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => deleteTimetable(tt.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Current timetable indicator */}
      {currentTimetable && (
        <Badge variant="secondary" className="hidden md:inline-flex gap-1">
          <Calendar className="h-3 w-3" />
          {currentTimetable.name}
        </Badge>
      )}
    </div>
  );
}

export default SavedTimetablesPanel;
