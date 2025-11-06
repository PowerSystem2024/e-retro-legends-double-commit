import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Páginas públicas
import { Home } from "./pages/Public/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";

// Páginas comprador
import Cart from "./pages/Buyer/Cart";
import Checkout from "./pages/Buyer/Checkout";
import OrderConfirmation from "./pages/Buyer/OrderConfirmation";
import OrderHistory from "./pages/Buyer/OrderHistory";

// Páginas vendedor
import SellerDashboard from "./pages/Seller/SellerDashboard";
import ProductManagement from "./pages/Seller/ProductManagement";
import ProductForm from "./pages/Seller/ProductForm";

import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { Layout } from "./layout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas Comprador */}
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-confirmation"
                element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/buyer/orders"
                element={
                  <ProtectedRoute allowedRole="buyer">
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />

              {/* Rutas vendedor */}
              <Route
                path="/seller/dashboard"
                element={
                  <ProtectedRoute allowedRole="seller">
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller/products"
                element={
                  <ProtectedRoute allowedRole="seller">
                    <ProductManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller/products/new"
                element={
                  <ProtectedRoute allowedRole="seller">
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller/products/edit/:id"
                element={
                  <ProtectedRoute allowedRole="seller">
                    <ProductForm />
                  </ProtectedRoute>
                }
              />

              {/* Cachear todos - redirección al inicio */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
