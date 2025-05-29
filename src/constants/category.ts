// lib/constants.ts

import { Category, Product } from "@/types/category";


export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and accessories' },
  { id: '2', name: 'Clothing', description: 'Apparel and fashion items' },
  { id: '3', name: 'Home & Kitchen' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Smartphone', categoryId: '1' },
  { id: 'p2', name: 'Laptop', categoryId: '1' },
  { id: 'p3', name: 'T-Shirt', categoryId: '2' },
  { id: 'p4', name: 'Blender', categoryId: '3' },
];