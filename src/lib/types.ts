// Common types used throughout the application
export type UserRole = 'superAdmin' | 'vendor' | 'manager' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shopId?: string; // Only for vendor_admin and cashier
  avatar?: string;
}

export interface Shop {
  _id: string;
  vendorId?: string;
  user?: string;
  shopName?: string;
  shopOwnerName?: string;
  email?: string;
  contactNumber?: string;
  address: string;
  subscriptionPlan: 'basic' | 'standard' | 'premium';
  subscriptionStatus?: 'active' | 'pending' | 'expired';
  subscriptionDeadline: string;
  status: string;
  isDeleted: false;
  createdAt: string;
  updatedAt?: string;
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
  name?: string;
  // supportLevel: 'basic' | 'standard' | 'premium';
  _id: string;
  planName: string;
  price: number;
  description?: string;
  billingCycle: string[] | 'monthly' | 'yearly' | 'quarterly'; // assuming these are the only two options
  maxProducts: number;
  maxUsers: number;
  supportLevel: string;
  features: string[];
  status: 'active' | 'inactive'; // assuming a limited set of statuses
  createdAt: string; // or `Date` if parsed
  updatedAt: string; // or `Date` if parsed

}

export interface DecodedToken {
  email: string;
  role: UserRole;
  userId: string;
  _id: string;
  iat: number;
  exp: number;
  name?: string;
  shopId?: string;
  avatar?: string;
  shopName?: string;
  shopLogo?: string;
}