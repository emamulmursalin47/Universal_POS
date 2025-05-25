// components/subscription/EditPlanModal.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { EditPlanFormData, SubscriptionPlan } from '../../types/subscription';

interface EditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlan: (plan: SubscriptionPlan) => void;
  planToEdit: SubscriptionPlan | null;
}

const convertPlanToFormData = (plan: SubscriptionPlan): EditPlanFormData => ({
  id: plan.id,
  name: plan.name,
  price: plan.price.toString(),
  billingCycle: plan.billingCycle,
  description: plan.description || '',
  features: [...plan.features],
  maxProducts: plan.maxProducts === -1 ? 'unlimited' : plan.maxProducts.toString(),
  maxUsers: plan.maxUsers === -1 ? 'unlimited' : plan.maxUsers.toString(),
  supportLevel: plan.supportLevel,
  isEnabled: plan.isEnabled,
});

export const EditPlanModal: React.FC<EditPlanModalProps> = ({
  isOpen,
  onClose,
  onUpdatePlan,
  planToEdit,
}) => {
  const [formData, setFormData] = useState<EditPlanFormData | null>(null);

  useEffect(() => {
    if (planToEdit) {
      setFormData(convertPlanToFormData(planToEdit));
    }
  }, [planToEdit]);

  const handleInputChange = useCallback(<K extends keyof EditPlanFormData>(
    field: K,
    value: EditPlanFormData[K]
  ) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  }, []);

  const handleFeatureChange = useCallback((index: number, value: string) => {
    setFormData(prev => prev ? ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }) : null);
  }, []);

  const addFeature = useCallback(() => {
    setFormData(prev => prev ? ({
      ...prev,
      features: [...prev.features, '']
    }) : null);
  }, []);

  const removeFeature = useCallback((index: number) => {
    setFormData(prev => {
      if (!prev || prev.features.length <= 1) return prev;
      return {
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      };
    });
  }, []);

  const validateAndUpdatePlan = useCallback(() => {
    if (!formData || !formData.name.trim() || !formData.price.trim()) {
      return;
    }

    const updatedPlan: SubscriptionPlan = {
      id: formData.id,
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      billingCycle: formData.billingCycle,
      features: formData.features.filter(feature => feature.trim() !== ''),
      maxProducts: formData.maxProducts === 'unlimited' ? -1 : parseInt(formData.maxProducts) || 0,
      maxUsers: formData.maxUsers === 'unlimited' ? -1 : parseInt(formData.maxUsers) || 0,
      supportLevel: formData.supportLevel,
      description: formData.description.trim() || undefined,
      isEnabled: formData.isEnabled,
      createdAt: planToEdit?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onUpdatePlan(updatedPlan);
    onClose();
  }, [formData, onUpdatePlan, onClose, planToEdit]);

  const handleClose = useCallback(() => {
    setFormData(null);
    onClose();
  }, [onClose]);

  if (!formData) return null;

  const isFormValid = formData.name.trim() && formData.price.trim();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="planStatus" className="text-base font-medium">
                Plan Status
              </Label>
              <p className="text-sm text-muted-foreground">
                {formData.isEnabled ? 'Plan is currently active and available for subscription' : 'Plan is disabled and not available for new subscriptions'}
              </p>
            </div>
            <Switch
              id="planStatus"
              checked={formData.isEnabled}
              onCheckedChange={(checked) => handleInputChange('isEnabled', checked)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="planName">Plan Name *</Label>
              <Input
                id="planName"
                placeholder="e.g., Professional Plan"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="29.99"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the plan..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <Select 
                value={formData.billingCycle} 
                onValueChange={(value: EditPlanFormData['billingCycle']) => 
                  handleInputChange('billingCycle', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxProducts">Max Products</Label>
              <Input
                id="maxProducts"
                placeholder="1000 or 'unlimited'"
                value={formData.maxProducts}
                onChange={(e) => handleInputChange('maxProducts', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxUsers">Max Users</Label>
              <Input
                id="maxUsers"
                placeholder="5 or 'unlimited'"
                value={formData.maxUsers}
                onChange={(e) => handleInputChange('maxUsers', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportLevel">Support Level</Label>
            <Select 
              value={formData.supportLevel} 
              onValueChange={(value: EditPlanFormData['supportLevel']) => 
                handleInputChange('supportLevel', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic Support</SelectItem>
                <SelectItem value="standard">Standard Support</SelectItem>
                <SelectItem value="premium">Premium Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Features</Label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="e.g., Advanced analytics"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                />
                {formData.features.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button onClick={handleClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={validateAndUpdatePlan} 
              className="flex-1"
              disabled={!isFormValid}
            >
              Update Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};