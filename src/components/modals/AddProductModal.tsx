import React, { useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
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

import { Package, DollarSign } from 'lucide-react';
import { ProductFormData, Category, ProductFormDataError } from '@/types/products';
import axios from 'axios';


interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}


const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const unites = ['pcs', 'kgs', 'liters', 'boxes']
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    category: '',
    buyPrice: 0,
    sellingPrice: 0,
    quantity: 0,
    unitType: 'pcs',
    brandName: '',
  });

  const [errors, setErrors] = useState<Partial<ProductFormDataError>>({});
  const [brands, setBrands] = useState<{ _id: string; brandName: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredBrands = brands.filter(
    brand => brand.brandName.toLowerCase().includes((formData.brandName ?? '').toLowerCase()) && (formData.brandName ?? '').trim() !== ""
  );

  const handleSelect = (brand: string) => {
    setFormData(prev => ({ ...prev, brandName: brand }));
    setShowSuggestions(false);
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      category: '',
      buyPrice: 0,
      sellingPrice: 0,
      quantity: 0,
      unitType: 'pcs',
      brandName: '',
    });
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

    if (!formData.unitType) {
      newErrors.unitType = 'Unit type is required';
    }
    if (!formData.brandName) {
      newErrors.brandName = 'Brand name is required'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // console.log('Form is valid, submitting:', formData);
      await axios.post('/api/v1/product/create-product', formData, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`
        },
      })

      // console.log(response);

      onSave();
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

  const fetchBrands = useCallback(async () => {
    try {
      const response = await axios.get("/api/v1/brand/all-brand", {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`
        },
      });
      if (response.data.success) {
        setBrands(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch brands", error);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Product
          </DialogTitle>
          <DialogDescription>
            Add new Product and save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

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

            {/* Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

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
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category._id}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name *</Label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, brandName: e.target.value }));
                    setShowSuggestions(true);
                  }}
                  placeholder="Enter Brand name"
                  className={errors.productName ? 'border-red-500' : ''}
                />
                {errors.brandName && <p className="text-sm text-red-500">{errors.brandName}</p>}
                {showSuggestions && filteredBrands.length > 0 && (
                  <div className="absolute z-10 bg-white border mt-1 rounded w-full shadow">
                    {filteredBrands.map((brand, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleSelect(brand.brandName)}
                      >
                        {brand.brandName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                  min={0}
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
                  min={0}
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
              {/* Initial Stock */}
              <div className="space-y-2">
                <Label htmlFor="stock">Initial Stock Quantity *</Label>
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

              {/* Unit Type */}
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