import React, { useMemo, useState } from "react";
import { TimeTableParsedCourse } from "@/types/time-table";
import {
  generateVirtualTemplates,
  detectClashes,
  SlotClash,
  VirtualTemplate,
} from "@/lib/clashes";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

interface ClashesTabProps {
  clashes: SlotClash[];
  selectedCourses: TimeTableParsedCourse[];
  allCourses: TimeTableParsedCourse[];
}

export function ClashesTab({
  clashes,
  selectedCourses,
  allCourses,
}: ClashesTabProps) {
  const [expandedClash, setExpandedClash] = useState<string | null>(null);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [showOnlySelectedClashes, setShowOnlySelectedClashes] = useState(true);

  const selectedCodesSet = new Set(selectedCourses.map((c) => c.code));

  // Filter clashes based on toggle
  const filteredClashes = useMemo(() => {
    if (!showOnlySelectedClashes) return clashes;

    return clashes.filter((clash) =>
      clash.courses.some((c) => selectedCodesSet.has(c.code))
    );
  }, [clashes, showOnlySelectedClashes, selectedCodesSet]);

  // Generate templates only from filtered clashes
  const templates = useMemo(
    () =>
      generateVirtualTemplates(filteredClashes, allCourses, selectedCourses),
    [filteredClashes, selectedCourses, allCourses]
  );

  if (selectedCourses.length === 0) {
    return (
      <div
        className={cn(
          "p-8 text-center",
          "bg-blue-50/50 dark:bg-blue-900/20",
          "border border-blue-200 dark:border-blue-700/50",
          "rounded-lg"
        )}
      >
        <AlertCircle
          className={cn(
            "w-8 h-8 mx-auto mb-3",
            "text-blue-600 dark:text-blue-400"
          )}
        />
        <p className={cn("font-medium", "text-blue-800 dark:text-blue-200")}>
          Select courses to check for clashes
        </p>
      </div>
    );
  }

  if (filteredClashes.length === 0) {
    return (
      <div
        className={cn(
          "p-8 text-center",
          "bg-emerald-50/50 dark:bg-emerald-900/20",
          "border border-emerald-200 dark:border-emerald-700/50",
          "rounded-lg"
        )}
      >
        <CheckCircle
          className={cn(
            "w-8 h-8 mx-auto mb-3",
            "text-emerald-600 dark:text-emerald-400"
          )}
        />
        <p
          className={cn(
            "font-medium",
            "text-emerald-800 dark:text-emerald-200"
          )}
        >
          No clashes detected! Your schedule is conflict-free.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Toggle and Summary */}
      <div className="space-y-3">
        <div
          className={cn(
            "flex items-center justify-between p-3 rounded-lg",
            "bg-white/50 dark:bg-gray-900/50",
            "border border-gray-200/50 dark:border-gray-700/50"
          )}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setShowOnlySelectedClashes(!showOnlySelectedClashes)
              }
              className={cn(
                "p-2 rounded transition-colors duration-200",
                showOnlySelectedClashes
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/30 text-gray-600 dark:text-gray-400"
              )}
              title={
                showOnlySelectedClashes
                  ? "Showing selected courses only"
                  : "Showing all clashes"
              }
            >
              {showOnlySelectedClashes ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
            <span
              className={cn(
                "text-sm font-medium",
                "text-gray-700 dark:text-gray-300"
              )}
            >
              {showOnlySelectedClashes
                ? "Selected Courses Only"
                : "All Courses"}
            </span>
          </div>
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded",
              "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            )}
          >
            {filteredClashes.length} clash
            {filteredClashes.length !== 1 ? "es" : ""}
          </span>
        </div>

        {/* Clash Summary */}
        <div
          className={cn(
            "p-4 rounded-lg border",
            "bg-red-50/50 dark:bg-red-900/20",
            "border-red-200 dark:border-red-700/50"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle
              className={cn("w-5 h-5", "text-red-600 dark:text-red-400")}
            />
            <h3
              className={cn("font-semibold", "text-red-900 dark:text-red-100")}
            >
              {filteredClashes.length} Time Slot{" "}
              {filteredClashes.length === 1 ? "Clash" : "Clashes"} Found
            </h3>
          </div>
          <p className={cn("text-sm", "text-red-800 dark:text-red-200")}>
            {filteredClashes.reduce((acc, c) => acc + c.courses.length - 1, 0)}{" "}
            course conflicts across{" "}
            {
              new Set(
                filteredClashes.flatMap((c) => c.courses.map((co) => co.code))
              ).size
            }{" "}
            courses
          </p>
        </div>
      </div>

      {/* Clashes Details */}
      <div className="space-y-3">
        <h4
          className={cn(
            "font-semibold text-sm px-1",
            "text-gray-900 dark:text-gray-100"
          )}
        >
          Conflicting Time Slots
        </h4>
        {filteredClashes.map((clash, idx) => (
          <div
            key={`${clash.slot}-${clash.occurrence}-${idx}`}
            className={cn(
              "rounded-lg border overflow-hidden",
              "bg-white/50 dark:bg-gray-900/50",
              "border-gray-200/50 dark:border-gray-700/50",
              "hover:shadow-sm transition-all duration-200"
            )}
          >
            <button
              onClick={() =>
                setExpandedClash(
                  expandedClash === `${clash.slot}-${clash.occurrence}-${idx}`
                    ? null
                    : `${clash.slot}-${clash.occurrence}-${idx}`
                )
              }
              className={cn(
                "w-full p-3 flex items-center justify-between",
                "hover:bg-gray-50/50 dark:hover:bg-gray-800/30",
                "transition-colors duration-150"
              )}
            >
              <div className="flex items-center gap-3 flex-1 text-left">
                <div
                  className={cn(
                    "px-2 py-1 rounded text-xs font-mono font-semibold",
                    "bg-red-100 dark:bg-red-900/40",
                    "text-red-700 dark:text-red-300"
                  )}
                >
                  {clash.slot}
                  {clash.occurrence}
                </div>
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      "text-gray-900 dark:text-gray-100"
                    )}
                  >
                    {clash.day} • {clash.time}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      "text-gray-600 dark:text-gray-400"
                    )}
                  >
                    {clash.courses.length} courses in same slot
                  </div>
                </div>
              </div>
              {expandedClash === `${clash.slot}-${clash.occurrence}-${idx}` ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedClash === `${clash.slot}-${clash.occurrence}-${idx}` && (
              <div
                className={cn(
                  "px-3 pb-3 space-y-2 border-t",
                  "border-gray-200/30 dark:border-gray-700/30"
                )}
              >
                {clash.courses.map((course) => (
                  <div
                    key={course.code}
                    className={cn(
                      "p-2 rounded text-sm",
                      "bg-gray-50/50 dark:bg-gray-800/30",
                      "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    <span className="font-semibold">{course.code}</span> —{" "}
                    {course.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resolution Templates */}
      {templates.length > 0 && (
        <div className="space-y-3 mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
          <h4
            className={cn(
              "font-semibold text-sm px-1",
              "text-gray-900 dark:text-gray-100"
            )}
          >
            ✨ Resolution Suggestions
          </h4>
          <p className={cn("text-xs px-1", "text-gray-600 dark:text-gray-400")}>
            Virtual templates showing where to move each course to resolve
            clashes
          </p>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle
              className={cn("w-5 h-5", "text-yellow-600 dark:text-yellow-400")}
            />
            <div
              className={cn(
                "font-semibold text-sm",
                "text-yellow-900 dark:text-yellow-100"
              )}
            >
              This is a feature under development, clashes resolution
              suggestions might not be satisfactory
            </div>
          </div>

          {templates.map((template) => (
            <div
              key={template.courseCode}
              className={cn(
                "rounded-lg border overflow-hidden",
                "bg-white/50 dark:bg-gray-900/50",
                "border-gray-200/50 dark:border-gray-700/50",
                "hover:shadow-sm transition-all duration-200"
              )}
            >
              <button
                onClick={() =>
                  setExpandedTemplate(
                    expandedTemplate === template.courseCode
                      ? null
                      : template.courseCode
                  )
                }
                className={cn(
                  "w-full p-3 flex items-center justify-between",
                  "hover:bg-gray-50/50 dark:hover:bg-gray-800/30",
                  "transition-colors duration-150"
                )}
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div>
                    <div
                      className={cn(
                        "text-sm font-medium",
                        "text-gray-900 dark:text-gray-100"
                      )}
                    >
                      {template.courseCode}
                    </div>
                    <div
                      className={cn(
                        "text-xs",
                        "text-gray-600 dark:text-gray-400"
                      )}
                    >
                      {template.courseName}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-1 rounded",
                      template.scenarios.some((s) => s.clashFree)
                        ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                        : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                    )}
                  >
                    {template.scenarios.filter((s) => s.clashFree).length}{" "}
                    solutions
                  </span>
                  {expandedTemplate === template.courseCode ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedTemplate === template.courseCode && (
                <div
                  className={cn(
                    "px-3 pb-3 space-y-2 border-t",
                    "border-gray-200/30 dark:border-gray-700/30"
                  )}
                >
                  <div
                    className={cn(
                      "text-xs py-2 px-2 rounded",
                      "bg-gray-50/50 dark:bg-gray-800/30",
                      "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    <span className="font-medium">Current slots:</span> L:{" "}
                    {template.currentSlots.lecture} | T:{" "}
                    {template.currentSlots.tutorial} | Lab:{" "}
                    {template.currentSlots.lab}
                  </div>

                  {template.scenarios.slice(0, 6).map((scenario) => (
                    <div
                      key={scenario.id}
                      className={cn(
                        "p-2 rounded text-sm border",
                        scenario.clashFree
                          ? "bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-200/50 dark:border-emerald-700/30"
                          : "bg-amber-50/50 dark:bg-amber-900/20 border-amber-200/50 dark:border-amber-700/30"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {scenario.clashFree ? (
                          <CheckCircle
                            className={cn(
                              "w-4 h-4 mt-0.5 flex-shrink-0",
                              "text-emerald-600 dark:text-emerald-400"
                            )}
                          />
                        ) : (
                          <AlertCircle
                            className={cn(
                              "w-4 h-4 mt-0.5 flex-shrink-0",
                              "text-amber-600 dark:text-amber-400"
                            )}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div
                            className={cn(
                              "font-medium break-words",
                              scenario.clashFree
                                ? "text-emerald-900 dark:text-emerald-100"
                                : "text-amber-900 dark:text-amber-100"
                            )}
                          >
                            {scenario.description}
                          </div>
                          <div
                            className={cn(
                              "text-xs mt-1",
                              scenario.clashFree
                                ? "text-emerald-800 dark:text-emerald-200"
                                : "text-amber-800 dark:text-amber-200"
                            )}
                          >
                            {scenario.clashFree
                              ? "✓ Resolves all clashes"
                              : `→ ${scenario.resultingClashes} clash${scenario.resultingClashes !== 1 ? "es" : ""} remaining`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {template.scenarios.length > 6 && (
                    <div
                      className={cn(
                        "text-xs text-center py-2",
                        "text-gray-500 dark:text-gray-400"
                      )}
                    >
                      +{template.scenarios.length - 6} more options
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
