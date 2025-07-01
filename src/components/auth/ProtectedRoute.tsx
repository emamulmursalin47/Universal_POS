// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import type { UserRole } from "@/lib/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user, token } = useAppSelector((state) => state.auth);

  // If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is specified, check if user has permission
  if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
