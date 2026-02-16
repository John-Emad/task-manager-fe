import { use } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { UserContext } from "../Context/UserContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = use(UserContext);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy/5 to-pacific-blue/5">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-pacific-blue/30 border-t-pacific-blue rounded-full animate-spin"></div>
          <p className="text-navy font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
}

