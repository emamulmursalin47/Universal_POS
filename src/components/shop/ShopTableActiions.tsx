// components/shop/ShopTableActions.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, RefreshCw, Power, Trash2 } from 'lucide-react';
import { Shop } from '@/types/shop';

interface ShopTableActionsProps {
  shop: Shop;
  onEdit: (shop: Shop) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number, isActive: boolean) => void;
  onUpdateSubscription: (shop: Shop) => void;
}

export const ShopTableActions: React.FC<ShopTableActionsProps> = ({
  shop,
  onEdit,
  onDelete,
  onToggleActive,
  onUpdateSubscription
}) => {
  return (
    <div className="flex space-x-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(shop)}
        title="Edit Shop"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onUpdateSubscription(shop)}
        title="Update Subscription"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggleActive(shop.id, !shop.isActive)}
        title={shop.isActive ? 'Deactivate' : 'Activate'}
      >
        <Power className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(shop.id)}
        title="Delete Shop"
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};