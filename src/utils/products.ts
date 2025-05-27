// utils/products.ts

import { Product, ProductFormData, StockStatus } from '../types/products';

export const getStockStatus = (stock: number): StockStatus => {
  if (stock > 20) return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  if (stock > 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
  return { label: 'Critical Stock', color: 'bg-red-100 text-red-800' };
};

export const validateProductForm = (formData: ProductFormData): Partial<ProductFormData> => {
  const errors: Partial<ProductFormData> = {};

  if (!formData.name.trim()) errors.name = 'Product name is required';
  if (!formData.sku.trim()) errors.sku = 'SKU is required';
  if (!formData.categoryId) errors.categoryId = 'Category is required';
  if (!formData.price || parseFloat(formData.price) <= 0) errors.price = 'Valid price is required';
  if (!formData.stock || parseInt(formData.stock) < 0) errors.stock = 'Valid stock quantity is required';

  return errors;
};

export const filterProducts = (products: Product[], searchTerm: string): Product[] => {
  const term = searchTerm.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.sku.toLowerCase().includes(term) ||
    product.description?.toLowerCase().includes(term)
  );
};