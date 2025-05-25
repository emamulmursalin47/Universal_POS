/* eslint-disable @typescript-eslint/ban-ts-comment */
// components/shop/modals/AddShopModal.tsx (Responsive)
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Plus } from 'lucide-react';
import { Shop, ShopFormData } from '@/types/shop';
import { ResponsiveModal } from './ResponsiveModal';

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddShop: (shop: Shop) => void;
}

export const AddShopModal: React.FC<AddShopModalProps> = ({ isOpen, onClose, onAddShop }) => {
  const [formData, setFormData] = useState<ShopFormData>({
    name: '',
    email: '',
    contact: '',
    subscriptionPlan: 'basic',
    deadline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        //@ts-ignore
      const newShop: Shop = {
        id: Date.now(),
        ...formData,
        subscriptionStatus: 'active',
        isActive: true,
        createdAt: new Date().toISOString()
      };
      
      onAddShop(newShop);
      setFormData({ name: '', email: '', contact: '', subscriptionPlan: 'basic', deadline: '' });
      onClose();
    } catch (error) {
      console.error('Error adding shop:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: '', email: '', contact: '', subscriptionPlan: 'basic', deadline: '' });
      onClose();
    }
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Shop"
      icon={<Building2 className="h-5 w-5" />}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Shop Name */}
        <div className="space-y-2">
          <Label htmlFor="shop-name" className="text-sm sm:text-base font-medium">
            Shop Name *
          </Label>
          <Input
            id="shop-name"
            placeholder="Enter shop name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="h-10 sm:h-11"
            required
            disabled={isSubmitting}
          />
        </div>
        
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="shop-email" className="text-sm sm:text-base font-medium">
            Email Address *
          </Label>
          <Input
            id="shop-email"
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="h-10 sm:h-11"
            required
            disabled={isSubmitting}
          />
        </div>
        
        {/* Contact Number */}
        <div className="space-y-2">
          <Label htmlFor="shop-contact" className="text-sm sm:text-base font-medium">
            Contact Number *
          </Label>
          <Input
            id="shop-contact"
            type="tel"
            placeholder="Enter contact number"
            value={formData.contact}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
            className="h-10 sm:h-11"
            required
            disabled={isSubmitting}
          />
        </div>
        
        {/* Subscription Plan - Full width on mobile */}
        <div className="space-y-2">
          <Label htmlFor="subscription-plan" className="text-sm sm:text-base font-medium">
            Subscription Plan *
          </Label>
          <Select 
            value={formData.subscriptionPlan} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, subscriptionPlan: value }))}
            disabled={isSubmitting}
          >
            <SelectTrigger className="h-10 sm:h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic Plan</SelectItem>
              <SelectItem value="standard">Standard Plan</SelectItem>
              <SelectItem value="premium">Premium Plan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Subscription Deadline */}
        <div className="space-y-2">
          <Label htmlFor="deadline" className="text-sm sm:text-base font-medium">
            Subscription Deadline *
          </Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
            className="h-10 sm:h-11"
            required
            disabled={isSubmitting}
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
          />
        </div>
        
        {/* Action Buttons - Stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:justify-end pt-4 sm:pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            disabled={isSubmitting}
            className="order-2 sm:order-1 h-10 sm:h-11"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="order-1 sm:order-2 h-10 sm:h-11"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding...
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