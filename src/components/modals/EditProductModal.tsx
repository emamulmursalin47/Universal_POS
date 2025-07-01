import React, { useState, useEffect, useCallback } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { DollarSign, Edit } from 'lucide-react';
import { Category, ProductFormData, ProductFormDataError, EditProductFormData } from '@/types/products';
import axios from 'axios';


interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductFormData | null;
  onUpdate: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<EditProductFormData>({
    productName: "",
    category: "",
    buyPrice: 0,
    sellingPrice: 0,
    quantity: 0,
    unitType: "" // e.g., 'piece', 'kg', 'box'
  });

  const [errors, setErrors] = useState<Partial<ProductFormDataError>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const unites = ['pcs', 'kgs', 'liters', 'boxes']

  // Populate form when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        category: product.category._id,
        buyPrice: product.buyPrice,
        sellingPrice: product.sellingPrice,
        quantity: product.quantity,
        unitType: product.unitType,
      });

    }
  }, [product]);

  const resetForm = () => {
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormDataError> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.buyPrice as number <= 0) {
      newErrors.buyPrice = 'Buy price must be greater than 0';
    }

    if (formData.sellingPrice as number <= 0) {
      newErrors.sellingPrice = 'Sell price must be greater than 0';
    }

    if (formData.quantity as number < 0) {
      newErrors.quantity = 'Stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    if (validateForm()) {
      const updatedProduct: ProductFormData = {
        productName: formData.productName,
        category: formData.category,
        buyPrice: formData.buyPrice,
        sellingPrice: formData.sellingPrice,
        quantity: formData.quantity,
        unitType: formData.unitType,
      };
      axios.patch(`/api/v1/product/update-product/${product._id}`, updatedProduct, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`
        },
      })
      // console.log(response);
      onUpdate();
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/category/all-category', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`
        },
      });
      setCategories(response.data.data);
      // console.log('Categories:', response.data.data);
    } catch {
      // console.error('Error fetching categories:', error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Product: {product.productName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

            {/* Product ID (Read-only) */}
            {/* <div className="space-y-2">
              <Label htmlFor="productId">Product ID</Label>
              <Input
                id="productId"
                value={formData.}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500">Product ID cannot be changed</p>
            </div> */}

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                placeholder="Enter product name"
                className={errors.productName ? 'border-red-500' : ''}
              />
              {errors.productName && <p className="text-sm text-red-500">{errors.productName}</p>}
            </div>

            {/* Description */}
            {/* <div className="space-y-2">
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
            </div> */}

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category} // This determines the selected item
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category._id}>
                      {category.categoryName}
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
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                  className={errors.sellingPrice ? 'border-red-500' : ''}
                />
                {errors.sellingPrice && <p className="text-sm text-red-500">{errors.sellingPrice}</p>}
              </div>
            </div>

            {/* Profit Margin Display */}
            {formData.buyPrice as number > 0 && formData.sellingPrice as number > 0 && (
              <div
                className={`p-3 rounded-lg ${formData.buyPrice > formData.sellingPrice
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-green-50 border border-green-200'
                  }`}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className={`${formData.buyPrice > formData.sellingPrice
                    ? 'text-red-700'
                    : 'text-green-700'
                    }`}>
                    Profit Margin:
                  </span>
                  <span className={`font-medium ${formData.buyPrice > formData.sellingPrice
                    ? 'text-red-800'
                    : 'text-green-800'
                    }`}>
                    {(((formData.sellingPrice as number - formData.buyPrice as number) / formData.buyPrice as number) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className={`${formData.buyPrice > formData.sellingPrice
                    ? 'text-red-700'
                    : 'text-green-700'
                    }`}>Profit per unit:</span>
                  <span className={`font-medium ${formData.buyPrice > formData.sellingPrice
                    ? 'text-red-800'
                    : 'text-green-800'
                    }`}>
                    ৳ {(formData.sellingPrice as number - formData.buyPrice as number).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Stock Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stock Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current Stock */}
              <div className="space-y-2">
                <Label htmlFor="stock">Current Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                  className={errors.quantity ? 'border-red-500' : ''}
                />
                {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Unit *</Label>
                <Select
                  value={formData.unitType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, unitType: value }))}
                >
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {unites.map((unit, index) => (
                      <SelectItem key={index} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>

              {/* Minimum Stock */}
              {/* <div className="space-y-2">
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
              </div> */}
            </div>

            {/* Stock Status Warning */}
            {/* {formData.quantity <= formData.minStock && formData.stock > 0 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Warning: Current stock is at or below the minimum stock level
                </p>
              </div>
            )} */}

            {/* {formData.stock === 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  🚨 Alert: Product is currently out of stock
                </p>
              </div>
            )} */}
          </div>

          {/* Barcode */}
          {/* <div className="space-y-4">
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
                  Generate New
                </Button>
              </div>
              {errors.barCode && <p className="text-sm text-red-500">{errors.barCode}</p>}
            </div>
          </div> */}

          {/* Product Status Info */}
          {/* <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Product Status Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Current Status:</span>
                <span className={`ml-2 font-medium ${product.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {product. === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Created:</span>
                <span className="ml-2 font-medium">
                  {product.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div> */}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={handleClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Update Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;