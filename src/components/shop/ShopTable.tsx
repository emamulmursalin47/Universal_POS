// components/shop/ShopTable.tsx (Responsive)
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
    <>
      {/* Full Desktop Table (1200px+) */}
      <div className="hidden xl:block rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Shop Name</TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Subscription</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Active</TableHead>
              <TableHead className="font-semibold">Deadline</TableHead>
              <TableHead className="font-semibold">Created</TableHead>
              <TableHead className="font-semibold">Updated</TableHead>
              <TableHead className="font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop) => {
              const deadlineInfo = getDeadlineStatus(shop.deadline);
              return (
                <TableRow 
                  key={shop.id} 
                  className={`hover:bg-gray-50 transition-colors ${!shop.isActive ? 'opacity-60' : ''}`}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        shop.isActive ? 'bg-primary/10' : 'bg-gray-100'
                      }`}>
                        <Building2 className={`h-4 w-4 ${shop.isActive ? 'text-primary' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{shop.name}</div>
                        <div className="text-xs text-muted-foreground">{shop.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{shop.contact}</TableCell>
                  <TableCell className="capitalize text-sm">{shop.subscriptionPlan}</TableCell>
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
                  <TableCell className="text-sm">{new Date(shop.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-sm">
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

      {/* Compact Desktop/Tablet Table (768px - 1199px) */}
      <div className="hidden md:block xl:hidden rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Shop</TableHead>
              <TableHead className="font-semibold">Plan & Status</TableHead>
              <TableHead className="font-semibold">Deadline</TableHead>
              <TableHead className="font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop) => {
              const deadlineInfo = getDeadlineStatus(shop.deadline);
              return (
                <TableRow 
                  key={shop.id} 
                  className={`hover:bg-gray-50 transition-colors ${!shop.isActive ? 'opacity-60' : ''}`}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        shop.isActive ? 'bg-primary/10' : 'bg-gray-100'
                      }`}>
                        <Building2 className={`h-4 w-4 ${shop.isActive ? 'text-primary' : 'text-gray-400'}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{shop.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{shop.email}</div>
                        <div className="text-xs text-muted-foreground">{shop.contact}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          shop.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {shop.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          shop.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                          shop.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {shop.subscriptionStatus}
                        </span>
                      </div>
                      <div className="text-xs capitalize text-muted-foreground">
                        {shop.subscriptionPlan} Plan
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{new Date(shop.deadline).toLocaleDateString()}</div>
                      <div className={`text-xs ${deadlineInfo.color}`}>
                        {deadlineInfo.text}
                      </div>
                    </div>
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

      {/* Small Tablet Table (640px - 767px) */}
      <div className="hidden sm:block md:hidden rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Shop Details</TableHead>
              <TableHead className="font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop) => {
              const deadlineInfo = getDeadlineStatus(shop.deadline);
              return (
                <TableRow 
                  key={shop.id} 
                  className={`hover:bg-gray-50 transition-colors ${!shop.isActive ? 'opacity-60' : ''}`}
                >
                  <TableCell className="py-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                          shop.isActive ? 'bg-primary/10' : 'bg-gray-100'
                        }`}>
                          <Building2 className={`h-4 w-4 ${shop.isActive ? 'text-primary' : 'text-gray-400'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm">{shop.name}</div>
                          <div className="text-xs text-muted-foreground">{shop.email}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 ml-11">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          shop.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {shop.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          shop.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                          shop.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {shop.subscriptionStatus}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {shop.subscriptionPlan}
                        </span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground ml-11">
                        <div>Deadline: {new Date(shop.deadline).toLocaleDateString()}</div>
                        <div className={deadlineInfo.color}>{deadlineInfo.text}</div>
                      </div>
                    </div>
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
    </>
  );
};