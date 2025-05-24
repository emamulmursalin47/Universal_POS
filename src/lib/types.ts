// Common types used throughout the application
export type UserRole = 'super_admin' | 'vendor_admin' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shopId?: string; // Only for vendor_admin and cashier
  avatar?: string;
}

export interface Shop {
  id: string;
  name: string;
  logo?: string;
  address: string;
  contact: string;
  email: string;
  subscriptionPlan: 'basic' | 'standard' | 'premium';
  subscriptionStatus: 'active' | 'pending' | 'expired';
  createdAt: string;
  ownerId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  barcode?: string;
  price: number;
  cost: number;
  stock: number;
  categoryId: string;
  shopId: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  shopId: string;
}

export interface Sale {
  id: string;
  shopId: string;
  cashierId: string;
  customerId?: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'other';
  status: 'completed' | 'refunded' | 'partial_refund';
  createdAt: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  shopId: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  maxProducts: number;
  maxUsers: number;
  supportLevel: 'basic' | 'standard' | 'premium';
}