// components/shop/ShopCard.tsx (Responsive)
import React, { memo } from 'react';
import { Building2, Mail, Phone, Calendar } from 'lucide-react';
import { ShopCardProps } from '@/types/shop';
import { ShopActionMenu } from './ShopActionMenu';
import { 
  getStatusColor, 
  getPlanBadgeColor, 
  getActiveStatusColor, 
  formatDate, 
  formatPlanName, 
  formatStatusName,
  getDeadlineStatus
} from '@/utils/shopUtils';

export const ShopCard: React.FC<ShopCardProps> = memo(({ 
  shop, 
  onEdit, 
  onDelete, 
  onToggleActive, 
  onUpdateSubscription 
}) => {
  const deadlineInfo = getDeadlineStatus(shop.deadline);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${
      !shop.isActive ? 'opacity-60' : ''
    }`}>
      {/* Mobile and Tablet Layout */}
      <div className="p-3 sm:p-4 lg:p-5">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center flex-1 min-w-0">
            {/* Shop Icon */}
            <div className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 ${
              shop.isActive ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Building2 className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${shop.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            
            {/* Shop Info */}
            <div className="min-w-0 flex-1">
              <h3 
                className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900 truncate" 
                title={shop.name}
              >
                {shop.name}
              </h3>
              
              {/* Status Badges - Responsive Layout */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
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
          
          {/* Action Menu */}
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
        
        {/* Contact Information - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
          {/* Email */}
          <div className="flex items-center min-w-0">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            <span className="truncate" title={shop.email}>
              {shop.email}
            </span>
          </div>
          
          {/* Phone */}
          <div className="flex items-center min-w-0">
            <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            <span className="truncate" title={shop.contact}>
              {shop.contact}
            </span>
          </div>
          
          {/* Created Date */}
          <div className="flex items-center">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Created: {formatDate(shop.createdAt)}</span>
          </div>
          
          {/* Deadline */}
          <div className="flex items-center">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            <span className={`text-xs sm:text-sm ${deadlineInfo.color}`}>
              Deadline: {formatDate(shop.deadline)}
            </span>
          </div>
          
          {/* Last Updated - Full Width on Mobile */}
          {shop.lastUpdated && (
            <div className="flex items-center sm:col-span-2">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Updated: {formatDate(shop.lastUpdated)}</span>
            </div>
          )}
        </div>
        
        {/* Deadline Status - Mobile Only */}
        <div className="mt-3 sm:hidden">
          <div className={`text-xs px-2 py-1 rounded ${
            deadlineInfo.status === 'expired' ? 'bg-red-50 text-red-700' :
            deadlineInfo.status === 'warning' ? 'bg-yellow-50 text-yellow-700' :
            'bg-green-50 text-green-700'
          }`}>
            {deadlineInfo.text}
          </div>
        </div>
      </div>
    </div>
  );
});

ShopCard.displayName = 'ShopCard';