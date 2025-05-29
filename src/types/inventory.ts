// types/inventory.ts
export interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reorderPoint: number;
  price: number;
  image?: string;
  category: string;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  adjustmentType: 'increase' | 'decrease' | 'set';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  adjustedBy: string;
  adjustedAt: Date;
  notes?: string;
}

export interface StockAdjustmentFormData {
  productId: string;
  adjustmentType: 'increase' | 'decrease' | 'set';
  quantity: number;
  reason: string;
  notes?: string;
}

export type AdjustmentReason = 
  | 'damaged'
  | 'lost'
  | 'expired'
  | 'returned'
  | 'found'
  | 'correction'
  | 'manual_count'
  | 'other';

export const ADJUSTMENT_REASONS: Record<AdjustmentReason, string> = {
  damaged: 'Damaged Items',
  lost: 'Lost/Stolen',
  expired: 'Expired Items',
  returned: 'Customer Return',
  found: 'Found Items',
  correction: 'Inventory Correction',
  manual_count: 'Manual Count Adjustment',
  other: 'Other'
};