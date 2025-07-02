// src/types/subscription.ts
export type TSubscriptionStatus = "active" | "expired" | "cancelled";
export type TBillingCycle = "monthly" | "yearly" | "quarterly";

export interface ISubscription {
  _id: string;
  planName: string;
  price: number;
  description: string;
  billingCycle: TBillingCycle;
  maxProducts: number;
  maxUsers: number;
  supportLevel: string;
  features: string[];
  status: TSubscriptionStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionFormValues {
  planName: string;
  price: number;
  description: string;
  billingCycle: TBillingCycle;
  maxProducts: number;
  maxUsers: number;
  supportLevel: string;
  features: string[];
  status: TSubscriptionStatus;
}

export interface ISubscriptionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ISubscription[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
