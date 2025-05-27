// hooks/useProducts.ts

import { useState, useCallback } from 'react';
import { Product, ProductFormData, Notification } from '../types/products';
import { INITIAL_PRODUCTS } from '../constants/products';
import { validateProductForm } from '../utils/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
  }, []);

  const addProduct = useCallback((formData: ProductFormData) => {
    const errors = validateProductForm(formData);
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      sku: formData.sku,
      categoryId: formData.categoryId,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      description: formData.description,
      image: formData.image || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProducts(prev => [...prev, newProduct]);
    showNotification('success', 'Product added successfully!');
    return { success: true, product: newProduct };
  }, [showNotification]);

  const updateProduct = useCallback((productId: string, formData: ProductFormData) => {
    const errors = validateProductForm(formData);
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const productToUpdate = products.find(p => p.id === productId);
    if (!productToUpdate) {
      return { success: false, errors: { general: 'Product not found' } };
    }

    const updatedProduct: Product = {
      ...productToUpdate,
      name: formData.name,
      sku: formData.sku,
      categoryId: formData.categoryId,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      description: formData.description,
      image: formData.image || undefined,
      updatedAt: new Date(),
    };

    setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
    showNotification('success', 'Product updated successfully!');
    return { success: true, product: updatedProduct };
  }, [products, showNotification]);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showNotification('success', 'Product deleted successfully!');
  }, [showNotification]);

  return {
    products,
    notification,
    setNotification,
    addProduct,
    updateProduct,
    deleteProduct,
    showNotification,
  };
};