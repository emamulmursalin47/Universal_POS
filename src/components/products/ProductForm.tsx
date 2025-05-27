// components/ProductForm.tsx

import { MOCK_CATEGORIES } from '@/constants/products';
import { ProductFormData } from '@/types/products';
import React from 'react';


interface ProductFormProps {
  formData: ProductFormData;
  formErrors: Partial<ProductFormData>;
  onChange: (field: keyof ProductFormData, value: string) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ formData, formErrors, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Enter product name"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            formErrors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
            SKU *
          </label>
          <input
            id="sku"
            type="text"
            value={formData.sku}
            onChange={(e) => onChange('sku', e.target.value)}
            placeholder="e.g., PRD-001"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formErrors.sku ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.sku && <p className="text-sm text-red-500">{formErrors.sku}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            id="category"
            value={formData.categoryId}
            onChange={(e) => onChange('categoryId', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formErrors.categoryId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select category</option>
            {MOCK_CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {formErrors.categoryId && <p className="text-sm text-red-500">{formErrors.categoryId}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($) *
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => onChange('price', e.target.value)}
            placeholder="0.00"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formErrors.price ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock Quantity *
          </label>
          <input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => onChange('stock', e.target.value)}
            placeholder="0"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formErrors.stock ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.stock && <p className="text-sm text-red-500">{formErrors.stock}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          id="image"
          type="text"
          value={formData.image}
          onChange={(e) => onChange('image', e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Enter product description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};