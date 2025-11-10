import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Páginas públicas
import { Home } from "./pages/Public/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import ProductDetail from "./components/common/ProductDetail";
import { ProductProvider } from "./contexts/ProductContext";
import Products from "./pages/Public/Products";
import { AllProducts } from "./pages/Public/Products";
import { SearchResults } from "./pages/Public/SearchResults";
import { About } from "./pages/Public/AboutUs";
import { Help } from "./pages/Public/Help";
import { SellerPage } from "./pages/Public/SellerInfo";
import { LegalPage } from "./pages/Public/Legals";
import ComingSoonPage from "./pages/Public/404";

// Páginas comprador
import Cart from "./pages/Buyer/Cart";
import { Checkout } from "./pages/Buyer/Checkout";
import { OrderConfirmation } from "./pages/Buyer/OrderConfirmation";
import OrderHistory from "./pages/Buyer/OrderHistory";

// Páginas vendedor
import SellerDashboard from "./pages/Seller/SellerDashboard";
import ProductManagement from "./pages/Seller/ProductManagement";
import ProductForm from "./pages/Seller/ProductForm";

import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { Layout } from "./layout";

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <Layout>
              <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/products/category/:categorySlug"
                  element={<AllProducts />}
                />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/sellerInfo" element={<SellerPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/404" element={<ComingSoonPage />} />

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
                  element={<OrderConfirmation />}
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
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
