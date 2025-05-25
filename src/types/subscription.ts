// types/subscription.ts
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  features: string[];
  maxProducts: number; // -1 for unlimited
  maxUsers: number; // -1 for unlimited
  supportLevel: 'basic' | 'standard' | 'premium';
  description?: string;
}

export interface ActiveSubscription {
  id: number;
  shopName: string;
  plan: string;
  status: 'active' | 'expired' | 'pending';
  nextBilling: string;
  amount: number;
}

export interface CreatePlanFormData {
  name: string;
  price: string;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  description: string;
  features: string[];
  maxProducts: string;
  maxUsers: string;
  supportLevel: 'basic' | 'standard' | 'premium';
}