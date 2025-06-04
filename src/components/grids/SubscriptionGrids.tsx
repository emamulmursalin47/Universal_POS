// components/subscription/SubscriptionPlansGrid.tsx
import React from 'react';

import { SubscriptionPlan } from '../../types/subscription';
import { PlanCard } from '../cards/SubscriptionPlanCard';

interface SubscriptionPlansGridProps {
  plans: SubscriptionPlan[];
  onEditPlan: (plan: SubscriptionPlan) => void; // onEditplan: SubscriptionPlan;
  // onViewPlan: (plan: SubscriptionPlan) => void;
  onToggleStatus: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
}

export const SubscriptionPlansGrid: React.FC<SubscriptionPlansGridProps> = ({
  plans,
  onEditPlan,
  // onViewPlan,
  onToggleStatus,
  onDeletePlan,
}) => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan,index) => (
        <PlanCard
          key={index}
          plan={plan}
          onEdit={onEditPlan}
          // onView={onViewPlan}
          onToggleStatus={onToggleStatus}
          onDelete={onDeletePlan}
        />
      ))}
    </div>
  );
};