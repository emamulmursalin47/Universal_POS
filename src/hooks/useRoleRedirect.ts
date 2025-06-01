import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { ROUTES } from '@/lib/constants';
import type { UserRole } from '@/lib/types';

export const useRoleRedirect = (allowedRoles: UserRole[]) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate(ROUTES.LOGIN);
      } else if (user && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role
        switch (user.role) {
          case 'superAdmin':
            navigate(ROUTES.SUPER_ADMIN.DASHBOARD);
            break;
          case 'vendor':
            navigate(ROUTES.VENDOR_ADMIN.DASHBOARD);
            break;
          case 'cashier':
            navigate(ROUTES.CASHIER.POS);
            break;
          default:
            navigate(ROUTES.LOGIN);
        }
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, navigate]);

  return { isLoading };
};