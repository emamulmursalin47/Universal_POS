import { Outlet } from 'react-router-dom';
import { useRoleRedirect } from '@/hooks/useRoleRedirect';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Users, Store, CreditCard, Settings } from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/super-admin',
    icon: <Users size={20} />,
  },
  {
    title: 'Shops',
    path: '/super-admin/shops',
    icon: <Store size={20} />,
  },
  {
    title: 'Subscriptions',
    path: '/super-admin/subscriptions',
    icon: <CreditCard size={20} />,
  },
  {
    title: 'Settings',
    path: '/super-admin/settings',
    icon: <Settings size={20} />,
  },
];

export function SuperAdminLayout() {
  const { isLoading } = useRoleRedirect(['super_admin']);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar menuItems={menuItems} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Super Admin Dashboard" />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}