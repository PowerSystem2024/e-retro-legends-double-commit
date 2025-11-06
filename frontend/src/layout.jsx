import { useAuth } from "./contexts/AuthContext";

/**
 * Componente Layout que envuelve la aplicación con Header y Footer
 * @param {React.ReactNode} children - Contenido principal de la página
 * @returns {React.JSX.Element} Layout con estructura de 3 niveles (header, main, footer)
 */
export const Layout = ({ children }) => {
  const { isAuthenticated, user, userRole, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        userRole={userRole}
        onLogout={logout}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};