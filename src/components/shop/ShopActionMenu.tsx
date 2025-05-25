// components/shop/ShopActionMenu.tsx
import React, { useState } from 'react';
import { MoreVertical, Edit, RefreshCw, Power, Trash2 } from 'lucide-react';
import { Shop } from '@/types/shop';

interface ShopActionMenuProps {
  shop: Shop;
  onEdit: (shop: Shop) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number, isActive: boolean) => void;
  onUpdateSubscription: (shop: Shop) => void;
}

export const ShopActionMenu: React.FC<ShopActionMenuProps> = ({
  shop,
  onEdit,
  onDelete,
  onToggleActive,
  onUpdateSubscription
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleEdit = () => {
    onEdit(shop);
    setShowActions(false);
  };

  const handleDelete = () => {
    onDelete(shop.id);
    setShowActions(false);
  };

  const handleToggleActive = () => {
    onToggleActive(shop.id, !shop.isActive);
    setShowActions(false);
  };

  const handleUpdateSubscription = () => {
    onUpdateSubscription(shop);
    setShowActions(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowActions(!showActions)}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        title="More actions"
        aria-label="More actions"
      >
        <MoreVertical className="h-4 w-4 text-gray-600" />
      </button>
      
      {showActions && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowActions(false)}
          />
          <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[160px]">
            <button 
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Shop
            </button>
            <button 
              onClick={handleUpdateSubscription}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Update Subscription
            </button>
            <button 
              onClick={handleToggleActive}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
            >
              <Power className="h-4 w-4 mr-2" />
              {shop.isActive ? 'Deactivate' : 'Activate'}
            </button>
            <hr className="my-1" />
            <button 
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Shop
            </button>
          </div>
        </>
      )}
    </div>
  );
};