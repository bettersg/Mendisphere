import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/Firebase/AuthProvider";
import { Paths } from "./paths";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerified?: boolean;
}

/**
 * Protects routes that require authentication
 * @param children - The component to render if authenticated
 * @param requireEmailVerified - If true, also requires email to be verified (default: false)
 */
const ProtectedRoute = ({
  children,
  requireEmailVerified = false
}: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to={Paths.login} state={{ from: location }} replace />;
  }

  // Logged in but email not verified (if required)
  if (requireEmailVerified && !user.emailVerified) {
    return <Navigate to={Paths.emailVerification} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
