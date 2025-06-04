// utils/shopUtils.ts
import { Shop } from '@/lib/types';
import { SubscriptionStatus, SubscriptionPlan } from '@/types/shop';

// export const getStatusColor = (status: SubscriptionStatus): string => {
//   const statusColors: Record<SubscriptionStatus, string> = {
//     'active': 'bg-green-100 text-green-800',
//     'expired': 'bg-red-100 text-red-800',
//     'trial': 'bg-yellow-100 text-yellow-800'
//   };
  
//   return statusColors[status] || 'bg-gray-100 text-gray-800';
// };

export const getPlanBadgeColor = (plan: SubscriptionPlan): string => {
  const planColors: Record<SubscriptionPlan, string> = {
    'premium': 'bg-purple-100 text-purple-800',
    'standard': 'bg-blue-100 text-blue-800',
    'basic': 'bg-gray-100 text-gray-800'
  };
  
  return planColors[plan] || 'bg-gray-100 text-gray-800';
};

export const getActiveStatusColor = (status: Shop["status"]): string => {
  return status
    ? 'bg-emerald-100 text-emerald-800' 
    : 'bg-gray-100 text-gray-800';
};

export const formatDate = (dateString: string): string => {
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

export const formatPlanName = (plan: SubscriptionPlan): string => {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
};

export const formatStatusName = (status: SubscriptionStatus): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const getDeadlineStatus = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilDeadline < 0) return { status: 'expired', color: 'text-red-600', text: 'Expired' };
  if (daysUntilDeadline <= 7) return { status: 'warning', color: 'text-yellow-600', text: `${daysUntilDeadline} days left` };
  return { status: 'active', color: 'text-green-600', text: `${daysUntilDeadline} days left` };
};