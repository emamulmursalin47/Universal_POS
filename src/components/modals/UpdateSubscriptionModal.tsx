// components/shop/modals/UpdateSubscriptionModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw } from 'lucide-react';
import { Shop, UpdateSubscriptionData, SubscriptionPlan } from '@/types/shop';

interface UpdateSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: Shop | null;
  onUpdateSubscription: (shop: Shop) => void;
}

export const UpdateSubscriptionModal: React.FC<UpdateSubscriptionModalProps> = ({ 
  isOpen, 
  onClose, 
  shop, 
  onUpdateSubscription 
}) => {
  const [subscriptionData, setSubscriptionData] = useState<UpdateSubscriptionData>({
    subscriptionPlan: shop?.subscriptionPlan || 'basic',
    deadline: shop?.deadline ? shop.deadline.split('T')[0] : ''
  });

  useEffect(() => {
    if (shop) {
      setSubscriptionData({
        subscriptionPlan: shop.subscriptionPlan,
        deadline: shop.deadline ? shop.deadline.split('T')[0] : ''
      });
    }
  }, [shop]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shop) return;
    
    const updatedShop: Shop = {
      ...shop,
      subscriptionPlan: subscriptionData.subscriptionPlan as SubscriptionPlan,
      deadline: subscriptionData.deadline,
      subscriptionStatus: 'active',
      lastUpdated: new Date().toISOString()
    };
    onUpdateSubscription(updatedShop);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Update Subscription
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="update-subscription-plan">Subscription Plan</Label>
            <Select 
              value={subscriptionData.subscriptionPlan} 
              onValueChange={(value) => setSubscriptionData(prev => ({ ...prev, subscriptionPlan: value }))}
            >
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
            <Label htmlFor="update-deadline">New Deadline</Label>
            <Input
              id="update-deadline"
              type="date"
              value={subscriptionData.deadline}
              onChange={(e) => setSubscriptionData(prev => ({ ...prev, deadline: e.target.value }))}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <RefreshCw className="h-4 w-4 mr-2" />
              Update Subscription
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};