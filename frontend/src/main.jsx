import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { ProductProvider } from "./contexts/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
