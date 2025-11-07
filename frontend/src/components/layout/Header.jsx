import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Button from "../common/Button";
import { ShoppingCart } from "lucide-react"

const Header = ({ isAuthenticated, user, userRole, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <header className="sticky top-0 left-0 right-0 z-100 border-b border-gray-200 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-100 text-gray-700 text-xs">
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
                <img src={user.avatar} width={18} height={18} />
                <span className="font-medium">Hola! {user.name || ""} {user.lastname}</span>
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
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
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
          className="flex-1 w-full sm:w-auto flex gap-2 max-w-2xl"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar artículos, equipos o colecciones..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <Button type="submit" variant="primary" className="px-4 py-2">
            Buscar
          </Button>
        </form>

        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-center gap-2 border border-gray-300 px-3 py-2 hover:bg-gray-50 transition"
        >
          <span className="text-2xl">
            <ShoppingCart size={24} />
          </span>
          <div className="text-left">
            <p className="text-xs text-gray-500">Carrito</p>
            <p className="text-sm font-semibold">{getCartItemsCount()} ítems</p>
          </div>
        </Link>
      </div>

      {/* Categories bar */}
      <nav className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-6 text-sm font-medium text-gray-700">
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
    </header>
  );
};

export default Header;
