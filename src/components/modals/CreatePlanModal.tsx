// components/subscription/CreatePlanModal.tsx
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Loader2 } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';

interface CreatePlanFormData {
  planName: string;
  price: string;
  description: string;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  maxProducts: string;
  maxUsers: string;
  supportLevel: string;
  features: string[];
  status: 'active' | 'inactive';
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  features: string[];
  maxProducts: number | string;
  maxUsers: number | string;
  supportLevel: string;
  description?: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlan?: (plan: SubscriptionPlan) => void;
  onPlanCreated?: () => void;
}

const initialFormData: CreatePlanFormData = {
  planName: '',
  price: '',
  description: '',
  billingCycle: 'monthly',
  maxProducts: '',
  maxUsers: '',
  supportLevel: '',
  features: [''],
  status: 'active',
};

const supportLevelOptions = [
  { value: 'Basic Support', label: 'Basic Support' },
  { value: 'Standard Support', label: 'Standard Support' },
  { value: 'Premium Support', label: 'Premium Support' },
  { value: '24/7 Dedicated Support', label: '24/7 Dedicated Support' },
  { value: 'Enterprise Support', label: 'Enterprise Support' },
];

export const CreatePlanModal: React.FC<CreatePlanModalProps> = ({
  isOpen,
  onClose,
  onCreatePlan,
  onPlanCreated,
}) => {
  const [formData, setFormData] = useState<CreatePlanFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = useCallback(() => {
    if (!formData.planName.trim()) {
      // toast({
      //   title: "Validation Error",
      //   description: "Plan name is required",
      //   variant: "destructive",
      // });
      return false;
    }

    if (!formData.price.trim() || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      // toast({
      //   title: "Validation Error",
      //   description: "Valid price is required",
      //   variant: "destructive",
      // });
      return false;
    }

    if (!formData.supportLevel.trim()) {
      // toast({
      //   title: "Validation Error",
      //   description: "Support level is required",
      //   variant: "destructive",
      // });
      return false;
    }

    const validFeatures = formData.features.filter(feature => feature.trim() !== '');
    if (validFeatures.length === 0) {
      // toast({
      //   title: "Validation Error",
      //   description: "At least one feature is required",
      //   variant: "destructive",
      // });
      return false;
    }

    return true;
  }, [formData]);

  const handleSubmit = useCallback(async () => {

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare payload matching the API structure exactly
      const payload = {
        planName: formData.planName.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        billingCycle: formData.billingCycle,
        maxProducts: formData.maxProducts.toLowerCase() === 'unlimited' ? 'unlimited' :
          (parseInt(formData.maxProducts) || 0),
        maxUsers: formData.maxUsers.toLowerCase() === 'unlimited' ? 'unlimited' :
          (parseInt(formData.maxUsers) || 0),
        supportLevel: formData.supportLevel,
        features: formData.features.filter(feature => feature.trim() !== ''),
        status: formData.status,
      };

       await axios.post('/api/v1/subscription/create-subcription', payload, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      // const result = response.data;

      // toast({
      //   title: "Success",
      //   description: "Subscription plan created successfully",
      // });

      // If onCreatePlan callback is provided (for backward compatibility)
      if (onCreatePlan) {
        const planId = formData.planName.toLowerCase().replace(/\s+/g, '-');
        const createdPlan: SubscriptionPlan = {
          id: planId,
          name: formData.planName.trim(),
          price: parseFloat(formData.price),
          billingCycle: formData.billingCycle,
          features: formData.features.filter(feature => feature.trim() !== ''),
          maxProducts: formData.maxProducts === 'unlimited' ? 'unlimited' : parseInt(formData.maxProducts) || 0,
          maxUsers: formData.maxUsers === 'unlimited' ? 'unlimited' : parseInt(formData.maxUsers) || 0,
          supportLevel: formData.supportLevel,
          description: formData.description.trim() || undefined,
          isEnabled: formData.status === 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        onCreatePlan(createdPlan);
      }

      setFormData(initialFormData);
      onClose();
      onPlanCreated?.();

    } catch (error) {
      console.error('Error creating plan:', error);

      // let errorMessage = "Failed to create subscription plan";

      if (axios.isAxiosError(error)) {
        // Handle axios-specific errors
        if (error.response?.data?.message) {
          // errorMessage = error.response.data.message;
        } else if (error.message) {
          // errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        // errorMessage = error.message;
      }

      // toast({
      //   title: "Error",
      //   description: errorMessage,
      //   variant: "destructive",
      // });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onClose, onPlanCreated, onCreatePlan]);

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setFormData(initialFormData);
      onClose();
    }
  }, [onClose, isSubmitting]);

  const isFormValid = formData.planName.trim() &&
    formData.price.trim() &&
    formData.supportLevel.trim() &&
    formData.features.some(feature => feature.trim() !== '');

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
                placeholder="e.g., Enterprise Plan"
                value={formData.planName}
                onChange={(e) => handleInputChange('planName', e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="199.99"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="An enterprise-grade plan for large-scale businesses..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
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
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxUsers">Max Users</Label>
              <Input
                id="maxUsers"
                placeholder="100 or 'unlimited'"
                value={formData.maxUsers}
                onChange={(e) => handleInputChange('maxUsers', e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supportLevel">Support Level *</Label>
              <Select
                value={formData.supportLevel}
                onValueChange={(value: string) =>
                  handleInputChange('supportLevel', value)
                }
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select support level" />
                </SelectTrigger>
                <SelectContent>
                  {supportLevelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: CreatePlanFormData['status']) =>
                  handleInputChange('status', value)
                }
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Features *</Label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="e.g., Advanced security"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  disabled={isSubmitting}
                />
                {formData.features.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeFeature(index)}
                    disabled={isSubmitting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addFeature}
              className="w-full"
              disabled={isSubmitting}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Plan'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};