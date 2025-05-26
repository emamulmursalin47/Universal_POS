// components/StaffSearch.tsx
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface StaffSearchProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

const StaffSearch: React.FC<StaffSearchProps> = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onClearFilters
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, login ID, or staff ID..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Status Filter */}
        <div className="flex flex-col sm:flex-row gap-3 lg:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
          
          {(searchTerm || statusFilter !== 'all') && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="px-4 py-2"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        {searchTerm && (
          <span>Searching for "<span className="font-medium text-blue-600">{searchTerm}</span>"</span>
        )}
        {statusFilter !== 'all' && (
          <span className="ml-2">Status: <span className="font-medium">{statusFilter}</span></span>
        )}
      </div>
    </div>
  );
};

export default StaffSearch;