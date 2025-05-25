// components/subscription/PlanCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Package, Headphones, Edit, Eye } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
  onView: (plan: SubscriptionPlan) => void;
}

const getPlanIcon = (supportLevel: SubscriptionPlan['supportLevel']) => {
  const iconMap = {
    premium: <Headphones className="h-4 w-4" />,
    standard: <Users className="h-4 w-4" />,
    basic: <Package className="h-4 w-4" />,
  };
  return iconMap[supportLevel];
};

const getBillingCycleLabel = (cycle: SubscriptionPlan['billingCycle']) => {
  const labelMap = {
    monthly: 'mo',
    yearly: 'yr',
    quarterly: 'qtr',
  };
  return labelMap[cycle];
};

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit, onView }) => {
  const isPremium = plan.id === 'premium';

  return (
    <Card className="relative hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {getPlanIcon(plan.supportLevel)}
            <span className="text-lg font-semibold">{plan.name}</span>
          </div>
          <Badge variant={isPremium ? 'default' : 'secondary'} className="shrink-0">
            ${plan.price}/{getBillingCycleLabel(plan.billingCycle)}
          </Badge>
        </CardTitle>
        {plan.description && (
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="mr-2 mt-1 h-1 w-1 bg-current rounded-full shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground border-t pt-3">
          <div>Products: {plan.maxProducts === -1 ? 'Unlimited' : plan.maxProducts.toLocaleString()}</div>
          <div>Users: {plan.maxUsers === -1 ? 'Unlimited' : plan.maxUsers.toLocaleString()}</div>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            variant={isPremium ? 'default' : 'outline'}
            onClick={() => onEdit(plan)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="icon" onClick={() => onView(plan)}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};