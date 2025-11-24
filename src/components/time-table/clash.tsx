import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

// Mock types for demonstration
interface SlotClash {
  slot: string;
  day: string;
  time: string;
  courses: Array<{ code: string; title: string }>;
  type: 'hard' | 'soft';
}

interface ResolutionSuggestion {
  course: { code: string; title: string };
  suggestedSlot: string;
  improvementScore: number;
}

const ClashResolutionPanel = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Mock data
  const clashes: SlotClash[] = [
    {
      slot: 'A',
      day: 'Monday',
      time: '08:30-09:25',
      courses: [
        { code: 'CSL304', title: 'Artificial Intelligence' },
        { code: 'DSL501', title: 'Machine Learning' },
      ],
      type: 'hard',
    },
    {
      slot: 'B',
      day: 'Tuesday',
      time: '08:30-09:25',
      courses: [
        { code: 'MAL403', title: 'Probability & Statistics' },
        { code: 'EEL205', title: 'Control Systems' },
      ],
      type: 'hard',
    },
  ];
  
  const suggestions: ResolutionSuggestion[] = [
    {
      course: { code: 'DSL501', title: 'Machine Learning' },
      suggestedSlot: 'C',
      improvementScore: 4,
    },
    {
      course: { code: 'EEL205', title: 'Control Systems' },
      suggestedSlot: 'D',
      improvementScore: 3,
    },
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Clash Summary */}
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-semibold text-amber-900 dark:text-amber-100">
            {clashes.length} Clash{clashes.length !== 1 ? 'es' : ''} Detected
          </h3>
        </div>
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Some courses have overlapping time slots. Review and resolve conflicts below.
        </p>
      </div>
      
      {/* Clash Details */}
      <div className="space-y-3">
        {clashes.map((clash, idx) => (
          <div
            key={idx}
            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  Slot {clash.slot} Clash
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {clash.day}, {clash.time}
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded ${
                clash.type === 'hard' 
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}>
                {clash.type === 'hard' ? 'Hard' : 'Soft'} Clash
              </span>
            </div>
            
            <div className="space-y-2">
              {clash.courses.map((course, courseIdx) => (
                <div
                  key={courseIdx}
                  className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded"
                >
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {course.code}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {course.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Suggestions Toggle */}
      <button
        onClick={() => setShowSuggestions(!showSuggestions)}
        className="w-full p-3 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
      >
        <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <span className="font-medium text-blue-900 dark:text-blue-100">
          {showSuggestions ? 'Hide' : 'Show'} Resolution Suggestions
        </span>
      </button>
      
      {/* Suggestions */}
      {showSuggestions && (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Try these alternative slots to resolve clashes:
          </div>
          
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-green-900 dark:text-green-100 mb-1">
                    Move {suggestion.course.code} to Slot {suggestion.suggestedSlot}
                  </div>
                  <div className="text-sm text-green-800 dark:text-green-200 mb-2">
                    {suggestion.course.title}
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-300">
                    Improvement score: {suggestion.improvementScore} (resolves {Math.floor(suggestion.improvementScore / 2)} conflict{suggestion.improvementScore > 2 ? 's' : ''})
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Virtual Template */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          What-If Analysis
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
          Explore alternative schedules without affecting your current selection
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
          Create Virtual Template
        </button>
      </div>
    </div>
  );
};

export default ClashResolutionPanel;