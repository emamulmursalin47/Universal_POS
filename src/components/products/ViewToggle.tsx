// components/ViewToggle.tsx

import React from 'react';
import { List} from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'table' | 'grid';
  onViewChange: (mode: 'table' | 'grid') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onViewChange('table')}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
          viewMode === 'table' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <List className="h-5 w-5" />
        <span className="hidden sm:inline">Table</span>
      </button>
      
    </div>
  );
};