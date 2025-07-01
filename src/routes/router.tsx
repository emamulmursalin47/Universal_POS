// router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";

// Auth Routes
import LoginPage from "@/pages/auth/LoginPage";

// Super Admin Routes
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import SuperAdminDashboard from "@/pages/super-admin/SuperAdminDashboard";
import ShopsPage from "@/pages/super-admin/ShopsPage";
import SubscriptionsPage from "@/pages/super-admin/SubscriptionsPage";

// Vendor Admin Routes
import { VendorAdminLayout } from "@/components/layout/VendorAdminLayout";
import VendorAdminDashboard from "@/pages/vendor-admin/VendorAdminDashboard";
import ProductsPage from "@/pages/vendor-admin/ProductsPage";
import CategoriesPage from "@/pages/vendor-admin/CategoriesPage";
import SalesPage from "@/pages/vendor-admin/SalesPage";
import StaffPage from "@/pages/vendor-admin/StaffPage";
import CustomersPage from "@/pages/vendor-admin/CustomersPage";
import InventoryPage from "@/pages/vendor-admin/InventoryPage";

// Cashier Routes
import { CashierLayout } from "@/components/layout/CashierLayout";
import CashierPOS from "@/pages/cashier/CashierPOS";
import SalesHistoryPage from "@/pages/cashier/SalesHistoryPage";
import ReportsPage from "@/pages/cashier/ReportsPage";
import InvoiceReceipt from "@/pages/cashier/InvoiceReceipt";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // Super Admin Routes
  {
    path: "/super-admin",
    element: (
      <ProtectedRoute allowedRoles={["superAdmin"]}>
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <SuperAdminDashboard />,
      },
      {
        path: "shops",
        element: <ShopsPage />,
      },
      {
        path: "subscriptions",
        element: <SubscriptionsPage />,
      },
    ],
  },

  // Vendor Admin Routes
  {
    path: "/vendor-admin",
    element: (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <VendorAdminDashboard />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
      {
        path: "sales",
        element: <SalesPage />,
      },
      {
        path: "staff",
        element: <StaffPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
    ],
  },

  // Cashier Routes
  {
    path: "/cashier",
    element: (
      <ProtectedRoute allowedRoles={["manager", "cashier"]}>
        <CashierLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CashierPOS />,
      },
      {
        path: "sales",
        element: <SalesHistoryPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "recipt/:invoiceId",
        element: <InvoiceReceipt />,
      },
    ],
  },

  // Catch-all route
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
