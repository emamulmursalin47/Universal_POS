/* eslint-disable @typescript-eslint/ban-ts-comment */
// components/shop/modals/AddShopModal.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Plus, User, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { Shop, ShopFormData } from '@/types/shop';
import { ResponsiveModal } from './ResponsiveModal';

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddShop: (shop: Shop) => void;
}

export const AddShopModal: React.FC<AddShopModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddShop 
}) => {
  const [formData, setFormData] = useState<ShopFormData>({
    name: '',
    email: '',
    contact: '',
    address: '',
    ownerName: '',
    ownerPhone: '',
    subscriptionPlan: 'basic',
    deadline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ShopFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ShopFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Shop name is required';
    if (!formData.email.trim()) newErrors.email = 'Shop email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.contact.trim()) newErrors.contact = 'Shop contact is required';
    if (!formData.address.trim()) newErrors.address = 'Shop address is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.ownerPhone.trim()) newErrors.ownerPhone = 'Owner phone is required';
    if (!formData.deadline) newErrors.deadline = 'Subscription deadline is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // @ts-ignore
      const newShop: Shop = {
        id: Date.now(),
        ...formData,
        subscriptionStatus: 'active',
        isActive: true,
        createdAt: new Date().toISOString()
      };
      
      onAddShop(newShop);
      handleClose();
    } catch (error) {
      console.error('Error adding shop:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ 
        name: '', 
        email: '', 
        contact: '', 
        address: '',
        ownerName: '', 
        ownerPhone: '', 
        subscriptionPlan: 'basic', 
        deadline: '' 
      });
      setErrors({});
      onClose();
    }
  };

  const updateFormData = (field: keyof ShopFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Shop"
      icon={<Building2 className="h-5 w-5" />}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Shop Information */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Shop Information</h3>
            </div>
            
            {/* Shop Name */}
            <div className="space-y-2">
              <Label htmlFor="shop-name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Shop Name *
              </Label>
              <Input
                id="shop-name"
                placeholder="Enter shop name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className={`h-11 ${errors.name ? 'border-red-500' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>
            
            {/* Shop Email */}
            <div className="space-y-2">
              <Label htmlFor="shop-email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Shop Email Address *
              </Label>
              <Input
                id="shop-email"
                type="email"
                placeholder="Enter shop email address"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`h-11 ${errors.email ? 'border-red-500' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>
            
            {/* Contact Number */}
            <div className="space-y-2">
              <Label htmlFor="shop-contact" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Shop Contact Number *
              </Label>
              <Input
                id="shop-contact"
                type="tel"
                placeholder="+880-XXXX-XXXXXX"
                value={formData.contact}
                onChange={(e) => updateFormData('contact', e.target.value)}
                className={`h-11 ${errors.contact ? 'border-red-500' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.contact && <p className="text-sm text-red-600">{errors.contact}</p>}
            </div>
            
            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="shop-address" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shop Address *
              </Label>
              <Input
                id="shop-address"
                placeholder="Enter complete shop address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                className={`h-11 ${errors.address ? 'border-red-500' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>
          </div>

          {/* Right Column - Owner & Subscription Information */}
          <div className="space-y-5">
            {/* Owner Information Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                <User className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Owner Information</h3>
              </div>
              
              {/* Owner Name */}
              <div className="space-y-2">
                <Label htmlFor="owner-name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Owner Name *
                </Label>
                <Input
                  id="owner-name"
                  placeholder="Enter owner's full name"
                  value={formData.ownerName}
                  onChange={(e) => updateFormData('ownerName', e.target.value)}
                  className={`h-11 ${errors.ownerName ? 'border-red-500' : ''}`}
                  required
                  disabled={isSubmitting}
                />
                {errors.ownerName && <p className="text-sm text-red-600">{errors.ownerName}</p>}
              </div>
              
              {/* Owner Phone */}
              <div className="space-y-2">
                <Label htmlFor="owner-phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Owner Phone Number *
                </Label>
                <Input
                  id="owner-phone"
                  type="tel"
                  placeholder="+880-XXXX-XXXXXX"
                  value={formData.ownerPhone}
                  onChange={(e) => updateFormData('ownerPhone', e.target.value)}
                  className={`h-11 ${errors.ownerPhone ? 'border-red-500' : ''}`}
                  required
                  disabled={isSubmitting}
                />
                {errors.ownerPhone && <p className="text-sm text-red-600">{errors.ownerPhone}</p>}
              </div>
            </div>

            {/* Subscription Information Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                <Calendar className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Subscription Information</h3>
              </div>
              
              {/* Subscription Plan */}
              <div className="space-y-2">
                <Label htmlFor="subscription-plan" className="text-sm font-medium text-gray-700">
                  Subscription Plan *
                </Label>
                <Select 
                  value={formData.subscriptionPlan} 
                  onValueChange={(value) => updateFormData('subscriptionPlan', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span>Basic Plan</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="standard">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span>Standard Plan</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="premium">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <span>Premium Plan</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Subscription Deadline */}
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Subscription Deadline *
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => updateFormData('deadline', e.target.value)}
                  className={`h-11 ${errors.deadline ? 'border-red-500' : ''}`}
                  required
                  disabled={isSubmitting}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.deadline && <p className="text-sm text-red-600">{errors.deadline}</p>}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end pt-6 border-t border-gray-200">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            disabled={isSubmitting}
            className="order-2 sm:order-1 h-11 px-6"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="order-1 sm:order-2 h-11 px-6"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding Shop...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Shop
              </>
            )}
          </Button>
        </div>
      </form>
    </ResponsiveModal>
  );
};