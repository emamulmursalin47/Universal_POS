/* eslint-disable @typescript-eslint/ban-ts-comment */
// components/shop/modals/EditShopModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit } from 'lucide-react';
import { Shop, ShopFormData } from '@/types/shop';

interface EditShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: Shop | null;
  onUpdateShop: (shop: Shop) => void;
}

export const EditShopModal: React.FC<EditShopModalProps> = ({ isOpen, onClose, shop, onUpdateShop }) => {
  const [formData, setFormData] = useState<ShopFormData>({
    name: shop?.name || '',
    email: shop?.email || '',
    contact: shop?.contact || '',
    subscriptionPlan: shop?.subscriptionPlan || 'basic',
    deadline: shop?.deadline ? shop.deadline.split('T')[0] : ''
  });

  useEffect(() => {
    if (shop) {
      setFormData({
        name: shop.name,
        email: shop.email,
        contact: shop.contact,
        subscriptionPlan: shop.subscriptionPlan,
        deadline: shop.deadline ? shop.deadline.split('T')[0] : ''
      });
    }
  }, [shop]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shop) return;
    //@ts-ignore
    const updatedShop: Shop = {
      ...shop,
      ...formData,
      lastUpdated: new Date().toISOString()
    };
    onUpdateShop(updatedShop);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Shop
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-shop-name">Shop Name</Label>
            <Input
              id="edit-shop-name"
              placeholder="Enter shop name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-shop-email">Email</Label>
            <Input
              id="edit-shop-email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-shop-contact">Contact Number</Label>
            <Input
              id="edit-shop-contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-subscription-plan">Subscription Plan</Label>
            <Select value={formData.subscriptionPlan} onValueChange={(value) => setFormData(prev => ({ ...prev, subscriptionPlan: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-deadline">Subscription Deadline</Label>
            <Input
              id="edit-deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Edit className="h-4 w-4 mr-2" />
              Update Shop
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};