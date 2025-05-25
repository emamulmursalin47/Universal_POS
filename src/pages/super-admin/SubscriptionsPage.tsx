import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard } from 'lucide-react';

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 29.99,
    billingCycle: 'monthly',
    features: ['Up to 1,000 products', '2 staff accounts', 'Basic support', 'Standard reports'],
    maxProducts: 1000,
    maxUsers: 2,
    supportLevel: 'basic',
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
  },
];

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Subscription Plans</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.name}
                <Badge variant={plan.id === 'premium' ? 'default' : 'secondary'}>
                  ${plan.price}/mo
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.id === 'premium' ? 'default' : 'outline'}>
                <CreditCard className="h-4 w-4 mr-2" />
                Edit Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Add mock subscription data here */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}