// components/modals/AddProductModal.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Package, DollarSign, Barcode, Hash } from 'lucide-react';
import { ProductFormData } from '@/types/products';
import { PRODUCT_CATEGORIES } from '@/constants/products';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: ProductFormData) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    name: '',
    description: '',
    category: '',
    buyPrice: 0,
    sellPrice: 0,
    stock: 0,
    minStock: 0,
    barCode: '',
    image: null,
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      category: '',
      buyPrice: 0,
      sellPrice: 0,
      stock: 0,
      minStock: 0,
      barCode: '',
      image: null,
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.id.trim()) {
      newErrors.id = 'Product ID is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.buyPrice <= 0) {
      newErrors.buyPrice = 'Buy price must be greater than 0';
    }

    if (formData.sellPrice <= 0) {
      newErrors.sellPrice = 'Sell price must be greater than 0';
    }

    if (formData.sellPrice <= formData.buyPrice) {
      newErrors.sellPrice = 'Sell price must be greater than buy price';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    if (formData.minStock < 0) {
      newErrors.minStock = 'Minimum stock cannot be negative';
    }

    if (!formData.barCode.trim()) {
      newErrors.barCode = 'Barcode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const generateProductId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
    setFormData(prev => ({ ...prev, id: `PROD${timestamp}${randomStr}` }));
  };

  const generateBarcode = () => {
    const barcode = Math.floor(Math.random() * 9000000000000) + 1000000000000;
    setFormData(prev => ({ ...prev, barCode: barcode.toString() }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            {/* Product ID */}
            <div className="space-y-2">
              <Label htmlFor="productId">Product ID *</Label>
              <div className="flex gap-2">
                <Input
                  id="productId"
                  value={formData.id}
                  onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="Enter product ID"
                  className={errors.id ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateProductId}
                  className="whitespace-nowrap"
                >
                  <Hash className="h-4 w-4 mr-1" />
                  Generate
                </Button>
              </div>
              {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                rows={3}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>
          </div>

          {/* Pricing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Buy Price */}
              <div className="space-y-2">
                <Label htmlFor="buyPrice">Buy Price *</Label>
                <Input
                  id="buyPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.buyPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, buyPrice: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                  className={errors.buyPrice ? 'border-red-500' : ''}
                />
                {errors.buyPrice && <p className="text-sm text-red-500">{errors.buyPrice}</p>}
              </div>

              {/* Sell Price */}
              <div className="space-y-2">
                <Label htmlFor="sellPrice">Sell Price *</Label>
                <Input
                  id="sellPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.sellPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellPrice: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                  className={errors.sellPrice ? 'border-red-500' : ''}
                />
                {errors.sellPrice && <p className="text-sm text-red-500">{errors.sellPrice}</p>}
              </div>
            </div>

            {/* Profit Margin Display */}
            {formData.buyPrice > 0 && formData.sellPrice > 0 && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Profit Margin:</span>
                  <span className="font-medium text-green-800">
                    {(((formData.sellPrice - formData.buyPrice) / formData.buyPrice) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-green-700">Profit per unit:</span>
                  <span className="font-medium text-green-800">
                    ${(formData.sellPrice - formData.buyPrice).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Stock Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stock Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Initial Stock */}
              <div className="space-y-2">
                <Label htmlFor="stock">Initial Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                  className={errors.stock ? 'border-red-500' : ''}
                />
                {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
              </div>

              {/* Minimum Stock */}
              <div className="space-y-2">
                <Label htmlFor="minStock">Minimum Stock Level *</Label>
                <Input
                  id="minStock"
                  type="number"
                  min="0"
                  value={formData.minStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, minStock: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                  className={errors.minStock ? 'border-red-500' : ''}
                />
                {errors.minStock && <p className="text-sm text-red-500">{errors.minStock}</p>}
                <p className="text-xs text-gray-500">
                  You'll be alerted when stock falls below this level
                </p>
              </div>
            </div>
          </div>

          {/* Barcode */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Barcode className="h-5 w-5" />
              Product Identification
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="barCode">Barcode *</Label>
              <div className="flex gap-2">
                <Input
                  id="barCode"
                  value={formData.barCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, barCode: e.target.value }))}
                  placeholder="Enter or generate barcode"
                  className={errors.barCode ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateBarcode}
                  className="whitespace-nowrap"
                >
                  <Barcode className="h-4 w-4 mr-1" />
                  Generate
                </Button>
              </div>
              {errors.barCode && <p className="text-sm text-red-500">{errors.barCode}</p>}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={handleClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;