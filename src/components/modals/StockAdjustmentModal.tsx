// modals/StockAdjustmentModal.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Package, AlertTriangle } from 'lucide-react';
import { Product, StockAdjustmentFormData, ADJUSTMENT_REASONS, AdjustmentReason } from '@/types/inventory';

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAdjust: (data: StockAdjustmentFormData) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export default function StockAdjustmentModal({
  isOpen,
  onClose,
  product,
  onAdjust,
  isLoading,
  error
}: StockAdjustmentModalProps) {
  const [formData, setFormData] = useState<StockAdjustmentFormData>({
    productId: '',
    adjustmentType: 'increase',
    quantity: 0,
    reason: 'correction',
    notes: ''
  });

  const [previewStock, setPreviewStock] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        productId: product.id
      }));
      calculatePreviewStock(product.stock, 'increase', 0);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      calculatePreviewStock(product.stock, formData.adjustmentType, formData.quantity);
    }
  }, [formData.adjustmentType, formData.quantity, product]);

  const calculatePreviewStock = (currentStock: number, type: string, quantity: number) => {
    switch (type) {
      case 'increase':
        setPreviewStock(currentStock + quantity);
        break;
      case 'decrease':
        setPreviewStock(Math.max(0, currentStock - quantity));
        break;
      case 'set':
        setPreviewStock(Math.max(0, quantity));
        break;
      default:
        setPreviewStock(currentStock);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;

    const success = await onAdjust(formData);
    if (success) {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      adjustmentType: 'increase',
      quantity: 0,
      reason: 'correction',
      notes: ''
    });
    setPreviewStock(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!product) return null;

  const getStockStatusColor = (stock: number) => {
    if (stock > 20) return 'text-green-600';
    if (stock > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStockStatusText = (stock: number) => {
    if (stock > 20) return 'Good Stock';
    if (stock > 10) return 'Low Stock';
    if (stock > 0) return 'Critical Stock';
    return 'Out of Stock';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Stock Adjustment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Info */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
              )}
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Current Stock:</span>
              <span className={`font-medium ${getStockStatusColor(product.stock)}`}>
                {product.stock} units ({getStockStatusText(product.stock)})
              </span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Adjustment Type */}
          <div className="space-y-3">
            <Label>Adjustment Type</Label>
            <RadioGroup
              value={formData.adjustmentType}
              onValueChange={(value: 'increase' | 'decrease' | 'set') =>
                setFormData(prev => ({ ...prev, adjustmentType: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="increase" id="increase" />
                <Label htmlFor="increase">Increase Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="decrease" id="decrease" />
                <Label htmlFor="decrease">Decrease Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="set" id="set" />
                <Label htmlFor="set">Set Exact Amount</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">
              {formData.adjustmentType === 'set' ? 'New Stock Amount' : 'Quantity'}
            </Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={formData.quantity || ''}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))
              }
              placeholder={formData.adjustmentType === 'set' ? 'Enter new stock amount' : 'Enter quantity'}
              required
            />
          </div>

          {/* Stock Preview */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center text-sm">
              <span>New Stock Level:</span>
              <span className={`font-semibold ${getStockStatusColor(previewStock)}`}>
                {previewStock} units
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {getStockStatusText(previewStock)}
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Adjustment</Label>
            <Select
              value={formData.reason}
              onValueChange={(value: AdjustmentReason) =>
                setFormData(prev => ({ ...prev, reason: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ADJUSTMENT_REASONS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Enter any additional notes..."
              rows={3}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || formData.quantity <= 0}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Adjust Stock
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}