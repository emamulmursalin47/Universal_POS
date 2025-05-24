import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/statistics/StatsCard';
import { Building2, Users, CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import { MOCK_SHOPS } from '@/lib/constants';

export default function SuperAdminDashboard() {
  // In a real app, these would come from API calls
  const totalShops = MOCK_SHOPS.length;
  const activeShops = MOCK_SHOPS.filter(shop => shop.subscriptionStatus === 'active').length;
  const expiredShops = MOCK_SHOPS.filter(shop => shop.subscriptionStatus === 'expired').length;
  const pendingShops = MOCK_SHOPS.filter(shop => shop.subscriptionStatus === 'pending').length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Shops"
          value={totalShops}
          icon={<Building2 className="h-4 w-4" />}
          description="All registered shops"
        />
        <StatsCard
          title="Active Subscriptions"
          value={activeShops}
          icon={<CheckCircle className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
          description="Compared to last month"
        />
        <StatsCard
          title="Expired Subscriptions"
          value={expiredShops}
          icon={<XCircle className="h-4 w-4" />}
          description="Needs renewal"
        />
        <StatsCard
          title="Pending Activations"
          value={pendingShops}
          icon={<Clock className="h-4 w-4" />}
          description="Awaiting activation"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Shop Registrations</CardTitle>
            <CardDescription>Latest shops that joined the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_SHOPS.slice(0, 5).map(shop => (
                <div key={shop.id} className="flex items-center">
                  <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center mr-3">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{shop.name}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(shop.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-xs font-medium">
                    <span className={`px-2 py-1 rounded-full ${
                      shop.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                      shop.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shop.subscriptionStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
            <CardDescription>Breakdown of subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['basic', 'standard', 'premium'].map(plan => {
                const count = MOCK_SHOPS.filter(shop => shop.subscriptionPlan === plan).length;
                const percentage = Math.round((count / totalShops) * 100);
                
                return (
                  <div key={plan} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{plan}</span>
                      <span className="text-sm text-muted-foreground">{count} shops ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          plan === 'basic' ? 'bg-blue-500' :
                          plan === 'standard' ? 'bg-purple-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
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