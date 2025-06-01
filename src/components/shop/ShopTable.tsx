// components/shop/ShopTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, User, MapPin } from 'lucide-react';
import { Shop } from '@/types/shop';
import { getDeadlineStatus } from '@/utils/shopUtils';
import { ShopTableActions } from './ShopTableActiions';
import { Link } from 'react-router-dom';


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
  console.log('shops', shops);
  return (
    <>
      {/* Full Desktop Table (1200px+) */}
      <div className="hidden xl:block rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-900 py-4">Shop Information</TableHead>
              <TableHead className="font-semibold text-gray-900">Address</TableHead>
              <TableHead className="font-semibold text-gray-900">Owner Info</TableHead>
              <TableHead className="font-semibold text-gray-900">Subscription</TableHead>
              <TableHead className="font-semibold text-gray-900">Status</TableHead>
              <TableHead className="font-semibold text-gray-900">Active</TableHead>
              <TableHead className="font-semibold text-gray-900">Deadline</TableHead>
              <TableHead className="font-semibold text-gray-900">Created</TableHead>
              <TableHead className="font-semibold text-gray-900">Updated</TableHead>
              <TableHead className="font-semibold text-gray-900 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop: Shop, index) => {
              // const deadlineInfo = getDeadlineStatus(shop.deadline);
              return (
                <TableRow
                  key={index}
                  className={`hover:bg-gray-50 transition-colors border-b border-gray-100 ${!shop.isActive ? 'opacity-60' : ''
                    } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${shop.isActive ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                        <Building2 className={`h-5 w-5 ${shop.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-gray-900 truncate">{shop?.shopName}</div>
                        <div className="text-xs text-gray-500 truncate">
                          <Link to='mailto:{shop.email}' className='hover:text-blue-600 text-gray-500' title={shop.email}>
                            {shop.email}
                          </Link>
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          <Link to='tel:+88{shop.contactNumber}' className='hover:text-blue-600 text-gray-500' title={shop.contactNumber}>
                           {shop.contactNumber && `+88${shop.contactNumber}`}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm max-w-[180px]">
                    <div className="flex items-start space-x-2">
                      {/* <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" /> */}
                      <div className="truncate text-gray-900" title={shop.address}>{shop.address}</div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      {/* <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">
                          {shop.shopOwnerName?.charAt(0).toUpperCase()}
                        </span>
                      </div> */}
                      <div className="min-w-0">
                        <div className="font-medium text-sm text-gray-900 truncate">{shop.shopOwnerName}</div>
                        {/* <div className="text-xs text-gray-500 truncate">{shop.ownerPhone}</div> */}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="capitalize text-sm font-medium text-gray-900">
                    {shop.subscriptionPlan}
                  </TableCell>

                  <TableCell>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${shop.status === 'active' ? 'bg-green-100 text-green-800' :
                      shop.status === 'expired' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                      {shop.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${shop.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {shop.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">

                      <div className="text-sm font-medium text-gray-900">
                        {new Date(shop.subscriptionDeadline).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      {/* <div className={`text-xs font-medium ${deadlineInfo.color}`}>
                        {deadlineInfo.text}
                      </div> */}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-gray-900">
                    {new Date(shop.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                  </TableCell>

                  <TableCell className="text-sm text-gray-900">
                    {shop.updatedAt ? new Date(shop.updatedAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }) : '-'}
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
      <div className="hidden md:block xl:hidden rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-900 py-4">Shop & Address</TableHead>
              <TableHead className="font-semibold text-gray-900">Owner & Plan</TableHead>
              <TableHead className="font-semibold text-gray-900">Deadline Status</TableHead>
              <TableHead className="font-semibold text-gray-900 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop: Shop, index: number) => {
              const deadlineInfo = getDeadlineStatus(shop.deadline);
              return (
                <TableRow
                  key={index}
                  className={`hover:bg-gray-50 transition-colors border-b border-gray-100 ${!shop.isActive ? 'opacity-60' : ''
                    } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                >
                  <TableCell className="py-4">
                    <div className="space-y-3">
                      {/* Shop Info */}
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${shop.isActive ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                          <Building2 className={`h-5 w-5 ${shop.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-gray-900 truncate">{shop.name}</div>
                          <div className="text-xs text-gray-500 truncate">{shop.email}</div>
                          <div className="text-xs text-gray-500">{shop.contact}</div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start space-x-2 ml-13">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-gray-600 line-clamp-2" title={shop.address}>
                          {shop.address}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-3">
                      {/* Owner Info */}
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">{shop.ownerName}</div>
                          <div className="text-xs text-gray-500 truncate">{shop.ownerPhone}</div>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${shop.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                          {shop.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${shop.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                          shop.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                          {shop.subscriptionStatus}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 capitalize font-medium">
                        {shop.subscriptionPlan} Plan
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(shop.deadline).toLocaleDateString()}
                      </div>
                      <div className={`text-xs font-medium ${deadlineInfo.color}`}>
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
      <div className="hidden sm:block md:hidden rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-900 py-4">Complete Shop Details</TableHead>
              <TableHead className="font-semibold text-gray-900 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop, index) => {
              const deadlineInfo = getDeadlineStatus(shop.deadline);
              return (
                <TableRow
                  key={shop.id}
                  className={`hover:bg-gray-50 transition-colors border-b border-gray-100 ${!shop.isActive ? 'opacity-60' : ''
                    } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                >
                  <TableCell className="py-4">
                    <div className="space-y-4">
                      {/* Shop Info */}
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${shop.isActive ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                          <Building2 className={`h-5 w-5 ${shop.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-gray-900">{shop.name}</div>
                          <div className="text-xs text-gray-500 truncate">{shop.email}</div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start space-x-2 ml-13">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-gray-600 line-clamp-2" title={shop.address}>
                          {shop.address}
                        </div>
                      </div>

                      {/* Owner Info */}
                      <div className="flex items-center space-x-3 ml-13">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                          <User className="h-3 w-3 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-medium text-gray-700">Owner: {shop.ownerName}</div>
                          <div className="text-xs text-gray-500">{shop.ownerPhone}</div>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-wrap gap-2 ml-13">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${shop.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                          {shop.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${shop.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                          shop.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                          {shop.subscriptionStatus}
                        </span>
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 capitalize">
                          {shop.subscriptionPlan}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 ml-13">
                        <div className="mb-1">
                          <span className="font-medium">Deadline:</span> {new Date(shop.deadline).toLocaleDateString()}
                        </div>
                        <div className={`font-medium ${deadlineInfo.color}`}>
                          {deadlineInfo.text}
                        </div>
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