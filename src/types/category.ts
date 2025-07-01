// types.ts
export interface Category {
  _id: string;
  categoryName: string;
  description: string;
  status?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  // Add other product properties as needed
}