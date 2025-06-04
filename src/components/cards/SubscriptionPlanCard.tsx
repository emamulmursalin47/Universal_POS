// components/subscription/PlanCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Users, Package, Headphones, Edit, Eye, MoreVertical, Power, Trash2 } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
  onView: (plan: SubscriptionPlan) => void;
  onToggleStatus: (planId: string) => void;
  onDelete: (planId: string) => void;
}

const getPlanIcon = (supportLevel: SubscriptionPlan['supportLevel']) => {
  const iconProps = {
    className: "h-5 w-5",
    style: {
      display: 'inline-block',
      verticalAlign: 'middle',
      fill: 'currentColor',
      stroke: 'currentColor'
    }
  };

  const iconMap = {
    premium: <Headphones {...iconProps} />,
    standard: <Users {...iconProps} />,
    basic: <Package {...iconProps} />,
  };
  return iconMap[supportLevel as keyof typeof iconMap] || <Package {...iconProps} />;
};

const getBillingCycleLabel = (cycle: SubscriptionPlan['billingCycle']) => {
  const labelMap = {
    monthly: 'mo',
    yearly: 'yr',
    quarterly: 'qtr',
  };
  return labelMap[cycle];
};

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onEdit,
  onView,
  onToggleStatus,
  onDelete
}) => {
  const isPremium = plan.id === 'premium';

  return (
    <Card className={`relative hover:shadow-lg transition-shadow ${!plan.isEnabled ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {getPlanIcon("premium")}
            </div>
            <span className="text-lg font-semibold">{plan.planName}</span>
            {/* {!plan.isEnabled && (
              <Badge variant="secondary" className="text-xs">
                Disabled
              </Badge>
            )} */}
          </div>
          <Badge variant={isPremium ? 'default' : 'secondary'} className="shrink-0">
            ৳ {plan.price.toFixed(2)}/{getBillingCycleLabel(plan.billingCycle)}
          </Badge>
        </CardTitle>
        {plan.description && (
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {plan?.maxProducts > 0 &&
            <li className="flex items-center text-sm">
              <span className="mr-3 mt-2 h-1.5 w-1.5 bg-current rounded-full shrink-0" />
              upto {plan?.maxProducts} products
            </li>}
          {
            plan?.maxUsers > 0 &&
            <li className="flex items-center text-sm">
              <span className="mr-3 mt-2 h-1.5 w-1.5 bg-current rounded-full shrink-0" />
              upto {plan?.maxUsers} managers
            </li>
          }
          {plan.features?.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="mr-3 mt-2 h-1.5 w-1.5 bg-current rounded-full shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
          {
            plan?.supportLevel &&
            <li className="flex items-center text-sm">
              <span className="mr-3 mt-2 h-1.5 w-1.5 bg-current rounded-full shrink-0" />
              Priority Support
            </li>
          }
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

          <Button variant="outline" size="default" onClick={() => onView(plan)}>
            <Eye className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default">
                <MoreVertical className="h-4 w-4 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onToggleStatus(plan.id)}>
                <Power className="h-4 w-4 mr-2" />
                {plan.isEnabled ? 'Disable' : 'Enable'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(plan.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};