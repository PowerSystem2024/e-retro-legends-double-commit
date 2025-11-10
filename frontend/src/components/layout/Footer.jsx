import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export const Footer = () => {
  const { getCartItemsCount } = useCart();
  const { user } = useAuth();
  return (
    <footer className="bg-gray-200 border-t-4 border-gray-400 mt-8 z-50">
      {user?.role !== "seller" ? (
        <Link
          to="/cart"
          className="md:hidden fixed bottom-2 right-2 text-white items-center rounded-full border border-gray-300 p-3 bg-blue-600 transition"
        >
          <ShoppingCart size={20} />
          <span
            style={{ display: getCartItemsCount() <= 0 ? "none" : "flex" }}
            className="px-1.5 absolute -top-2 right-0 text-sm font-semibold bg-red-400 cart rounded-full"
          >
            {getCartItemsCount()}
          </span>
        </Link>
      ) : null}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Acerca */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-900">
              <Link to="/about">Acerca de e-Retro Legends</Link>
            </h3>
            <ul className="text-xs space-y-2">
              <li>
                <Link
                  to="/about#quienes-somos"
                  className="text-blue-600 hover:underline"
                >
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link
                  to="/about#careers"
                  className="text-blue-600 hover:underline"
                >
                  Trabaja con nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/about#press"
                  className="text-blue-600 hover:underline"
                >
                  Prensa
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-900">
              <Link to="/help">Ayuda y Contacto</Link>
            </h3>
            <ul className="text-xs space-y-2">
              <li>
                <Link to="/help" className="text-blue-600 hover:underline">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link
                  to="/help#shipping"
                  className="text-blue-600 hover:underline"
                >
                  Información de envío
                </Link>
              </li>
              <li>
                <Link
                  to="/help#returns"
                  className="text-blue-600 hover:underline"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  to="/help#contact"
                  className="text-blue-600 hover:underline"
                >
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Vendedor */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-900">
              <Link to="/sellerInfo">Vendedor</Link>
            </h3>
            <ul className="text-xs space-y-2">
              <li>
                <Link
                  to="/sellerInfo#start"
                  className="text-blue-600 hover:underline"
                >
                  Empieza a vender
                </Link>
              </li>
              <li>
                <Link
                  to="/sellerInfo#fees"
                  className="text-blue-600 hover:underline"
                >
                  Tarifas de venta
                </Link>
              </li>
              <li>
                <Link
                  to="/sellerInfo#resources"
                  className="text-blue-600 hover:underline"
                >
                  Recursos para vendedores
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-900">
              <Link to="/legal">Legal</Link>
            </h3>
            <ul className="text-xs space-y-2">
              <li>
                <Link
                  to="/legal#privacy"
                  className="text-blue-600 hover:underline"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/legal#terms"
                  className="text-blue-600 hover:underline"
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link
                  to="/legal#cookies"
                  className="text-blue-600 hover:underline"
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-gray-400 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-600">
            © 2025 e-Retro Legends Inc. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Diseñado con nostalgia por doubleCommit-2024 🏆
          </p>
        </div>
      </div>
    </footer>
  );
};
