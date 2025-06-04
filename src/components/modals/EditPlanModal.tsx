import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import axios from 'axios';

interface SubscriptionPlanforModal {
  _id: string;
  planName: string;
  price: number;
  description?: string;
  billingCycle?: string[] | 'monthly' | 'yearly' | 'quarterly';
  maxProducts?: number;
  maxUsers?: number;
  supportLevel?: string;
  features?: string[];
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

interface EditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlan: () => void;
  planToEdit: SubscriptionPlanforModal;
}

export const EditPlanModal: React.FC<EditPlanModalProps> = ({
  isOpen,
  onClose,
  onUpdatePlan,
  planToEdit,
}) => {
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('planToEdit', planToEdit);
    if (planToEdit) {
      setPlanName(planToEdit.planName || '');
      setPrice(planToEdit.price.toString());
      // Handle features more carefully
      const planFeatures = planToEdit.features;
      if (planFeatures && planFeatures.length > 0) {
        setFeatures([...planFeatures]);
      } else {
        setFeatures(['']);
      }
    }
  }, [planToEdit]);

  const handleFeatureChange = (index: number, value: string) => {
    setFeatures(prev =>
      prev.map((f, i) => (i === index ? value : f))
    );
  };

  const addFeature = () => setFeatures(prev => [...prev, '']);

  const markFeatureForDeletion = (index: number) => {
    setFeatures(prev =>
      prev.map((feature, i) => {
        if (i === index) {
          // If feature already starts with -, remove the - (unmark for deletion)
          if (feature.startsWith('-')) {
            return feature.substring(1);
          }
          // Otherwise, add - to mark for deletion
          return `-${feature}`;
        }
        return feature;
      })
    );
  };

  const isFeatureMarkedForDeletion = (feature: string) => {
    return feature.startsWith('-');
  };

  const handleUpdate = async () => {
    if (!planToEdit || !planName.trim() || !price.trim()) return;

    setIsLoading(true);

    const payload = {
      planName: planName.trim(),
      price: parseFloat(price),
      features: features.map(f => f.trim()).filter(f => f.length > 0), // Keep all features including those marked with -
    };

    console.log('payload', payload);
    console.log('features being sent:', payload.features);
    console.log("ID", planToEdit._id);
    console.log("accessToken", localStorage.getItem('accessToken'));

    try {
      const response = await axios.patch(
        `/api/v1/subscription/update/${planToEdit._id}`,
        payload,
        {
          headers: {
            'Authorization': `${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          },
        }
      );

      console.log('Update response:', response.data);

      if (onUpdatePlan) {
        onUpdatePlan();
      }

      onClose();
    } catch (error) {
      console.error('Update failed:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!planToEdit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Plan Name <span className="text-red-500">*</span></Label>
            <Input
              value={planName}
              onChange={e => setPlanName(e.target.value)}
              placeholder="e.g., Premium"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label>Price <span className="text-red-500">*</span></Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="e.g., 500.90"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label>Features</Label>
            {/* <div className="text-sm text-gray-600 mb-2">
              Click the minus button to mark features for deletion (adds "-" prefix)
            </div> */}
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={e => handleFeatureChange(index, e.target.value)}
                  placeholder="e.g., Unlimited products"
                  disabled={isLoading}
                  className={isFeatureMarkedForDeletion(feature) ? 'line-through text-red-500 bg-red-50' : ''}
                />
                <Button
                  variant="outline"
                  onClick={() => markFeatureForDeletion(index)}
                  disabled={isLoading}
                  className={isFeatureMarkedForDeletion(feature) ? 'bg-red-100 hover:bg-red-200' : ''}
                  title={isFeatureMarkedForDeletion(feature) ? 'Unmark for deletion' : 'Mark for deletion'}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addFeature}
              className="w-full"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </div>
          <div className="flex justify-end pt-4 gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={!planName.trim() || !price.trim() || isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Plan'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};