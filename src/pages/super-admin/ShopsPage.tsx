// pages/ShopsPage.tsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, TrendingUp, TrendingDown, Clock, Users, Filter } from 'lucide-react';

// Components
import { ShopCard } from '@/components/shop/ShopCard';
import { ShopTable } from '@/components/shop/ShopTable';
import { ShopSearch } from '@/components/shop/ShopSearch';

// Hooks and Data
// import { useShopActions } from '@/hooks/useShopActions';
import { Shop } from '@/types/shop';
// import { MOCK_SHOPS } from '@/data/MockShops';
import { AddShopModal } from '@/components/modals/AddShopModal';
import { EditShopModal } from '@/components/modals/EditShopModal';
import { UpdateSubscriptionModal } from '@/components/modals/UpdateSubscriptionModal';
import axios from 'axios';

export default function ShopsPage() {
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [statusFilter, setStatusFilter] = useState<string>('all');
  // const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  // const [isUpdateSubscriptionModalOpen, setIsUpdateSubscriptionModalOpen] = useState<boolean>(false);
  const [selectedShop, setSelectedShop] = useState<Shop>([]);

  // const {  addShop, updateShoshopsp, deleteShop, toggleActive } = useShopActions(MOCK_SHOPS);

  // Enhanced filtering logic
  // const filteredShops = shops.filter(shop => {
  //   const matchesSearch = 
  //     shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     shop.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     shop.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     shop.address.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesStatus = 
  //     statusFilter === 'all' ||
  //     (statusFilter === 'active' && shop.isActive && shop.subscriptionStatus === 'active') ||
  //     (statusFilter === 'inactive' && !shop.isActive) ||
  //     (statusFilter === 'expired' && shop.subscriptionStatus === 'expired') ||
  //     (statusFilter === 'trial' && shop.subscriptionStatus === 'trial');

  //   return matchesSearch && matchesStatus;
  // });

  // Calculate comprehensive statistics
  // const stats = {
  //   total: shops.length,
  //   active: shops.filter(shop => shop.isActive && shop.subscriptionStatus === 'active').length,
  //   expired: shops.filter(shop => shop.subscriptionStatus === 'expired').length,
  //   inactive: shops.filter(shop => !shop.isActive).length,
  //   trial: shops.filter(shop => shop.subscriptionStatus === 'trial').length,
  //   premium: shops.filter(shop => shop.subscriptionPlan === 'premium').length,
  //   standard: shops.filter(shop => shop.subscriptionPlan === 'standard').length,
  //   basic: shops.filter(shop => shop.subscriptionPlan === 'basic').length
  // };

  const handleEditShop = (shop: Shop) => {
    // setSelectedShop(shop);
    // setIsEditModalOpen(true);
    console.log('handleEditShop called');
  };

  const handleUpdateSubscription = (shop: Shop) => {
    console.log('handleUpdateSubscription called');
    // setSelectedShop(shop);
    // setIsUpdateSubscriptionModalOpen(true);
  };

  // const clearFilters = () => {
  //   setSearchTerm('');
  //   setStatusFilter('all');
  // };

  useEffect(() => {
    const getShops = async () => {
      try {
        const response = await axios.get('/api/v1/user/get-all-shops',
          {
            headers: {
              'Authorization': `${localStorage.getItem('accessToken')}`,
            },
          }
        );
        setSelectedShop(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    getShops();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container - Updated padding to match SubscriptionsPage */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">

        {/* Header Section - Updated spacing and text sizes */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Shop Management
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive management system for shops, subscriptions, and customer information
            </p>
          </div>

          {/* Add Button - Updated to match SubscriptionsPage style */}
          {/* <Button 
            onClick={() => setIsAddModalOpen(true)} 
            size="lg"
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="sm:hidden">Add Shop</span>
            <span className="hidden sm:inline">Add New Shop</span>
          </Button> */}
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {/* Primary Stats */}
          {/* <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {stats.total}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Total Shops
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card> */}

          {/* <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    {stats.active}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Active
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card> */}

          {/* <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-red-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-red-600">
                    {stats.expired}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Expired
                  </p>
                </div>
                <Clock className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card> */}

          {/* <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-gray-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-600">
                    {stats.inactive}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Inactive
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card> */}

          {/* Additional Stats for larger screens */}
          {/* <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-yellow-500 hidden xl:block">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-600">
                    {stats.trial}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Trial
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card> */}

          {/* <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500 hidden xl:block">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {stats.premium}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Premium
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Main Content Card - Updated shadow and header styling */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                {/* All Shops ({filteredShops.length}) */}
                All Shops
              </CardTitle>

              {/* Quick Stats Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {/* {stats.active} Active */}
                  Active
                </div>
                <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  {/* {stats.expired} Expired */}
                  Expired
                </div>
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {/* {stats.trial} Trial */}
                  Trial
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Enhanced Search and Filter Section */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  {/* <ShopSearch
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  /> */}
                </div>

                {/* Status Filter */}
                {/* <div className="flex flex-col sm:flex-row gap-3 lg:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                    <option value="expired">Expired Only</option>
                    <option value="trial">Trial Only</option>
                  </select>

                  {(searchTerm || statusFilter !== 'all') && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="px-4 py-2"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div> */}
              </div>

              {/* Results Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600">
                {/* <div>
                  Showing <span className="font-semibold text-gray-900">{filteredShops.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{shops.length}</span> shops
                  {searchTerm && (
                    <span> matching "<span className="font-medium text-blue-600">{searchTerm}</span>"</span>
                  )}
                </div> */}

                {/* Mobile Quick Filters */}
                {/* <div className="flex gap-2 sm:hidden">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('all')}
                    className="text-xs"
                  >
                    All
                  </Button>
                  <Button
                    variant={statusFilter === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('active')}
                    className="text-xs"
                  >
                    Active
                  </Button>
                  <Button
                    variant={statusFilter === 'expired' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('expired')}
                    className="text-xs"
                  >
                    Expired
                  </Button>
                </div> */}
              </div>
            </div>

            {/* Table Views for Desktop/Tablet */}
            <div className="hidden sm:block">
              <ShopTable
                shops={selectedShop}
                onEdit={handleEditShop}
                onDelete={()=>{}}
                onToggleActive={()=>{}}
                onUpdateSubscription={handleUpdateSubscription}
              />
            </div>

            {/* Mobile Card View (< 640px) */}
            {/* <div className="sm:hidden space-y-4">
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
                <div className="text-center py-12">
                  <div className="max-w-sm mx-auto">
                    <div className="rounded-full bg-gray-100 h-16 w-16 mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">No shops found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm || statusFilter !== 'all'
                        ? 'Try adjusting your search terms or filters to see more results.'
                        : 'Get started by adding your first shop to begin managing your business.'
                      }
                    </p>
                    {(!searchTerm && statusFilter === 'all') && (
                      <Button onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Shop
                      </Button>
                    )}
                    {(searchTerm || statusFilter !== 'all') && (
                      <Button onClick={clearFilters} variant="outline">
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div> */}

            {/* Empty State for Desktop */}
            {/* {filteredShops.length === 0 && (
              <div className="hidden sm:block text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="rounded-full bg-gray-100 h-20 w-20 mx-auto mb-8 flex items-center justify-center">
                    <Users className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">No shops found</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try adjusting your search terms or filters to see more results.'
                      : 'Get started by adding your first shop to begin managing your business.'
                    }
                  </p>
                  {(!searchTerm && statusFilter === 'all') ? (
                    <Button onClick={() => setIsAddModalOpen(true)} size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Your First Shop
                    </Button>
                  ) : (
                    <Button onClick={clearFilters} size="lg" variant="outline">
                      <Filter className="h-5 w-5 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            )} */}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {/* <AddShopModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddShop={addShop}
      /> */}

      {/* <EditShopModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        shop={selectedShop}
        onUpdateShop={updateShop}
      /> */}

      {/* <UpdateSubscriptionModal
        isOpen={isUpdateSubscriptionModalOpen}
        onClose={() => setIsUpdateSubscriptionModalOpen(false)}
        shop={selectedShop}
        onUpdateSubscription={updateShop}
      /> */}
    </div>
  );
}