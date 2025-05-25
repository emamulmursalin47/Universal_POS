// components/shop/ShopSearch.tsx (Responsive)
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface ShopSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ShopSearch: React.FC<ShopSearchProps> = ({ searchTerm, onSearchChange }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      
      {/* Search Input */}
      <Input
        placeholder="Search shops by name or email..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-10 h-10 sm:h-11 text-sm sm:text-base"
      />
      
      {/* Clear Button */}
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          title="Clear search"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      )}
    </div>
  );
};