// components/shop/ShopTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2 } from 'lucide-react';
import { Shop } from '@/types/shop';

import { getDeadlineStatus } from '@/utils/shopUtils';
import { ShopTableActions } from './ShopTableActiions';

interface ShopTableProps {
  shops: Shop[];
  onEdit: (shop: Shop) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number, isActive: boolean) => void;
  onUpdateSubscription: (shop: Shop) => void;
}

export const ShopTable: React.FC<ShopTableProps> = ({
  shops,
  onEdit,
  onDelete,
  onToggleActive,
  onUpdateSubscription
}) => {
  return (
    <div className="hidden md:block rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shop Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops.map((shop) => {
            const deadlineInfo = getDeadlineStatus(shop.deadline);
            return (
              <TableRow key={shop.id} className={!shop.isActive ? 'opacity-60' : ''}>
                <TableCell>
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                      shop.isActive ? 'bg-primary/10' : 'bg-gray-100'
                    }`}>
                      <Building2 className={`h-4 w-4 ${shop.isActive ? 'text-primary' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <div className="font-medium">{shop.name}</div>
                      <div className="text-sm text-muted-foreground">{shop.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{shop.contact}</TableCell>
                <TableCell className="capitalize">{shop.subscriptionPlan}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    shop.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                    shop.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {shop.subscriptionStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    shop.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {shop.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-sm">{new Date(shop.deadline).toLocaleDateString()}</div>
                    <div className={`text-xs ${deadlineInfo.color}`}>
                      {deadlineInfo.text}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{new Date(shop.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {shop.lastUpdated ? new Date(shop.lastUpdated).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell>
                  <ShopTableActions
                    shop={shop}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleActive={onToggleActive}
                    onUpdateSubscription={onUpdateSubscription}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};