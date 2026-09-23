import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated } from "./authSlice";
import type { UserRole } from "../../types/user.types";

interface ProtectedRouteProps {
  childern: ReactNode;
  allowedRoles: UserRole[];
}

function ProtectedRoutes({ childern, allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if(!isAuthenticated) {
    // Navigation -> login page .. navigate -> location
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Navigateto -> Dashboard 
  }

  return childern;
}

export default ProtectedRoutes