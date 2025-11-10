import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Button from "../common/Button";
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  Home,
  LayoutDashboard,
} from "lucide-react";

const Header = ({ isAuthenticated, user, userRole, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full z-50 border-b border-gray-200 bg-white shadow-sm relative">
      {/* Top bar */}
      <div className="bg-gray-100 text-gray-700 text-xs hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">
              Inicio
            </Link>
            <Link to="/about" className="hover:underline">
              Acerca de
            </Link>
            <Link to="/help#bottom" className="hover:underline">
              Contacto
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <img
                  src={user.avatar}
                  width={18}
                  height={18}
                  alt="Avatar del usuario"
                  className="hidden md:flex rounded-full"
                />
                <span className="font-medium">
                  {user.name || ""} {user.lastname}
                </span>
                {userRole === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    className="hover:text-blue-600 font-medium"
                  >
                    Panel Vendedor
                  </Link>
                )}
                {userRole === "buyer" && (
                  <Link to="/buyer/orders" className="hover:text-blue-600">
                    Mis Compras
                  </Link>
                )}
                <button onClick={onLogout} className="hover:text-blue-600">
                  Salir
                </button>
              </div>
            ) : (
              <p className="flex items-center gap-2">
                ¡Hola!
                <Link to="/login" className="text-blue-600 underline">
                  Inicia sesión
                </Link>
                o
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Regístrate
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center">
            <span className="text-blue-500">R</span>
            <span className="text-yellow-400">e</span>
            <span className="text-green-500">t</span>
            <span className="text-purple-500">r</span>
            <span className="text-orange-500">o</span>
            <span className="ml-1 text-blue-400">Legends</span>
          </h1>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 gap-2 max-w-2xl"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar artículos, equipos o colecciones..."
            className="flex-1 px-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <Button type="submit" variant="primary" className="px-4 py-2">
            Buscar
          </Button>
        </form>

        {/* Cart */}
        <Link
          to="/cart"
          className="hidden md:flex items-center gap-2 border border-gray-300 px-3 py-2 hover:bg-gray-50 transition"
        >
          <ShoppingCart size={24} />
          <div className="text-left">
            <p className="text-xs text-gray-500">Carrito</p>
            <p className="text-sm font-semibold">{getCartItemsCount()} ítems</p>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 border border-gray-300 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Categories bar */}
      <nav className="bg-white border-t border-gray-200 overflow-hidden flex">
        <div
          className="max-w-4xl mx-auto flex gap-6 px-4 py-2 text-sm font-medium text-gray-700
               overflow-x-auto scrollbar-none whitespace-nowrap"
        >
          <Link
            to="/products/category/futbol"
            className="hover:text-blue-600 transition-colors"
          >
            ⚽ Fútbol
          </Link>
          <Link
            to="/products/category/basketball"
            className="hover:text-blue-600 transition-colors"
          >
            🏀 Basketball
          </Link>
          <Link
            to="/products/category/tenis"
            className="hover:text-blue-600 transition-colors"
          >
            🎾 Tenis
          </Link>
          <Link
            to="/products/category/baseball"
            className="hover:text-blue-600 transition-colors"
          >
            ⚾ Baseball
          </Link>
          <Link
            to="/products/category/otros"
            className="hover:text-blue-600 transition-colors"
          >
            🏆 Otros Deportes
          </Link>
        </div>
      </nav>

      {/* Overlay y menú lateral */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <aside className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-5 flex flex-col gap-4 animate-slide-left">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menú</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={22} className="hover:text-red-400" />
              </button>
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    width={18}
                    height={18}
                    alt="Avatar del usuario"
                    className="rounded-full"
                  />
                  <span className="font-medium">
                    {user.name} {user.lastname}
                  </span>
                </div>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <Home size={18} /> Inicio
                </Link>
                {userRole === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:text-blue-600"
                  >
                    <LayoutDashboard size={18} /> Panel Vendedor
                  </Link>
                )}
                {userRole === "buyer" && (
                  <Link
                    to="/buyer/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:text-blue-600"
                  >
                    <ShoppingCart size={18} /> Mis Compras
                  </Link>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-600 hover:underline"
                >
                  <LogOut size={18} /> Salir
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-blue-600 hover:underline"
                >
                  Inicia sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Regístrate
                </Link>
              </div>
            )}
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;
