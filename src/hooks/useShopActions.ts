// hooks/useShopActions.ts
import { useState } from 'react';
import { Shop } from '@/types/shop';

export const useShopActions = (initialShops: Shop[]) => {
  const [shops, setShops] = useState<Shop[]>(initialShops);

  const addShop = (newShop: Shop) => {
    setShops(prev => [...prev, newShop]);
  };

  const updateShop = (updatedShop: Shop) => {
    setShops(prev => prev.map(shop => 
      shop.id === updatedShop.id ? updatedShop : shop
    ));
  };

  const deleteShop = (id: number) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      setShops(prev => prev.filter(shop => shop.id !== id));
    }
  };

  const toggleActive = (id: number, isActive: boolean) => {
    setShops(prev => prev.map(shop => 
      shop.id === id 
        ? { ...shop, isActive, lastUpdated: new Date().toISOString() }
        : shop
    ));
  };

  return {
    shops,
    addShop,
    updateShop,
    deleteShop,
    toggleActive
  };
};