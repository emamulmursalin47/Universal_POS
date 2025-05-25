// types/shop.ts
export type SubscriptionPlan = 'basic' | 'standard' | 'premium';
export type SubscriptionStatus = 'active' | 'expired' | 'trial';

export interface Shop {
  id: number;
  name: string;
  email: string;
  contact: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  isActive: boolean;
  createdAt: string;
  deadline: string;
  lastUpdated?: string;
}

export interface ShopFormData {
  name: string;
  email: string;
  contact: string;
  subscriptionPlan: string;
  deadline: string;
}

export interface UpdateSubscriptionData {
  subscriptionPlan: string;
  deadline: string;
}

export interface ShopCardProps {
  shop: Shop;
  onEdit: (shop: Shop) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number, isActive: boolean) => void;
  onUpdateSubscription: (shop: Shop) => void;
}