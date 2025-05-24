import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/statistics/StatsCard';
import { Package, ShoppingCart, DollarSign, TrendingUp, BarChart, Plus } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_SALES } from '@/lib/constants';

export default function VendorAdminDashboard() {
  // In a real app, these would come from API calls
  const totalProducts = MOCK_PRODUCTS.length;
  const totalSales = MOCK_SALES.reduce((sum, sale) => sum + sale.total, 0);
  const totalOrders = MOCK_SALES.length;
  const lowStockItems = MOCK_PRODUCTS.filter(product => product.stock < 10).length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="h-4 w-4" />}
          description="Across all categories"
        />
        <StatsCard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
          description="Compared to last month"
        />
        <StatsCard
          title="Orders"
          value={totalOrders}
          icon={<ShoppingCart className="h-4 w-4" />}
          trend={{ value: 5, isPositive: true }}
          description="Compared to last month"
        />
        <StatsCard
          title="Low Stock Items"
          value={lowStockItems}
          icon={<TrendingUp className="h-4 w-4" />}
          description="Items needing restock"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest sales transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_SALES.map(sale => (
                <div key={sale.id} className="flex items-center">
                  <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center mr-3">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Sale #{sale.id.substring(5)}</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date(sale.createdAt).toLocaleDateString()} • {sale.items.length} items
                    </p>
                  </div>
                  <div className="font-medium">${sale.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Stock levels by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_PRODUCTS.slice(0, 5).map(product => {
                const stockPercentage = Math.min(100, Math.round((product.stock / 50) * 100));
                const stockStatus = product.stock > 20 ? 'bg-green-500' : 
                                   product.stock > 10 ? 'bg-yellow-500' : 'bg-red-500';
                
                return (
                  <div key={product.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{product.name}</span>
                      <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${stockStatus}`}
                        style={{ width: `${stockPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}