/* eslint-disable no-useless-escape */
// utils/shopUtils.ts

import { Shop, ShopStats, SubscriptionPlan, SubscriptionStatus } from "@/types/shop";



/**
 * Formats a date string to a localized date format
 */
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

/**
 * Formats a relative date (e.g., "2 days ago")
 */
export const formatRelativeDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return 'Unknown';
  }
};

/**
 * Gets the appropriate CSS classes for subscription status badges
 */
export const getStatusBadgeClasses = (status: SubscriptionStatus): string => {
  const statusClasses: Record<SubscriptionStatus, string> = {
    'active': 'bg-green-100 text-green-800 border-green-200',
    'expired': 'bg-red-100 text-red-800 border-red-200',
    'trial': 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };
  
  return `px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClasses[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`;
};

/**
 * Gets the appropriate CSS classes for subscription plan badges
 */
export const getPlanBadgeClasses = (plan: SubscriptionPlan): string => {
  const planClasses: Record<SubscriptionPlan, string> = {
    'premium': 'bg-purple-100 text-purple-800 border-purple-200',
    'standard': 'bg-blue-100 text-blue-800 border-blue-200',
    'basic': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  
  return `px-2.5 py-0.5 rounded-full text-xs font-medium border ${planClasses[plan] || 'bg-gray-100 text-gray-800 border-gray-200'}`;
};

/**
 * Calculates statistics for a list of shops
 */
export const calculateShopStats = (shops: Shop[]): ShopStats => {
  return {
    total: shops.length,
    active: shops.filter(shop => shop.subscriptionStatus === 'active').length,
    trial: shops.filter(shop => shop.subscriptionStatus === 'trial').length,
    expired: shops.filter(shop => shop.subscriptionStatus === 'expired').length,
    premium: shops.filter(shop => shop.subscriptionPlan === 'premium').length,
    standard: shops.filter(shop => shop.subscriptionPlan === 'standard').length,
    basic: shops.filter(shop => shop.subscriptionPlan === 'basic').length,
  };
};

/**
 * Filters shops based on search term
 */
export const filterShops = (shops: Shop[], searchTerm: string): Shop[] => {
  if (!searchTerm.trim()) return shops;
  
  const searchLower = searchTerm.toLowerCase().trim();
  return shops.filter(shop => 
    shop.name.toLowerCase().includes(searchLower) ||
    shop.email.toLowerCase().includes(searchLower) ||
    shop.contact.toLowerCase().includes(searchLower)
  );
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format (basic validation)
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Generates a unique ID for new shops
 */
export const generateShopId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

/**
 * Sorts shops by different criteria
 */
export const sortShops = (shops: Shop[], sortBy: 'name' | 'email' | 'createdAt' | 'plan' | 'status', order: 'asc' | 'desc' = 'asc'): Shop[] => {
  return [...shops].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'email':
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      case 'plan':
        aValue = a.subscriptionPlan;
        bValue = b.subscriptionPlan;
        break;
      case 'status':
        aValue = a.subscriptionStatus;
        bValue = b.subscriptionStatus;
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Gets plan pricing information
 */
export const getPlanPrice = (plan: SubscriptionPlan): string => {
  const prices: Record<SubscriptionPlan, string> = {
    'basic': '$9.99/month',
    'standard': '$19.99/month',
    'premium': '$39.99/month'
  };
  
  return prices[plan] || 'N/A';
};

/**
 * Formats plan name for display
 */
export const formatPlanName = (plan: SubscriptionPlan): string => {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
};

/**
 * Formats status name for display
 */
export const formatStatusName = (status: SubscriptionStatus): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

/**
 * Checks if a shop's subscription is expiring soon (within 7 days)
 */
export const isSubscriptionExpiringSoon = (shop: Shop): boolean => {
  if (shop.subscriptionStatus !== 'active') return false;
  
  // In a real app, you'd have an expiration date field
  // This is just a placeholder logic
  const createdDate = new Date(shop.createdAt);
  const now = new Date();
  const daysSinceCreation = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Assume monthly subscriptions expire after 30 days
  return daysSinceCreation >= 23; // 7 days before expiration
};

/**
 * Exports shop data to CSV format
 */
export const exportShopsToCSV = (shops: Shop[]): string => {
  const headers = ['Name', 'Email', 'Contact', 'Plan', 'Status', 'Created'];
  const csvRows = [
    headers.join(','),
    ...shops.map(shop => [
      `"${shop.name}"`,
      `"${shop.email}"`,
      `"${shop.contact}"`,
      `"${formatPlanName(shop.subscriptionPlan)}"`,
      `"${formatStatusName(shop.subscriptionStatus)}"`,
      `"${formatDate(shop.createdAt)}"`
    ].join(','))
  ];
  
  return csvRows.join('\n');
};

/**
 * Downloads a CSV file
 */
export const downloadCSV = (csvContent: string, filename: string = 'shops.csv'): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};