// types/shop.ts
export type SubscriptionPlan = 'basic' | 'standard' | 'premium';
export type SubscriptionStatus = 'active' | 'inactive' | 'expired' | 'trial' | 'pending';;

export interface Shop {
  id: number;
  name: string;
  contact?: string;
  ownerName?: string;
  ownerPhone?: string;
  // subscriptionPlan: SubscriptionPlan;
  // subscriptionStatus?: SubscriptionStatus;
  isActive?: boolean;
  deadline?: string;
  lastUpdated?: string;

  _id?: string;
  vendorId?: string;
  user?: string; // Assuming this references a user ID (ObjectId as string)
  shopName?: string;
  shopOwnerName?: string;
  email: string;
  contactNumber: string;
  address?: string;
  subscriptionPlan: string; // Assuming this references a subscription plan ID
  subscriptionDeadline: string; // ISO date string, or use Date if you parse it
  status: 'active' | 'inactive' | 'expired' | 'trial' | 'pending'; // Add more status values as needed
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ShopFormData {
  name: string;
  email: string;
  contact: string;
  address: string;
  ownerName: string;
  ownerPhone: string;
  subscriptionPlan: string;
  deadline: string;
}

export interface UpdateSubscriptionData {
  subscriptionPlan: string;
  deadline: string;
}

export interface ShopCardProps {
  shop: Shop;
  // onEdit: (shop: Shop) => void;
  // onDelete: (id: number) => void;
  // onToggleActive: (id: number, isActive: boolean) => void;
  // onUpdateSubscription: (shop: Shop) => void;
  onEdit: (shop: Shop) => void;
  onDelete: (vendorId: Shop["vendorId"]) => void;
  onToggleActive: (id: number, status: Shop["status"]) => void;
  onUpdateSubscription: (shop: Shop) => void;
}