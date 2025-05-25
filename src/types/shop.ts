// types/shop.ts

export type SubscriptionStatus = 'active' | 'expired' | 'trial';
export type SubscriptionPlan = 'basic' | 'standard' | 'premium';

export interface Shop {
  id: number;
  name: string;
  email: string;
  contact: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  createdAt: string;
}

export interface ShopFormData {
  name: string;
  email: string;
  contact: string;
  subscriptionPlan: SubscriptionPlan;
}

export interface ShopStats {
  total: number;
  active: number;
  trial: number;
  expired: number;
  premium: number;
  standard: number;
  basic: number;
}

export interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddShop: (shop: Shop) => void;
}

export interface ShopCardProps {
  shop: Shop;
  onEdit: (shop: Shop) => void;
  onDelete: (shopId: number) => void;
}