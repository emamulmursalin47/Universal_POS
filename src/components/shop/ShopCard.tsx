// components/shop/ShopCard.tsx
import React, { memo } from 'react';
import { Building2, Mail, Phone, Calendar, User, MapPin } from 'lucide-react';
import { ShopCardProps } from '@/types/shop';
import { ShopActionMenu } from './ShopActionMenu';
import { 
  // getStatusColor, 
  // getPlanBadgeColor, 
  // getActiveStatusColor, 
  formatDate, 
  // formatPlanName, 
  // formatStatusName,
  getDeadlineStatus
} from '@/utils/shopUtils';

export const ShopCard: React.FC<ShopCardProps> = memo(({ 
  shop, 
  onEdit, 
  onDelete, 
  onToggleActive, 
  onUpdateSubscription 
}) => {
  const deadlineInfo = getDeadlineStatus(shop.subscriptionDeadline);

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
      !shop.isActive ? 'opacity-70' : ''
    }`}>
      {/* Header Section */}
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center flex-1 min-w-0">
            {/* Shop Icon */}
            <div className={`h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 ${
              shop.isActive ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Building2 className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${shop.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            
            {/* Shop Info */}
            <div className="min-w-0 flex-1">
              <h3 
                className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 truncate mb-2" 
                title={shop.name}
              >
                {shop.name}
              </h3>
              
              {/* Status Badges */}
              {/* <div className="flex flex-wrap gap-2 mb-2">
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getActiveStatusColor(shop.status)}`}
                  title={`Shop Status: ${shop.status}`}
                >
                  {shop.isActive ? 'Active' : 'Inactive'}
                </span>
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(shop.status)}`}
                  title={`Subscription: ${formatStatusName(shop.subscriptionStatus)}`}
                >
                  {formatStatusName(shop.subscriptionStatus)}
                </span>
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getPlanBadgeColor(shop.subscriptionPlan)}`}
                  title={`Plan: ${formatPlanName(shop.subscriptionPlan)}`}
                >
                  {formatPlanName(shop.subscriptionPlan)}
                </span>
              </div> */}
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
        
        {/* Contact Information Grid */}
        <div className="space-y-3">
          {/* Shop Contact Details */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Shop Details
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {/* Shop Email */}
              <div className="flex items-center min-w-0">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-gray-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-900 truncate" title={shop.email}>
                    {shop.email}
                  </p>
                </div>
              </div>
              
              {/* Shop Phone */}
              <div className="flex items-center min-w-0">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-gray-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-sm font-medium text-gray-900 truncate" title={shop.contact}>
                    {shop.contact}
                  </p>
                </div>
              </div>
              
              {/* Shop Address */}
              <div className="flex items-start min-w-0">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0 text-gray-500 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="text-sm font-medium text-gray-900 line-clamp-2" title={shop.address}>
                    {shop.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Owner Contact Details */}
          <div className="bg-green-50 rounded-lg p-3 sm:p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Owner Details
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {/* Owner Name */}
              <div className="flex items-center min-w-0">
                <User className="h-4 w-4 mr-3 flex-shrink-0 text-gray-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900 truncate" title={shop.ownerName}>
                    {shop.ownerName}
                  </p>
                </div>
              </div>
              
              {/* Owner Phone */}
              <div className="flex items-center min-w-0">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-gray-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-sm font-medium text-gray-900 truncate" title={shop.ownerPhone}>
                    {shop.ownerPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dates Information */}
          <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Important Dates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Created Date */}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-3 flex-shrink-0 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(shop.createdAt)}</p>
                </div>
              </div>
              
              {/* Deadline */}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-3 flex-shrink-0 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className={`text-sm font-medium ${deadlineInfo.color}`}>
                    {formatDate(shop.subscriptionDeadline)}
                  </p>
                </div>
              </div>
              
              {/* Last Updated */}
              {shop.lastUpdated && (
                <div className="flex items-center sm:col-span-2">
                  <Calendar className="h-4 w-4 mr-3 flex-shrink-0 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Last Updated</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(shop.lastUpdated)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Deadline Status Alert */}
        {deadlineInfo.status !== 'safe' && (
          <div className={`mt-4 text-sm px-4 py-3 rounded-lg font-medium ${
            deadlineInfo.status === 'expired' 
              ? 'bg-red-100 text-red-800 border border-red-200' 
              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
          }`}>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{deadlineInfo.text}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ShopCard.displayName = 'ShopCard';