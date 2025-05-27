// components/product/ProductSearch.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/constants/products';


interface ProductSearchProps {
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
  stockFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
  onStockFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  searchTerm,
  statusFilter,
  categoryFilter,
  stockFilter,
  onSearchChange,
  onStatusFilterChange,
  onCategoryFilterChange,
  onStockFilterChange,
  onClearFilters
}) => {
  const hasActiveFilters = 
    searchTerm.trim() !== '' || 
    statusFilter !== 'all' || 
    categoryFilter !== 'all' ||
    stockFilter !== 'all';

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search by product name, ID, barcode, or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Status Filter */}
        <div className="w-full sm:w-auto min-w-[140px]">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-auto min-w-[160px]">
          <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {PRODUCT_CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stock Filter */}
        <div className="w-full sm:w-auto min-w-[140px]">
          <Select value={stockFilter} onValueChange={onStockFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="w-full sm:w-auto"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
          <span className="font-medium">Active filters:</span>
          {searchTerm && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              Search: "{searchTerm}"
            </span>
          )}
          {statusFilter !== 'all' && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
              Status: {statusFilter}
            </span>
          )}
          {categoryFilter !== 'all' && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
              Category: {categoryFilter}
            </span>
          )}
          {stockFilter !== 'all' && (
            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
              Stock: {stockFilter}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;