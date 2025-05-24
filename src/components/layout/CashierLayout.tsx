import { Outlet } from 'react-router-dom';
import { useRoleRedirect } from '@/hooks/useRoleRedirect';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ShoppingCart, Receipt, BarChart3, User } from 'lucide-react';

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
  const { isLoading } = useRoleRedirect(['cashier']);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar menuItems={menuItems} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Cashier Dashboard" />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}