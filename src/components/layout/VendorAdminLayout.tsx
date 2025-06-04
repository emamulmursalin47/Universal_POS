import { Outlet } from 'react-router-dom';
// import { useRoleRedirect } from '@/hooks/useRoleRedirect';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Package,
  Layers,
  BarChart3,
  ShoppingCart,
  Users,
  User,
  // Settings
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/vendor-admin',
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: 'Products',
    path: '/vendor-admin/products',
    icon: <Package size={20} />,
  },
  {
    title: 'Categories',
    path: '/vendor-admin/categories',
    icon: <Layers size={20} />,
  },
  {
    title: 'Inventory',
    path: '/vendor-admin/inventory',
    icon: <BarChart3 size={20} />,
  },
  {
    title: 'Sales',
    path: '/vendor-admin/sales',
    icon: <ShoppingCart size={20} />,
  },
  {
    title: 'Staff',
    path: '/vendor-admin/staff',
    icon: <Users size={20} />,
  },
  {
    title: 'Customers',
    path: '/vendor-admin/customers',
    icon: <User size={20} />,
  },
  // {
  //   title: 'Settings',
  //   path: '/vendor-admin/settings',
  //   icon: <Settings size={20} />,
  // },
];

export function VendorAdminLayout() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const decoded: DecodedToken = jwtDecode(accessToken as string);

  if (decoded.role !== 'vendor') {
    localStorage.removeItem('accessToken');
    navigate('/login');
  }

  // const { isLoading } = useRoleRedirect(['vendor']);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar menuItems={menuItems} accessToken={accessToken as string} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Vendor Dashboard" accessToken={accessToken as string} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}