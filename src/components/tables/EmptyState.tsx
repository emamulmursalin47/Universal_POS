// components/EmptyState.tsx

import React from 'react';
import { Package, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddProduct: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddProduct }) => {
  return (
    <div className="text-center py-12">
      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500 mb-6">Get started by adding your first product</p>
      <button
        onClick={onAddProduct}
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors gap-2"
      >
        <Plus className="h-5 w-5" />
        Add New Product
      </button>
    </div>
  );
};