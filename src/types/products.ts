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
  brandName?: string;
  barCodeNumber: string;
  createdAt: string; // or Date
  updatedAt: string;
}


export interface ProductFormData {
  _id?: string;
  productName: string;
  category: string | object | Category | any; // This is likely a category ID (MongoDB ObjectId as string)
  buyPrice: number;
  sellingPrice: number;
  quantity: number;
  unitType: string; // e.g., 'piece', 'kg', 'box'
  brandName?: string;
}

export interface EditProductFormData {
  productName: string;
  category: string; // This is likely a category ID (MongoDB ObjectId as string)
  buyPrice: number;
  sellingPrice: number;
  quantity: number;
  unitType: string; // e.g., 'piece', 'kg', 'box'
  brandName?: string;
}

export interface ProductFormDataError {
  productName: string;
  category: string; // This is likely a category ID (MongoDB ObjectId as string)
  buyPrice: number | string;
  sellingPrice: number | string;
  quantity: number | string;
  unitType: string; // e.g., 'piece', 'kg', 'box'
  brandName: string;
}

export interface ProductSearchFilters {
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
  stockFilter: string;
}

export interface ProfitSummary {
  totalProducts: number;
  totalBuyPrice: number;
  totalSellingPrice: number;
  totalProfit: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
};