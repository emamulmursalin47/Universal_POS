// modals/BulkStockAdjustmentModal.tsx
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Package, AlertTriangle, Search } from 'lucide-react';
import { Product, StockAdjustmentFormData, ADJUSTMENT_REASONS, AdjustmentReason } from '@/types/inventory';

interface BulkStockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onBulkAdjust: (adjustments: StockAdjustmentFormData[]) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

interface BulkAdjustmentData {
  adjustmentType: 'increase' | 'decrease' | 'set';
  quantity: number;
  reason: AdjustmentReason;
  notes: string;
  applyToAll: boolean;
}

export default function BulkStockAdjustmentModal({
  isOpen,
  onClose,
  products,
  onBulkAdjust,
  isLoading,
  error
}: BulkStockAdjustmentModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [bulkData, setBulkData] = useState<BulkAdjustmentData>({
    adjustmentType: 'increase',
    quantity: 0,
    reason: 'correction',
    notes: '',
    applyToAll: false
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleProductToggle = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProducts.size === 0) return;

    const adjustments: StockAdjustmentFormData[] = Array.from(selectedProducts).map(productId => ({
      productId,
      adjustmentType: bulkData.adjustmentType,
      quantity: bulkData.quantity,
      reason: bulkData.reason,
      notes: bulkData.notes
    }));

    const success = await onBulkAdjust(adjustments);
    if (success) {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setSearchTerm('');
    setSelectedProducts(new Set());
    setBulkData({
      adjustmentType: 'increase',
      quantity: 0,
      reason: 'correction',
      notes: '',
      applyToAll: false
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const calculateNewStock = (currentStock: number) => {
    switch (bulkData.adjustmentType) {
      case 'increase':
        return currentStock + bulkData.quantity;
      case 'decrease':
        return Math.max(0, currentStock - bulkData.quantity);
      case 'set':
        return Math.max(0, bulkData.quantity);
      default:
        return currentStock;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Bulk Stock Adjustment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Adjustment Type */}
            <div className="space-y-2">
              <Label>Adjustment Type</Label>
              <Select
                value={bulkData.adjustmentType}
                onValueChange={(value: 'increase' | 'decrease' | 'set') =>
                  setBulkData(prev => ({ ...prev, adjustmentType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase">Increase Stock</SelectItem>
                  <SelectItem value="decrease">Decrease Stock</SelectItem>
                  <SelectItem value="set">Set Exact Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label>
                {bulkData.adjustmentType === 'set' ? 'New Amount' : 'Quantity'}
              </Label>
              <Input
                type="number"
                min="0"
                value={bulkData.quantity || ''}
                onChange={(e) =>
                  setBulkData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))
                }
                placeholder="Enter value"
                required
              />
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label>Reason</Label>
              <Select
                value={bulkData.reason}
                onValueChange={(value: AdjustmentReason) =>
                  setBulkData(prev => ({ ...prev, reason: value }))
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
          </div>

          {/* Notes */}
          <div className="space-y-2 mb-4">
            <Label>Additional Notes (Optional)</Label>
            <Textarea
              value={bulkData.notes}
              onChange={(e) =>
                setBulkData(prev => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Enter notes for this bulk adjustment..."
              rows={2}
            />
          </div>

          {/* Product Selection */}
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">
                Select Products ({selectedProducts.size} selected)
              </h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-lg flex-1 min-h-0 overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead>New Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => {
                      const newStock = calculateNewStock(product.stock);
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.has(product.id)}
                              onCheckedChange={() => handleProductToggle(product.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-6 w-6 rounded object-cover"
                                />
                              ) : (
                                <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                                  <Package className="h-3 w-3 text-primary" />
                                </div>
                              )}
                              <span className="font-medium text-sm">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {product.sku}
                          </TableCell>
                          <TableCell className="text-sm">{product.stock}</TableCell>
                          <TableCell className="text-sm font-medium">
                            {selectedProducts.has(product.id) ? newStock : product.stock}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              (selectedProducts.has(product.id) ? newStock : product.stock) > 20
                                ? 'bg-green-100 text-green-800'
                                : (selectedProducts.has(product.id) ? newStock : product.stock) > 10
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {(selectedProducts.has(product.id) ? newStock : product.stock) > 20
                                ? 'Good'
                                : (selectedProducts.has(product.id) ? newStock : product.stock) > 10
                                ? 'Low'
                                : 'Critical'}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || selectedProducts.size === 0 || bulkData.quantity <= 0}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Adjust {selectedProducts.size} Products
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}