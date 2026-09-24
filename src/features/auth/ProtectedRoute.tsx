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
    return <Navigate to="/login" state={{from: location}} replace />;
    // Navigation -> login page .. navigate -> location
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return(
      <Navigate to="/dashboard" replace/>

    )
    // Navigateto -> Dashboard 
  }

  return childern;
}

export default ProtectedRoutes;