/* eslint-disable @typescript-eslint/ban-ts-comment */
// components/shop/modals/EditShopModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Building2, User, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { Shop, ShopFormData } from '@/types/shop';

interface EditShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: Shop | null;
  onUpdateShop: (shop: Shop) => void;
}

export const EditShopModal: React.FC<EditShopModalProps> = ({ 
  isOpen, 
  onClose, 
  shop, 
  onUpdateShop 
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

  useEffect(() => {
    if (shop) {
      setFormData({
        name: shop.name,
        email: shop.email,
        contact: shop.contact,
        address: shop.address,
        ownerName: shop.ownerName,
        ownerPhone: shop.ownerPhone,
        subscriptionPlan: shop.subscriptionPlan,
        deadline: shop.deadline ? shop.deadline.split('T')[0] : ''
      });
      setErrors({});
    }
  }, [shop]);

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
    if (!shop || !validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // @ts-ignore
      const updatedShop: Shop = {
        ...shop,
        ...formData,
        lastUpdated: new Date().toISOString()
      };
      onUpdateShop(updatedShop);
      onClose();
    } catch (error) {
      console.error('Error updating shop:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Edit className="h-6 w-6 text-blue-600" />
            Edit Shop Details
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Shop Information */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Shop Information</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-shop-name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Shop Name *
                </Label>
                <Input
                  id="edit-shop-name"
                  placeholder="Enter shop name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`h-11 ${errors.name ? 'border-red-500' : ''}`}
                  required
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-shop-email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Shop Email *
                </Label>
                <Input
                  id="edit-shop-email"
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
              
              <div className="space-y-2">
                <Label htmlFor="edit-shop-contact" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Shop Contact Number *
                </Label>
                <Input
                  id="edit-shop-contact"
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
              
              <div className="space-y-2">
                <Label htmlFor="edit-shop-address" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shop Address *
                </Label>
                <Input
                  id="edit-shop-address"
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
                
                <div className="space-y-2">
                  <Label htmlFor="edit-owner-name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Owner Name *
                  </Label>
                  <Input
                    id="edit-owner-name"
                    placeholder="Enter owner's full name"
                    value={formData.ownerName}
                    onChange={(e) => updateFormData('ownerName', e.target.value)}
                    className={`h-11 ${errors.ownerName ? 'border-red-500' : ''}`}
                    required
                    disabled={isSubmitting}
                  />
                  {errors.ownerName && <p className="text-sm text-red-600">{errors.ownerName}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-owner-phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Owner Phone *
                  </Label>
                  <Input
                    id="edit-owner-phone"
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
                
                <div className="space-y-2">
                  <Label htmlFor="edit-subscription-plan" className="text-sm font-medium text-gray-700">
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
                
                <div className="space-y-2">
                  <Label htmlFor="edit-deadline" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Subscription Deadline *
                  </Label>
                  <Input
                    id="edit-deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => updateFormData('deadline', e.target.value)}
                    className={`h-11 ${errors.deadline ? 'border-red-500' : ''}`}
                    required
                    disabled={isSubmitting}
                  />
                  {errors.deadline && <p className="text-sm text-red-600">{errors.deadline}</p>}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
              className="h-11 px-6"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Shop
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};