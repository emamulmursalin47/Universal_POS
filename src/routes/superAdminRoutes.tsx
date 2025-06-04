// routes/superAdminRoutes.tsx

import { SuperAdminLayout } from '@/components/layout/SuperAdminLayout';
import SuperAdminDashboard from '@/pages/super-admin/SuperAdminDashboard';
import ShopsPage from '@/pages/super-admin/ShopsPage';
import SubscriptionsPage from '@/pages/super-admin/SubscriptionsPage';
// import SettingsPage from '@/pages/super-admin/SettingsPage';

export const superAdminRoutes = [
  {
    path: "/super-admin",
    element: <SuperAdminLayout />,
    children: [
      {
        index: true,
        element: <SuperAdminDashboard />
      },
      {
        path: "shops",
        element: <ShopsPage />
      },
      {
        path: "subscriptions",
        element: <SubscriptionsPage />
      },
      // {
      //   path: "settings",
      //   element: <SettingsPage />
      // }
    ]
  }
];