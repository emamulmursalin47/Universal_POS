
import { Navigate } from 'react-router-dom';
import { authRoutes } from './authRoutes';
import { superAdminRoutes } from './superAdminRoutes';
import { vendorAdminRoutes } from './vendorAdminRoutes';
import { cashierRoutes } from './CashierRoutes';


export const routes = [
  // Public Routes
  ...authRoutes,
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  
  // Role-based Routes
  ...superAdminRoutes,
  ...vendorAdminRoutes,
  ...cashierRoutes,
  
  // Catch-all route
  {
    path: "*",
    element: <Navigate to="/login" replace />
  }
];