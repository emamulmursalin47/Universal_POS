// pages/ShopsPage.tsx (Fully Responsive)
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, TrendingUp, TrendingDown, Clock, Users } from 'lucide-react';

// Components
import { ShopCard } from '@/components/shop/ShopCard';
import { ShopTable } from '@/components/shop/ShopTable';
import { ShopSearch } from '@/components/shop/ShopSearch';


// Hooks and Data
import { useShopActions } from '@/hooks/useShopActions';

import { Shop } from '@/types/shop';
import { MOCK_SHOPS } from '@/data/MockShops';
import { AddShopModal } from '@/components/modals/AddShopModal';
import { EditShopModal } from '@/components/modals/EditShopModal';
import { UpdateSubscriptionModal } from '@/components/modals/UpdateSubscriptionModal';

export default function ShopsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isUpdateSubscriptionModalOpen, setIsUpdateSubscriptionModalOpen] = useState<boolean>(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  
  const { shops, addShop, updateShop, deleteShop, toggleActive } = useShopActions(MOCK_SHOPS);
  
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const stats = {
    total: shops.length,
    active: shops.filter(shop => shop.isActive && shop.subscriptionStatus === 'active').length,
    expired: shops.filter(shop => shop.subscriptionStatus === 'expired').length,
    inactive: shops.filter(shop => !shop.isActive).length
  };

  const handleEditShop = (shop: Shop) => {
    setSelectedShop(shop);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubscription = (shop: Shop) => {
    setSelectedShop(shop);
    setIsUpdateSubscriptionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Header Section - Responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Shop Management
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your shops, subscriptions, and customer information
            </p>
          </div>
          
          {/* Add Button - Full width on mobile */}
          <Button 
            onClick={() => setIsAddModalOpen(true)} 
            size="lg"
            className="w-full sm:w-auto h-10 sm:h-11 lg:h-12"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="sm:hidden">Add Shop</span>
            <span className="hidden sm:inline">Add New Shop</span>
          </Button>
        </div>

        {/* Stats Cards - Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {stats.total}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Total Shops
                  </p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
                    {stats.active}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Active
                  </p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">
                    {stats.expired}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Expired
                  </p>
                </div>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-600">
                    {stats.inactive}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Inactive
                  </p>
                </div>
                <TrendingDown className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">All Shops</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            
            {/* Search Section */}
            <div className="space-y-3">
              <ShopSearch 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              
              {/* Results Count */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Showing {filteredShops.length} of {shops.length} shops
                </p>
                
                {/* Quick Filter Buttons - Mobile */}
                <div className="flex gap-2 sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchTerm('')}
                    className={`text-xs ${!searchTerm ? 'bg-primary/10' : ''}`}
                  >
                    All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchTerm('active')}
                    className="text-xs"
                  >
                    Active
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchTerm('expired')}
                    className="text-xs"
                  >
                    Expired
                  </Button>
                </div>
              </div>
            </div>

            {/* Table Views - Responsive breakpoints */}
            <ShopTable
              shops={filteredShops}
              onEdit={handleEditShop}
              onDelete={deleteShop}
              onToggleActive={toggleActive}
              onUpdateSubscription={handleUpdateSubscription}
            />

            {/* Mobile Card View (< 640px) */}
            <div className="sm:hidden space-y-3">
              {filteredShops.length > 0 ? (
                filteredShops.map((shop) => (
                  <ShopCard 
                    key={shop.id} 
                    shop={shop}
                    onEdit={handleEditShop}
                    onDelete={deleteShop}
                    onToggleActive={toggleActive}
                    onUpdateSubscription={handleUpdateSubscription}
                  />
                ))
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="max-w-sm mx-auto">
                    <div className="rounded-full bg-gray-100 h-12 w-12 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No shops found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {searchTerm 
                        ? 'Try adjusting your search terms or clear the search to see all shops.'
                        : 'Get started by adding your first shop.'
                      }
                    </p>
                    {!searchTerm && (
                      <Button onClick={() => setIsAddModalOpen(true)} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Shop
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Empty State for Larger Screens */}
            {filteredShops.length === 0 && (
              <div className="hidden sm:block text-center py-12 lg:py-16">
                <div className="max-w-md mx-auto">
                  <div className="rounded-full bg-gray-100 h-16 w-16 mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">No shops found</h3>
                  <p className="text-base text-muted-foreground mb-6">
                    {searchTerm 
                      ? 'Try adjusting your search terms or clear the search to see all shops.'
                      : 'Get started by adding your first shop to begin managing your business.'
                    }
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setIsAddModalOpen(true)} size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Your First Shop
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddShopModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddShop={addShop}
      />
      
      <EditShopModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        shop={selectedShop}
        onUpdateShop={updateShop}
      />
      
      <UpdateSubscriptionModal
        isOpen={isUpdateSubscriptionModalOpen}
        onClose={() => setIsUpdateSubscriptionModalOpen(false)}
        shop={selectedShop}
        onUpdateSubscription={updateShop}
      />
    </div>
  );
}