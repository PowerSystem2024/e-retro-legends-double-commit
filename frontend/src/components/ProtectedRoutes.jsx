import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Componente para rutas protegidas
 * @param {React.ReactNode} children
 * @param {string} allowedRoute
 * @returns {React.ReactNode}
 */
export const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};
