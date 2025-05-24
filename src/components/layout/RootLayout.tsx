import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from './ErrorBoundary';

interface RootLayoutProps {
  children?: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Set page title based on route
  useEffect(() => {
    const routeTitles: Record<string, string> = {
      '/login': 'Login - POS System',
      '/super-admin': 'Super Admin Dashboard - POS System',
      '/vendor-admin': 'Vendor Dashboard - POS System',
      '/cashier': 'Cashier POS - POS System'
    };

    const title = routeTitles[location.pathname] || 'POS System';
    document.title = title;
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full bg-background font-sans antialiased">
        {/* CSS Variables for theming */}
        <style>{`
          :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --popover: 0 0% 100%;
            --popover-foreground: 222.2 84% 4.9%;
            --primary: 221.2 83.2% 53.3%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210 40% 96%;
            --secondary-foreground: 222.2 84% 4.9%;
            --muted: 210 40% 96%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --accent: 210 40% 96%;
            --accent-foreground: 222.2 84% 4.9%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 210 40% 98%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --ring: 221.2 83.2% 53.3%;
            --radius: 0.5rem;
          }
        `}</style>
        
        <div className="relative flex min-h-screen flex-col">
          {/* Main content area */}
          <main className="flex-1 relative overflow-hidden">
            {children || <Outlet />}
          </main>
          
          {/* Global Components */}
          <Toaster />
          
          {/* Development indicator */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed top-4 left-4 z-50 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
              DEV
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};