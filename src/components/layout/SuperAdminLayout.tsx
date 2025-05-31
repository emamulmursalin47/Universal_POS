import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// import { useRoleRedirect } from '@/hooks/useRoleRedirect';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useNavigate } from 'react-router-dom';
import { Users, Store, CreditCard, Settings } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from '@/lib/types';

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
  // {
  //   title: 'Settings',
  //   path: '/super-admin/settings',
  //   icon: <Settings size={20} />,
  // },
];

export function SuperAdminLayout() {
  const navigate = useNavigate();
  // const { isLoading } = useRoleRedirect(['super_admin']);

  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {

    if (!accessToken) {
      navigate('/login');
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(accessToken);

      if (decoded.role !== 'superAdmin') {
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    } catch {
      console.error('Invalid token');
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  }, [navigate]);

  // const decoded: DecodedToken = jwtDecode(accessToken as string);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar menuItems={menuItems} accessToken={accessToken as string} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Super Admin Dashboard" accessToken={accessToken as string} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}