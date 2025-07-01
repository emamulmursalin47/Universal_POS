// Application constants

// Routes
export const ROUTES = {
  // Public routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // Super Admin routes
  SUPER_ADMIN: {
    DASHBOARD: "/super-admin",
    SHOPS: "/super-admin/shops",
    SHOP_DETAILS: "/super-admin/shops/:id",
    SUBSCRIPTIONS: "/super-admin/subscriptions",
    SETTINGS: "/super-admin/settings",
  },

  // Vendor Admin routes
  VENDOR_ADMIN: {
    DASHBOARD: "/vendor-admin",
    PRODUCTS: "/vendor-admin/products",
    CATEGORIES: "/vendor-admin/categories",
    INVENTORY: "/vendor-admin/inventory",
    SALES: "/vendor-admin/sales",
    REPORTS: "/vendor-admin/reports",
    STAFF: "/vendor-admin/staff",
    CUSTOMERS: "/vendor-admin/customers",
    SETTINGS: "/vendor-admin/settings",
  },

  // Cashier routes
  CASHIER: {
    POS: "/cashier",
    SALES: "/cashier/sales",
    REPORTS: "/cashier/reports",
    PROFILE: "/cashier/profile",
  },
};

// Mock data
export const MOCK_USERS: Record<string, User> = {
  "super-admin-1": {
    id: "super-admin-1",
    name: "John Admin",
    email: "admin@example.com",
    role: "super_admin",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  "vendor-1": {
    id: "vendor-1",
    name: "Alice Vendor",
    email: "vendor@example.com",
    role: "vendor_admin",
    shopId: "shop-1",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  "cashier-1": {
    id: "cashier-1",
    name: "Bob Cashier",
    email: "cashier@example.com",
    role: "cashier",
    shopId: "shop-1",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
};

export const MOCK_SHOPS: Shop[] = [
  {
    id: "shop-1",
    name: "Fashion Boutique",
    logo: "https://via.placeholder.com/150",
    address: "123 Fashion St, Style City",
    contact: "+1 123-456-7890",
    email: "contact@fashionboutique.com",
    subscriptionPlan: "premium",
    subscriptionStatus: "active",
    createdAt: "2023-01-15T10:00:00Z",
    ownerId: "vendor-1",
  },
  {
    id: "shop-2",
    name: "Tech Haven",
    logo: "https://via.placeholder.com/150",
    address: "456 Tech Ave, Digital City",
    contact: "+1 234-567-8901",
    email: "info@techhaven.com",
    subscriptionPlan: "standard",
    subscriptionStatus: "active",
    createdAt: "2023-02-20T14:30:00Z",
    ownerId: "vendor-2",
  },
  {
    id: "shop-3",
    name: "Gourmet Delights",
    logo: "https://via.placeholder.com/150",
    address: "789 Flavor Rd, Taste Town",
    contact: "+1 345-678-9012",
    email: "hello@gourmetdelights.com",
    subscriptionPlan: "basic",
    subscriptionStatus: "expired",
    createdAt: "2023-03-10T09:15:00Z",
    ownerId: "vendor-3",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "product-1",
    name: "T-Shirt - Cotton Blue",
    description: "Comfortable cotton t-shirt in blue",
    sku: "TS-BLU-001",
    barcode: "123456789012",
    price: 19.99,
    cost: 8.5,
    stock: 45,
    categoryId: "category-1",
    shopId: "shop-1",
    image: "https://via.placeholder.com/150",
    createdAt: "2023-04-01T08:00:00Z",
    updatedAt: "2023-04-01T08:00:00Z",
  },
  {
    id: "product-2",
    name: "Jeans - Slim Fit",
    description: "Stylish slim fit jeans",
    sku: "JN-SLM-002",
    barcode: "223456789012",
    price: 49.99,
    cost: 22.5,
    stock: 30,
    categoryId: "category-1",
    shopId: "shop-1",
    image: "https://via.placeholder.com/150",
    createdAt: "2023-04-02T09:30:00Z",
    updatedAt: "2023-04-02T09:30:00Z",
  },
  {
    id: "product-3",
    name: "Leather Wallet",
    description: "Premium leather wallet",
    sku: "ACC-WAL-003",
    barcode: "323456789012",
    price: 29.99,
    cost: 12.75,
    stock: 25,
    categoryId: "category-2",
    shopId: "shop-1",
    image: "https://via.placeholder.com/150",
    createdAt: "2023-04-03T10:45:00Z",
    updatedAt: "2023-04-03T10:45:00Z",
  },
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "category-1",
    name: "Clothing",
    description: "All types of clothing items",
    shopId: "shop-1",
  },
  {
    id: "category-2",
    name: "Accessories",
    description: "Fashion accessories",
    shopId: "shop-1",
  },
  {
    id: "category-3",
    name: "Footwear",
    description: "Shoes and other footwear",
    shopId: "shop-1",
  },
];

export const MOCK_SALES: Sale[] = [
  {
    id: "sale-1",
    shopId: "shop-1",
    cashierId: "cashier-1",
    customerId: "customer-1",
    items: [
      {
        productId: "product-1",
        name: "T-Shirt - Cotton Blue",
        price: 19.99,
        quantity: 2,
        discount: 0,
        total: 39.98,
      },
      {
        productId: "product-3",
        name: "Leather Wallet",
        price: 29.99,
        quantity: 1,
        discount: 5,
        total: 24.99,
      },
    ],
    subtotal: 64.97,
    discount: 5,
    tax: 5.99,
    total: 65.96,
    paymentMethod: "card",
    status: "completed",
    createdAt: "2023-05-10T14:25:00Z",
  },
  {
    id: "sale-2",
    shopId: "shop-1",
    cashierId: "cashier-1",
    items: [
      {
        productId: "product-2",
        name: "Jeans - Slim Fit",
        price: 49.99,
        quantity: 1,
        discount: 0,
        total: 49.99,
      },
    ],
    subtotal: 49.99,
    discount: 0,
    tax: 5.0,
    total: 54.99,
    paymentMethod: "cash",
    status: "completed",
    createdAt: "2023-05-11T11:15:00Z",
  },
];

import { type UserRole, type User } from "./types";
