// constants/product.ts

import { Product } from "@/types/products";


export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Food & Beverages',
  'Books',
  'Health & Beauty',
  'Home & Garden',
  'Sports & Outdoor',
  'Toys & Games',
  'Automotive',
  'Other'
];

export const MOCK_PRODUCT_DATA: Product[] = [
  {
    id: 'PROD001',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    buyPrice: 75.00,
    sellPrice: 120.00,
    stock: 25,
    minStock: 5,
    barCode: '1234567890123',
    image: null,
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'PROD002',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt available in multiple colors',
    category: 'Clothing',
    buyPrice: 8.00,
    sellPrice: 15.99,
    stock: 50,
    minStock: 10,
    barCode: '2345678901234',
    image: null,
    status: 'active',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'PROD003',
    name: 'Organic Coffee Beans',
    description: 'Premium organic coffee beans from Colombia',
    category: 'Food & Beverages',
    buyPrice: 12.00,
    sellPrice: 22.99,
    stock: 3,
    minStock: 5,
    barCode: '3456789012345',
    image: null,
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'PROD004',
    name: 'JavaScript Programming Book',
    description: 'Comprehensive guide to modern JavaScript development',
    category: 'Books',
    buyPrice: 25.00,
    sellPrice: 45.00,
    stock: 15,
    minStock: 3,
    barCode: '4567890123456',
    image: null,
    status: 'active',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: 'PROD005',
    name: 'Face Moisturizer',
    description: 'Daily moisturizer for all skin types',
    category: 'Health & Beauty',
    buyPrice: 15.00,
    sellPrice: 28.99,
    stock: 0,
    minStock: 8,
    barCode: '5678901234567',
    image: null,
    status: 'inactive',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: 'PROD006',
    name: 'Garden Hose',
    description: 'Flexible 50ft garden hose with spray nozzle',
    category: 'Home & Garden',
    buyPrice: 30.00,
    sellPrice: 49.99,
    stock: 12,
    minStock: 4,
    barCode: '6789012345678',
    image: null,
    status: 'active',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20')
  }
];