import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux';
import { loginUser, logout } from '@/redux/slices/authSlice';
import type { UserRole } from '@/lib/types';
import { ROUTES } from '@/lib/constants';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    const success = await dispatch(loginUser(email, password) as any);
    if (success) {
      redirectBasedOnRole();
    }
    return success;
  };

  const signOut = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const redirectBasedOnRole = () => {
    if (!user) return;
    
    switch (user.role) {
      case 'super_admin':
        navigate(ROUTES.SUPER_ADMIN.DASHBOARD);
        break;
      case 'vendor_admin':
        navigate(ROUTES.VENDOR_ADMIN.DASHBOARD);
        break;
      case 'cashier':
        navigate(ROUTES.CASHIER.POS);
        break;
      default:
        navigate(ROUTES.LOGIN);
    }
  };

  const checkRoleAccess = (allowedRoles: UserRole[]) => {
    return user && allowedRoles.includes(user.role);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signOut,
    checkRoleAccess,
  };
};