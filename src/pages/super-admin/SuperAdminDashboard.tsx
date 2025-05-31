import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/statistics/StatsCard';
import { Building2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { MOCK_SHOPS } from '@/lib/constants';
import axios from 'axios';

import type { Shop } from '@/lib/types';


export default function SuperAdminDashboard() {
  // In a real app, these would come from API calls
  const [totalShops, setTotalShops] = useState(0);
  const [activeShops, setActiveShops] = useState(0);
  const [expiredShops, setExpiredShops] = useState(0);
  const [expireSoonShops, setExpireSoonShops] = useState(0);
  const [shops, setShops] = useState<Shop[]>([]);

  // const [shops, setShops] = useState<Shop[]>(null);


  const fetchShops = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/user/get-all-shops', {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
        },
      });
      // console.log(response.data.meta.total);
      setTotalShops(response.data.meta.total);
      setShops(response.data.data);
      // console.log(shops); // This might still log old value due to closure
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  }, []);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);



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
          // trend={{ value: 12, isPositive: true }}
          description="Total active subscriptions"
        />
        <StatsCard
          title="Expired Subscriptions"
          value={expiredShops}
          icon={<XCircle className="h-4 w-4" />}
          description="Needs renewal"
        />
        <StatsCard
          title="Expire this Month"
          value={expireSoonShops}
          icon={<Clock className="h-4 w-4" />}
          description="subscriptions will expire this month"
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
              {shops.map((shop, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center mr-3">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{shop.shopName} ({shop.vendorId})</h3>
                    <p className="text-xs text-muted-foreground">Expire: {new Date(shop.subscriptionDeadline).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</p>
                  </div>
                  <div className="text-xs font-medium">
                    <span className={`px-2 py-1 rounded-full ${shop.status == 'active' ? 'bg-green-100 text-green-800' :
                      shop?.status === 'expired' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                      {shop?.status}
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
                        className={`h-full ${plan === 'basic' ? 'bg-blue-500' :
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