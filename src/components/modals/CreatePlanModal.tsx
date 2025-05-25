// components/subscription/CreatePlanModal.tsx
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { CreatePlanFormData, SubscriptionPlan } from '../../types/subscription';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlan: (plan: SubscriptionPlan) => void;
}

const initialFormData: CreatePlanFormData = {
  name: '',
  price: '',
  billingCycle: 'monthly',
  description: '',
  features: [''],
  maxProducts: '',
  maxUsers: '',
  supportLevel: 'basic',
};

export const CreatePlanModal: React.FC<CreatePlanModalProps> = ({
  isOpen,
  onClose,
  onCreatePlan,
}) => {
  const [formData, setFormData] = useState<CreatePlanFormData>(initialFormData);

  const handleInputChange = useCallback(<K extends keyof CreatePlanFormData>(
    field: K,
    value: CreatePlanFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFeatureChange = useCallback((index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  }, []);

  const addFeature = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  }, []);

  const removeFeature = useCallback((index: number) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  }, [formData.features.length]);

  const validateAndCreatePlan = useCallback(() => {
    if (!formData.name.trim() || !formData.price.trim()) {
      return;
    }

    const planId = formData.name.toLowerCase().replace(/\s+/g, '-');
    const createdPlan: SubscriptionPlan = {
      id: planId,
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      billingCycle: formData.billingCycle,
      features: formData.features.filter(feature => feature.trim() !== ''),
      maxProducts: formData.maxProducts === 'unlimited' ? -1 : parseInt(formData.maxProducts) || 0,
      maxUsers: formData.maxUsers === 'unlimited' ? -1 : parseInt(formData.maxUsers) || 0,
      supportLevel: formData.supportLevel,
      description: formData.description.trim() || undefined,
    };

    onCreatePlan(createdPlan);
    setFormData(initialFormData);
    onClose();
  }, [formData, onCreatePlan, onClose]);

  const handleClose = useCallback(() => {
    setFormData(initialFormData);
    onClose();
  }, [onClose]);

  const isFormValid = formData.name.trim() && formData.price.trim();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Subscription Plan</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
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
                onValueChange={(value: CreatePlanFormData['billingCycle']) => 
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
              onValueChange={(value: CreatePlanFormData['supportLevel']) => 
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
              onClick={validateAndCreatePlan} 
              className="flex-1"
              disabled={!isFormValid}
            >
              Create Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};