/* eslint-disable @typescript-eslint/no-explicit-any */
// types/product.ts
export interface Category {
  _id: string;
  categoryName: string;
  description: string;
  status: string;
  isDeleted: boolean;
  createdAt: string; // or Date if you're converting it
  updatedAt: string;
  __v?: number;
}

export interface Product {
  _id: string;
  productName: string;
  sku: string;
  category: Category;
  buyPrice: number;
  sellingPrice: number;
  quantity: number;
  unitType: string;
  isActive: boolean;
  barCodeNumber: string;
  createdAt: string; // or Date
  updatedAt: string;
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

export interface ProfitSummary  {
  totalProducts: number;
  totalBuyPrice: number;
  totalSellingPrice: number;
  totalProfit: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
};