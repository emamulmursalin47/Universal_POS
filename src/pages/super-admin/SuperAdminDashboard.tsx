import { Store, Check, AlertCircle, Clock, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard from "./Component/DashboardCard";
import RecentShopsTable from "./Component/RecentShopsTable";
import { useGetShopsReportQuery } from "@/redux/api/shopVendorApi";

const SuperAdminDashboard = () => {
  const { data: shops, isLoading, isError } = useGetShopsReportQuery("");

  const shopsReport = shops?.data;

  if (isError) {
    return <div className="p-6">Error loading dashboard data</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Shops"
          value={shopsReport?.totalShopCount}
          icon={<Store className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoading}
        />

        <DashboardCard
          title="Active Shops"
          value={shopsReport?.totalActiveShopCount}
          icon={<Check className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoading}
          className="bg-green-50 dark:bg-green-900/20"
        />

        <DashboardCard
          title="Expired Shops"
          value={shopsReport?.expiredShopCount}
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoading}
          className="bg-red-50 dark:bg-red-900/20"
        />

        <DashboardCard
          title="Expiring Soon"
          value={shopsReport?.expiredSoonShopsCount}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoading}
          className="bg-yellow-50 dark:bg-yellow-900/20"
        />
      </div>

      {/* Recent Shops */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Added Shops</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <RecentShopsTable
              shops={shopsReport?.latestTenCreatedShopDataList || []}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
