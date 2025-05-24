import { POSCart } from '@/components/cashier/POSCart';
import { POSProductGrid } from '@/components/cashier/POSProductGrid';
import { useAuth } from '@/hooks/useAuth';
import { MOCK_SHOPS } from '@/lib/constants';

export default function CashierPOS() {
  const { user } = useAuth();
  
  // In a real app, we would fetch the shop data from API
  const shopData = user?.shopId 
    ? MOCK_SHOPS.find(shop => shop.id === user.shopId) 
    : null;
  
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Point of Sale</h1>
        {shopData && (
          <p className="text-muted-foreground">{shopData.name}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-5rem)]">
        <div className="lg:col-span-2 h-full">
          <POSProductGrid />
        </div>
        <div className="h-full">
          <POSCart />
        </div>
      </div>
    </div>
  );
}