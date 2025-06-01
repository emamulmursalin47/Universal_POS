
export interface SubscriptionPlan {
  id: string;
  name: string;
  // supportLevel: 'basic' | 'standard' | 'premium';
  isEnabled: boolean;
  _id: string;
  planName: string;
  price: number;
  description?: string;
  billingCycle: 'monthly' | 'yearly'|'quarterly'; // Add more options if applicable
  maxProducts: number;
  maxUsers: number;
  supportLevel: string;
  features?: string[];
  status: 'active' | 'inactive'; // Add more statuses if needed
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

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

export interface EditPlanFormData extends CreatePlanFormData {
  id: string;
  isEnabled: boolean;
}
