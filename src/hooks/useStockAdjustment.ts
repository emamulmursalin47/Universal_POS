// hooks/useStockAdjustment.ts
import { useState, useCallback } from 'react';
import { Product, StockAdjustment, StockAdjustmentFormData } from '@/types/inventory';

interface UseStockAdjustmentReturn {
  adjustments: StockAdjustment[];
  isLoading: boolean;
  error: string | null;
  adjustStock: (data: StockAdjustmentFormData, product: Product) => Promise<boolean>;
  getAdjustmentHistory: (productId: string) => StockAdjustment[];
  clearError: () => void;
}

export function useStockAdjustment(): UseStockAdjustmentReturn {
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const adjustStock = useCallback(async (
    data: StockAdjustmentFormData, 
    product: Product
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Calculate new stock based on adjustment type
      let newStock: number;
      switch (data.adjustmentType) {
        case 'increase':
          newStock = product.stock + data.quantity;
          break;
        case 'decrease':
          newStock = Math.max(0, product.stock - data.quantity);
          break;
        case 'set':
          newStock = data.quantity;
          break;
        default:
          throw new Error('Invalid adjustment type');
      }

      // Validate adjustment
      if (data.quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
      }

      if (data.adjustmentType === 'set' && data.quantity < 0) {
        throw new Error('Stock cannot be set to negative value');
      }

      // Create adjustment record
      const adjustment: StockAdjustment = {
        id: `adj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        adjustmentType: data.adjustmentType,
        quantity: data.quantity,
        previousStock: product.stock,
        newStock,
        reason: data.reason,
        adjustedBy: 'Current User', // In real app, get from auth context
        adjustedAt: new Date(),
        notes: data.notes
      };

      // Add to adjustment history
      setAdjustments(prev => [adjustment, ...prev]);

      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
      return false;
    }
  }, []);

  const getAdjustmentHistory = useCallback((productId: string): StockAdjustment[] => {
    return adjustments.filter(adj => adj.productId === productId);
  }, [adjustments]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    adjustments,
    isLoading,
    error,
    adjustStock,
    getAdjustmentHistory,
    clearError
  };
}