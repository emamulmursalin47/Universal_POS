// components/ShopCard.tsx

import React, { memo } from 'react';
import { Building2, Mail, Phone, Calendar, Edit, Trash2 } from 'lucide-react';
import { ShopCardProps, SubscriptionPlan, SubscriptionStatus } from '@/types/shop';


const ShopCard: React.FC<ShopCardProps> = memo(({ shop, onEdit, onDelete }) => {
  const getStatusColor = (status: SubscriptionStatus): string => {
    const statusColors: Record<SubscriptionStatus, string> = {
      'active': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'trial': 'bg-yellow-100 text-yellow-800'
    };
    
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPlanBadgeColor = (plan: SubscriptionPlan): string => {
    const planColors: Record<SubscriptionPlan, string> = {
      'premium': 'bg-purple-100 text-purple-800',
      'standard': 'bg-blue-100 text-blue-800',
      'basic': 'bg-gray-100 text-gray-800'
    };
    
    return planColors[plan] || 'bg-gray-100 text-gray-800';
  };

  const handleEdit = (): void => {
    onEdit(shop);
  };

  const handleDelete = (): void => {
    onDelete(shop.id);
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const formatPlanName = (plan: SubscriptionPlan): string => {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };

  const formatStatusName = (status: SubscriptionStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center flex-1 min-w-0">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
            <Building2 className="h-5 w-5 text-blue-600" />
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
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shop.subscriptionStatus)}`}
                title={`Status: ${formatStatusName(shop.subscriptionStatus)}`}
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
        
        <div className="flex space-x-1 ml-2 flex-shrink-0">
          <button 
            onClick={handleEdit}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title={`Edit ${shop.name}`}
            aria-label={`Edit ${shop.name}`}
          >
            <Edit className="h-4 w-4 text-gray-600" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 hover:bg-red-50 rounded-md transition-colors text-red-600"
            title={`Delete ${shop.name}`}
            aria-label={`Delete ${shop.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
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
      </div>
    </div>
  );
});

ShopCard.displayName = 'ShopCard';

export default ShopCard;