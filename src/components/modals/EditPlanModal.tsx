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
import { Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import { SubscriptionPlan } from '@/lib/types';

interface EditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlan: () => void;
  planToEdit: SubscriptionPlan;
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

  useEffect(() => {
    if (planToEdit) {
      // setPlanName(planToEdit.planName || '');
      setPrice(planToEdit.price.toString());
      setFeatures(planToEdit.features || ['']);
    }
  }, [planToEdit]);

  const handleFeatureChange = (index: number, value: string) => {
    setFeatures(prev =>
      prev.map((f, i) => (i === index ? value : f))
    );
  };

  const addFeature = () => setFeatures(prev => [...prev, '']);
  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleUpdate = async () => {
    if (!planToEdit || !planName.trim() || !price.trim()) return;

    const payload = {
      planName: planName.trim(),
      price: parseFloat(price),
      features: features.map(f => f.trim()).filter(Boolean),
    };

    try {
      await axios.patch(`/api/v1/subscription/update/${planToEdit._id}`,
        payload, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`
        },
      }
      );

      onUpdatePlan();
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
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
            <Label>Plan Name *</Label>
            <Input
              value={planName}
              onChange={e => setPlanName(e.target.value)}
              placeholder="e.g., Premium"
            />
          </div>
          <div className="space-y-2">
            <Label>Price *</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="e.g., 500.90"
            />
          </div>
          <div className="space-y-2">
            <Label>Features</Label>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={e => handleFeatureChange(index, e.target.value)}
                  placeholder="e.g., Unlimited products"
                />
                {features.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addFeature} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </div>
          <div className="flex justify-end pt-4 gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!planName.trim() || !price.trim()}>
              Update Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
