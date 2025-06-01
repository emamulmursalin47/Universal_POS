/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ResponsiveSidebar.tsx

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// import { useAuth } from '@/hooks/useAuth';

import { SidebarProps } from '@/types/sidebar';
// import { MobileAppBar } from '../sidebar/MobileAppbar';
import { DesktopSidebar } from '../sidebar/DesktopSidebar';

import { DecodedToken } from '@/lib/types';
export function Sidebar({ menuItems, title = "POS System", accessToken }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // const accessToken = localStorage.getItem('accessToken');
  const decoded: DecodedToken = jwtDecode(accessToken as string);

  // const { user, signOut } = useAuth();

  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Enhanced active route detection
  const isActiveRoute = (path: string) => {
    if (path === location.pathname) return true;

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const itemSegments = path.split('/').filter(Boolean);

    if (pathSegments.length === itemSegments.length) {
      return pathSegments.every((segment, index) => segment === itemSegments[index]);
    }

    return false;
  };


  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('accessToken'); // Clear token
    navigate('/login'); // Redirect to login route
  };

  return (
    <>
      {/* Mobile AppBar (Bottom Navigation) */}
      {/* <MobileAppBar 
        menuItems={menuItems}
        title={title}
        userRole={userRole}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isActiveRoute={isActiveRoute}
        user={user}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        signOut={signOut}
      /> */}

      {/* Desktop Sidebar */}
      <DesktopSidebar
        menuItems={menuItems}
        title={title}
        userRole={decoded.role}
        collapsed={collapsed}
        user={decoded}
        setCollapsed={setCollapsed}
        isActiveRoute={isActiveRoute}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        signOut={handleSignOut}
      />
    </>
  );
}