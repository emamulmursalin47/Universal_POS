// components/shop/ShopActionMenu.tsx (Responsive)
import React, { useState, useRef, useEffect } from 'react';
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
  const [menuPosition, setMenuPosition] = useState<'left' | 'right'>('right');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate menu position based on screen space
  useEffect(() => {
    if (showActions && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const menuWidth = 160; // Approximate menu width
      
      // If there's not enough space on the right, position menu to the left
      if (buttonRect.right + menuWidth > windowWidth - 16) {
        setMenuPosition('left');
      } else {
        setMenuPosition('right');
      }
    }
  }, [showActions]);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showActions]);

  return (
    <div className="relative">
      <button 
        ref={buttonRef}
        onClick={() => setShowActions(!showActions)}
        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-md transition-colors touch-manipulation"
        title="More actions"
        aria-label="More actions"
        aria-expanded={showActions}
        aria-haspopup="true"
      >
        <MoreVertical className="h-4 w-4 text-gray-600" />
      </button>
      
      {showActions && (
        <div 
          ref={menuRef}
          className={`absolute top-8 sm:top-10 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[140px] sm:min-w-[160px] ${
            menuPosition === 'left' ? 'right-0' : 'left-0'
          }`}
          style={{
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto'
          }}
        >
          {/* Edit Action */}
          <button 
            onClick={handleEdit}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-sm hover:bg-gray-50 flex items-center transition-colors touch-manipulation"
          >
            <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
            <span>Edit Shop</span>
          </button>
          
          {/* Update Subscription */}
          <button 
            onClick={handleUpdateSubscription}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-sm hover:bg-gray-50 flex items-center transition-colors touch-manipulation"
          >
            <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
            <span>Update Subscription</span>
          </button>
          
          {/* Toggle Active Status */}
          <button 
            onClick={handleToggleActive}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-sm hover:bg-gray-50 flex items-center transition-colors touch-manipulation"
          >
            <Power className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
            <span>{shop.isActive ? 'Deactivate' : 'Activate'}</span>
          </button>
          
          {/* Separator */}
          <hr className="my-1" />
          
          {/* Delete Action */}
          <button 
            onClick={handleDelete}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-sm hover:bg-red-50 text-red-600 flex items-center transition-colors touch-manipulation"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
            <span>Delete Shop</span>
          </button>
        </div>
      )}
    </div>
  );
};