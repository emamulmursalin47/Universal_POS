// hooks/useSubscriptionPlans.ts
import { useState, useCallback } from 'react';
import { SubscriptionPlan } from '../types/subscription';

const initialPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 29.99,
    billingCycle: 'monthly',
    features: ['Up to 1,000 products', '2 staff accounts', 'Basic support', 'Standard reports'],
    maxProducts: 1000,
    maxUsers: 2,
    supportLevel: 'basic',
    description: 'Perfect for small businesses just getting started',
    isEnabled: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: 49.99,
    billingCycle: 'monthly',
    features: ['Up to 5,000 products', '5 staff accounts', 'Priority support', 'Advanced reports'],
    maxProducts: 5000,
    maxUsers: 5,
    supportLevel: 'standard',
    description: 'Ideal for growing businesses with expanding needs',
    isEnabled: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 99.99,
    billingCycle: 'monthly',
    features: ['Unlimited products', 'Unlimited staff accounts', '24/7 support', 'Custom reports'],
    maxProducts: -1,
    maxUsers: -1,
    supportLevel: 'premium',
    description: 'Complete solution for large enterprises',
    isEnabled: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
];

export const useSubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(initialPlans);

  const addPlan = useCallback((newPlan: SubscriptionPlan) => {
    setPlans(prev => [...prev, newPlan]);
  }, []);

  const updatePlan = useCallback((updatedPlan: SubscriptionPlan) => {
    setPlans(prev => prev.map(plan => 
      plan.id === updatedPlan.id ? updatedPlan : plan
    ));
  }, []);

  const deletePlan = useCallback((planId: string) => {
    setPlans(prev => prev.filter(plan => plan.id !== planId));
  }, []);

  const togglePlanStatus = useCallback((planId: string) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId 
        ? { ...plan, isEnabled: !plan.isEnabled, updatedAt: new Date().toISOString() }
        : plan
    ));
  }, []);

  return {
    plans,
    addPlan,
    updatePlan,
    deletePlan,
    togglePlanStatus,
  };
};