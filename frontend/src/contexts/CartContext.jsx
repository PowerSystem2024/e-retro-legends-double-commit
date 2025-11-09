/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

// helper: detecta el campo de stock posible en un producto
export const getStockFromProduct = (p) => {
  if (!p) return null;
  const keys = [
    "stock",
    "quantityAvailable",
    "inventory",
    "stockQty",
    "qty",
    "available",
  ];
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(p, k)) {
      const v = p[k];
      if (typeof v === "number" && Number.isFinite(v)) return v;
      if (typeof v === "string" && v !== "") {
        const n = Number(v);
        if (!Number.isNaN(n)) return n;
      }
    }
  }
  return null;
};

// Hook personalizado
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    handlePayment,
    loadingPayment,
    preferenceId,
  } = context;
  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    handlePayment,
    loadingPayment,
    preferenceId,
  };
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const [preferenceId, setPreferenceId] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  // Cargamos el sdk de mercapago
  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
      locale: "es-AR",
    });
  }, []);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- MÉTODOS DE CARRITO ---
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.warn("addToCart: producto inválido", product);
      return false;
    }

    const stock = getStockFromProduct(product);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      const existingQty = existingItem ? existingItem.quantity : 0;

      if (typeof stock === "number" && existingQty + quantity > stock) {
        console.warn("addToCart: excede stock disponible", {
          productId: product.id,
          requested: existingQty + quantity,
          stock,
        });
        return prevItems;
      }

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });

    return true;
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return true;
    }

    let blocked = false;

    setCartItems((prevItems) => {
      const item = prevItems.find((it) => it.id === productId);
      if (!item) return prevItems;

      const stock = getStockFromProduct(item);
      if (typeof stock === "number" && quantity > stock) {
        console.warn("updateQuantity: excede stock", {
          productId,
          requested: quantity,
          stock,
        });
        blocked = true;
        return prevItems;
      }

      return prevItems.map((it) =>
        it.id === productId ? { ...it, quantity } : it
      );
    });

    return !blocked;
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getCartItemsCount = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0);

  // --- PAGO CON MERCADO PAGO ---
  const handlePayment = async () => {
    if (!user) {
      console.warn("Debe iniciar sesión para pagar.");
      return;
    }

    setLoadingPayment(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/payment/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.user_id,
            total: getCartTotal(),
            items: cartItems
          }),
        }
      );

      const data = await response.json();

      if (data.init_point) {
        setPreferenceId(data.order_id);
        window.open(data.init_point, "_blank");
      } else {
        console.error("No se recibió init_point del backend");
      }
    } catch (error) {
      console.error("Error al crear preferencia:", error);
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        handlePayment,
        loadingPayment,
        preferenceId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
