
import { VendorAdminLayout } from '@/components/layout/VendorAdminLayout';
import VendorAdminDashboard from '@/pages/vendor-admin/VendorAdminDashboard';
import ProductsPage from '@/pages/vendor-admin/ProductsPage';
import CategoriesPage from '@/pages/vendor-admin/CategoriesPage';

import SalesPage from '@/pages/vendor-admin/SalesPage';
import StaffPage from '@/pages/vendor-admin/StaffPage';
import CustomersPage from '@/pages/vendor-admin/CustomersPage';
import SettingsPage from '@/pages/super-admin/SettingsPage';
import InventoryPage from '@/pages/vendor-admin/InventoryPage';

export const vendorAdminRoutes = [
  {
    path: "/vendor-admin",
    element: <VendorAdminLayout />,
    children: [
      {
        index: true,
        element: <VendorAdminDashboard />
      },
      {
        path: "products",
        element: <ProductsPage />
      },
      {
        path: "categories",
        element: <CategoriesPage />
      },
      {
        path: "inventory",
        element: <InventoryPage/>
      },
      {
        path: "sales",
        element: <SalesPage />
      },
      {
        path: "staff",
        element: <StaffPage />
      },
      {
        path: "customers",
        element: <CustomersPage />
      },
      {
        path: "settings",
        element: <SettingsPage />
      }
    ]
  }
];