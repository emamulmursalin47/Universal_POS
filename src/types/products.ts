/* eslint-disable @typescript-eslint/no-explicit-any */
// types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  barCode: string;
  image: string | null;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  id: string;
  name: string;
  description: string;
  category: string;
  buyPrice: any;
  sellPrice: any;
  stock: any;
  minStock: any;
  barCode: string;
  image?: string | null;
}

export interface ProductSearchFilters {
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
  stockFilter: string;
}