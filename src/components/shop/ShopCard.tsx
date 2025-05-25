// components/shop/ShopCard.tsx
import React, { memo } from 'react';
import { Building2, Mail, Phone, Calendar } from 'lucide-react';
import { ShopCardProps } from '@/types/shop';

import { 
  getStatusColor, 
  getPlanBadgeColor, 
  getActiveStatusColor, 
  formatDate, 
  formatPlanName, 
  formatStatusName 
} from '@/utils/shopUtils';
import { ShopActionMenu } from './ShopActionMenu';

export const ShopCard: React.FC<ShopCardProps> = memo(({ 
  shop, 
  onEdit, 
  onDelete, 
  onToggleActive, 
  onUpdateSubscription 
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow ${
      !shop.isActive ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center flex-1 min-w-0">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
            shop.isActive ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <Building2 className={`h-5 w-5 ${shop.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 
              className="font-semibold text-lg text-gray-900 truncate" 
              title={shop.name}
            >
              {shop.name}
            </h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span 
                className={`px-2 py-1 rounded-full text-xs font-medium ${getActiveStatusColor(shop.isActive)}`}
                title={`Shop Status: ${shop.isActive ? 'Active' : 'Inactive'}`}
              >
                {shop.isActive ? 'Active' : 'Inactive'}
              </span>
              <span 
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shop.subscriptionStatus)}`}
                title={`Subscription: ${formatStatusName(shop.subscriptionStatus)}`}
              >
                {formatStatusName(shop.subscriptionStatus)}
              </span>
              <span 
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanBadgeColor(shop.subscriptionPlan)}`}
                title={`Plan: ${formatPlanName(shop.subscriptionPlan)}`}
              >
                {formatPlanName(shop.subscriptionPlan)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="ml-2 flex-shrink-0">
          <ShopActionMenu
            shop={shop}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleActive={onToggleActive}
            onUpdateSubscription={onUpdateSubscription}
          />
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate" title={shop.email}>
            {shop.email}
          </span>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate" title={shop.contact}>
            {shop.contact}
          </span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>Created: {formatDate(shop.createdAt)}</span>
        </div>
        {shop.lastUpdated && (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Updated: {formatDate(shop.lastUpdated)}</span>
          </div>
        )}
      </div>
    </div>
  );
});

ShopCard.displayName = 'ShopCard';