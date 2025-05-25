// components/AddShopModal.tsx

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Building2, Plus, X } from 'lucide-react';
import { AddShopModalProps, Shop, ShopFormData, SubscriptionPlan } from '@/types/shop';


const AddShopModal: React.FC<AddShopModalProps> = ({ isOpen, onClose, onAddShop }) => {
  const [formData, setFormData] = useState<ShopFormData>({
    name: '',
    email: '',
    contact: '',
    subscriptionPlan: 'basic'
  });

  const [errors, setErrors] = useState<Partial<ShopFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ShopFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Shop name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newShop: Shop = {
        id: Date.now(),
        ...formData,
        subscriptionStatus: 'active',
        createdAt: new Date().toISOString()
      };
      
      await onAddShop(newShop);
      handleClose();
    } catch (error) {
      console.error('Error adding shop:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ShopFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value as SubscriptionPlan;
    handleInputChange('subscriptionPlan', value);
  };

  const handleClose = (): void => {
    setFormData({ 
      name: '', 
      email: '', 
      contact: '', 
      subscriptionPlan: 'basic' 
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Add New Shop</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Shop Name */}
            <div className="space-y-2">
              <label htmlFor="shop-name" className="text-sm font-medium text-gray-700">
                Shop Name <span className="text-red-500">*</span>
              </label>
              <input
                id="shop-name"
                type="text"
                placeholder="Enter shop name"
                value={formData.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  handleInputChange('name', e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                required
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="shop-email" className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="shop-email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  handleInputChange('email', e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                required
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            {/* Contact */}
            <div className="space-y-2">
              <label htmlFor="shop-contact" className="text-sm font-medium text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                id="shop-contact"
                type="text"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  handleInputChange('contact', e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.contact ? 'border-red-500' : 'border-gray-300'
                }`}
                required
                disabled={isSubmitting}
              />
              {errors.contact && (
                <p className="text-sm text-red-600">{errors.contact}</p>
              )}
            </div>
            
            {/* Subscription Plan */}
            <div className="space-y-2">
              <label htmlFor="subscription-plan" className="text-sm font-medium text-gray-700">
                Subscription Plan
              </label>
              <select 
                id="subscription-plan"
                value={formData.subscriptionPlan} 
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="basic">Basic - $9.99/month</option>
                <option value="standard">Standard - $19.99/month</option>
                <option value="premium">Premium - $39.99/month</option>
              </select>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Shop
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShopModal;