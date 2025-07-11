/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux";
import { loginUser, logout } from "@/redux/slices/authSlice";
import type { UserRole } from "@/lib/types";
import { ROUTES } from "@/lib/constants";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (email: string, password: string) => {
    const { success, role } = await dispatch(loginUser(email, password) as any);
    if (success) {
      redirectBasedOnRole(role);
    }
    return success;
  };

  const signOut = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const redirectBasedOnRole = (role: UserRole) => {
    console.log(role);
    console.log(user);
    // if (!user) return;

    switch (role) {
      case "superAdmin":
        console.log("redirecting to super admin dashboard");
        navigate(ROUTES.SUPER_ADMIN.DASHBOARD);
        break;
      case "vendor":
        navigate(ROUTES.VENDOR_ADMIN.DASHBOARD);
        break;
      case "cashier":
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
