// types.ts
export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  // Add other product properties as needed
}