// components/subscription/SubscriptionsTable.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import { ActiveSubscription } from '../../types/subscription';

interface SubscriptionsTableProps {
  subscriptions: ActiveSubscription[];
}

const getStatusBadge = (status: ActiveSubscription['status']) => {
  const variantMap: Record<ActiveSubscription['status'], 'default' | 'destructive' | 'secondary'> = {
    active: 'default',
    expired: 'destructive',
    pending: 'secondary',
  };
  
  return <Badge variant={variantMap[status]}>{status}</Badge>;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({ subscriptions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Active Subscriptions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Next Billing</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No active subscriptions found
                  </TableCell>
                </TableRow>
              ) : (
                subscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{subscription.shopName}</TableCell>
                    <TableCell>{subscription.plan}</TableCell>
                    <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {formatDate(subscription.nextBilling)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(subscription.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};