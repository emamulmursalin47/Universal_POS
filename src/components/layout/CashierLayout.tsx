import { Outlet } from 'react-router-dom';
// import { useRoleRedirect } from '@/hooks/useRoleRedirect';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ShoppingCart, Receipt, BarChart3, User } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from '@/lib/types';

const menuItems = [
  {
    title: 'POS',
    path: '/cashier',
    icon: <ShoppingCart size={20} />,
  },
  {
    title: 'Sales History',
    path: '/cashier/sales',
    icon: <Receipt size={20} />,
  },
  {
    title: 'Reports',
    path: '/cashier/reports',
    icon: <BarChart3 size={20} />,
  },
  {
    title: 'Profile',
    path: '/cashier/profile',
    icon: <User size={20} />,
  },
];

export function CashierLayout() {
  // const { user } = useAuth();
  const accessToken = localStorage.getItem('accessToken');
  const decoded: DecodedToken = jwtDecode(accessToken as string);

  if (decoded.role !== 'manager') {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }


  // const { isLoading } = useRoleRedirect(['cashier']);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar menuItems={menuItems} accessToken={accessToken as string} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Sell Dashboard" accessToken={accessToken as string} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}